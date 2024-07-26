import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: React.FC<{ onDrop: (acceptedFiles: File[]) => void }> = ({
  onDrop
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 1000000 // Max file size in bytes (1MB)
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #cccccc',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <input {...getInputProps()} />
      <p>Drag  drop some files here, or click to select files</p>
    </div>
  );
};

export default Dropzone;
