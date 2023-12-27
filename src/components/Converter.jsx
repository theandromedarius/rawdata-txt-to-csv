import React, { useState } from 'react';
import { FileInput, MyButton } from './Button';

const CSVConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const [isCopied, setIsCopied] = useState(false);

  const convertToCSV = () => {
    const lines = inputText.split('\n');
    const outputData = ["LATITUDE,LONGITUDE,DEPTH"];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("ELEVATION=") || lines[i].startsWith("DEPTH=")) {
        const depthValue = parseFloat(lines[i].replace(/ELEVATION=|DEPTH=/, ""));
        const coordinatesLine = lines[i + 1];
        const [longitude, latitude] = coordinatesLine.split(',');

        outputData.push(`${latitude},${longitude},${depthValue.toFixed(2)}`);
      }
    }

    setIsCopied(false);
    setOutputText(outputData.join('\n'));
  };

  const downloadCSV = () => {
    const blob = new Blob([outputText], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "output.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setInputText(text);
  };

  const copyToClipboard = () => {
    const element = document.getElementById('outputText');
    const textToCopy = element.textContent || element.innerText;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };
  

  const handleFileSelect = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setFileName('No file chosen');
    }
  };

  const clearPage = () => {
    window.location.reload();
  };

  return (
    <div className="converter-container">
      <div className="input-container pt-3 px-3">
        <textarea
          id="inputText"
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your TXT data here"
        />
        <div className="buttons-container">
          <FileInput handleFileSelect={handleFileSelect} fileName={fileName} />
          <MyButton onClick={pasteFromClipboard} className="is-info" text="Paste" />
          <MyButton onClick={convertToCSV} className="is-success" text="Convert" />
        </div>
      </div>
      <div className="output-container px-3">
        <textarea
          id="outputText"
          className="textarea"
          value={outputText}
          onChange={(e) => {
            setOutputText(e.target.value);
            setIsCopied(false);
          }}
          placeholder="Converted CSV data"
        />
        <div className="buttons-container">
          <MyButton onClick={downloadCSV} className="is-success" text="Download CSV" />
          <MyButton onClick={copyToClipboard} className="is-info" text="Copy Output" isCopied={isCopied} />
          <MyButton onClick={clearPage} className="is-danger" text="Clear" />
        </div>
      </div>
    </div>
  );
};

export default CSVConverter;