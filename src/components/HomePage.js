import React, { useState } from 'react';
import axios from 'axios';
import BlogPost from './BlogPost';
import { useAuth } from '../useAuth';
import { useNavigate } from 'react-router-dom'; 



function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [labels, setLabels] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [showLabels, setShowLabels] = useState(true); 
  const [flashcards, setFlashcards] = useState([]); 
  const [targetLang, setTargetLang] = useState(''); 


  const token = localStorage.getItem('token');
  const userId = user?.id; 


  
  const translateLabel = async (label) => {
    try {
      const response = await axios.post('http://localhost:5001/translate', {
        text: label,
        targetLanguage: targetLang
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Error during translation:', error);
      return label;
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.error('No file selected');
      return; 
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', userId); 
  
    try {

      const uploadResponse = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (uploadResponse.data && uploadResponse.data.labels && uploadResponse.data.image) {
        setLabels(uploadResponse.data.labels);
        setUploadedImage(`data:image/jpeg;base64,${uploadResponse.data.image}`);
        setShowLabels(true);
  

        const externalAPIFormData = new FormData();
        externalAPIFormData.append('file', selectedFile);
        externalAPIFormData.append('imageData', `data:image/jpeg;base64,${uploadResponse.data.image}`); 
        externalAPIFormData.append('labels', JSON.stringify(uploadResponse.data.labels));
        externalAPIFormData.append('userId', userId);
  

        try {
          await axios.post('http://localhost:3000/upload', externalAPIFormData, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          });
  
        } catch (externalAPIError) {
          console.error('Error uploading file to external API:', externalAPIError);
        }
  
      } else {
        console.error('Invalid response data:', uploadResponse.data);
      }
    } catch (error) {
      console.error('Error uploading file to server:', error.response ? error.response.data : error);
    }
  };
  

  const handleLabelClick = () => {
    setShowLabels(!showLabels); 
    if (showLabels) {
      createFlashcards(); 
    }
  };

  const createFlashcards = () => {

    const newFlashcards = labels.map(label => ({
      term: label.description,
      definition: `Confidence: ${label.score.toFixed(2)}`
    }));
    setFlashcards(newFlashcards);
  };
  const redirectToLogin = () => {
    navigate('/login'); 
  };
  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
          <button class="button-54"  type="submit">Upload and Analyze</button>
        </form>
      ) : (
        <div>
          <div>Please log in to upload files.</div>
          <button class="button-54"  onClick={redirectToLogin}>Log In</button>
        </div>
      )}

      <BlogPost 
        image={uploadedImage} 
        labels={labels} 
        onLabelClick={handleLabelClick} 
        showLabels={showLabels}
        translateLabel={translateLabel}
        setTranslateLanguage={setTargetLang} 
      />

      
      {flashcards.length > 0 && (
        <div className="flashcards">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <div className="term">{card.term}</div>
              <div className="definition">{card.definition}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;