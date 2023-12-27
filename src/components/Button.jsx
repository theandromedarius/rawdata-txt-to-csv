// Button.jsx

import React from 'react';

const MyButton = ({ onClick, className, text, isCopied }) => (
  <div className="is-inline-block py-3 px-1">
    <button className={`button ${className}`} onClick={onClick}>
      {isCopied ? (
        <>
          <span>Copied </span>
          <i className="fas fa-check"></i>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  </div>
);

const FileInput = ({ handleFileSelect, fileName }) => (
  <div className="is-inline-block py-3 px-1">
    <label className="file-cta">
      <input
        className="file-input"
        type="file"
        accept=".txt"
        onChange={handleFileSelect}
      />
      <span className="file-label">{fileName}</span>
    </label>
  </div>
);

export { MyButton, FileInput };


