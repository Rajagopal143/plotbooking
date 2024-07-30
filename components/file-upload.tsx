// components/Dropzone.js
import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
      className="h-96 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      <p>Drag &lsquo;n&lsquo; drop an image here, or click to select one</p>
    </div>
  );
};

export default Dropzone;
