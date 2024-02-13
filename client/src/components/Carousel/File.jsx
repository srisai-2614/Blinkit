import React, { useState } from 'react';
import './File.css';

const File = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [collection, setCollection] = useState([]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    // Convert FileList to an array and store it in state
    setCollection((prev) => [...prev, ...Array.from(files)]);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;

    // Convert FileList to an array and store it in state
    setCollection((prev) => [...prev, ...Array.from(files)]);
  };

  const displayImages = () => {
    return collection.map((image, index) => (
      <div key={index} className="image-container">
        <img
          src={URL.createObjectURL(image)}
          alt={`Image ${index}`}
          className="image-preview"
        />
        <p>{image.name}</p>
      </div>
    ));
  };

  return (
    <div>
        <div className='Upload'>
        <div
        className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{width:'75%',marginTop:'0.5em'}}
      >
        <p>Drag and drop files here</p>
      </div>
      <div>
        <h3>OR</h3>
      </div>
      <div>
        <input type="file" onChange={handleFileInputChange}/>
      </div>
        </div>

      <div>
        <h3>Your Collection</h3>
        <div className="image-collection">{displayImages()}</div>
      </div>
    </div>
  );
};

export default File;
