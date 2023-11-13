import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

function BlogPost({ image, labels, translateLabel, setTranslateLanguage }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeLabel, setActiveLabel] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleFlip = async (label) => {

    if (label === activeLabel && isFlipped) {
      setIsFlipped(false); 
    } else {
      
      const translation = await translateLabel(label);
      setTranslatedText(translation);
      setActiveLabel(label);
      setIsFlipped(true); 
    }
  };

  return (
    <div className="blog-post">
      <div className="blog-post-image-container">
        {image && <img src={image} alt="Uploaded" className="blog-post-image" />}
      </div>
      <div className="blog-post-labels-container">
        <div className="label-description-container">
          {labels.map((label, index) => (
            <div key={index} className="label-description-bar" onClick={() => handleFlip(label.description)}>
              <div 
                className="progress-bar" 
                style={{ width: `${label.score ? label.score * 100 : 100}%` }}>
                {label.description} ({label.score ? (label.score * 100).toFixed(2) : 100}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {image && ( 
        <div> 
          <h2>When you click labels Flashcard appears. </h2>
          <h3>You can change translated language here.</h3>
          <select onChange={(e) => setTranslateLanguage(e.target.value)} className="select-dropdown">
            <option value="it">Italian</option>
            <option value="es">Spanish</option>
            <option value="tr">Turkish</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>

          {activeLabel && (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <div className="card-front" onClick={() => handleFlip(activeLabel)}>
                <h2>{activeLabel}</h2>
              </div>
              <div className="card-back" onClick={() => handleFlip(activeLabel)}>
                <h2>{translatedText}</h2>
              </div>
            </ReactCardFlip>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogPost;