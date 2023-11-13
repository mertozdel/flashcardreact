import React, { useState } from 'react';
import BlogPost from './BlogPost';


function Image({ data }) {
  const [showLabels, setShowLabels] = useState(false);

  const handleImageClick = () => {
    setShowLabels(!showLabels);
  };

  return (
    <div>
      <img src={`data:image/jpeg;base64,${data.imageData}`} alt="Uploaded" onClick={handleImageClick} />
      {showLabels && <BlogPost image={data.imageData} labels={data.labels} />}
    </div>
  );
}

export default Image;
