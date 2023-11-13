import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/my-images', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching images');
        setLoading(false);
      }
    };

    if (token) {
      fetchImages();
    } else {
      setError('You must be logged in to view images');
    }
  }, [token]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img 
          key={index} 
          src={`data:image/jpeg;base64,${image.imageData}`} 
          alt={`Uploaded ${index}`} 
          className="gallery-image"
        />
      ))}
    </div>
  );
}

export default ImageGallery;
