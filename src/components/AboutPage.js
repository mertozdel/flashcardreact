import React from 'react';

function AboutPage() {
  return (
    <div className="about-page">
      <h1>Image Processing and Translation Web Application</h1>

      <h2>Overview</h2>
      <p>This web application provides an integrated platform for image processing and language translation. It combines the power of React for the frontend, Google Cloud APIs for image analysis, and a custom MongoDB database API for data management. The application offers functionalities like user authentication, image upload and analysis, label detection, and multilingual translation of image labels.</p>
      
      <h2>Front-end Features</h2>
      <h3>User Authentication and Navigation</h3>
      <ul>
        <li>Supports user logins and sign-ups, using JSON Web Tokens (JWT) for session management.</li>
        <li>Implements useAuth and useNavigate from React Router for authentication checks and seamless navigation.</li>
      </ul>

      <h3>Image Upload and Processing</h3>
      <ul>
        <li>Enables users to upload images which are then sent to the Google Cloud API server.</li>
        <li>Displays the uploaded image alongside detected labels (keywords) returned from the image processing API.</li>
        <li>Image data and labels are sent to the MongoDB database for storage.</li>
      </ul>

      <h3>Language Translation</h3>
      <ul>
        <li>Allows users to select different languages for translating image labels.</li>
        <li>Displays translated labels using an interactive card-flipping animation.</li>
      </ul>

      <h3>Flashcard Creation</h3>
      <ul>
        <li>Generates flashcards based on the labels detected in the image.</li>
        <li>Each flashcard shows the label and its confidence score, offering an educational aspect.</li>
      </ul>

      <h2>Back-end Implementation</h2>
      <h3>Google Cloud API Server</h3>
      <ul>
        <li>Manages image uploads and communicates with Google Cloud Vision API for label detection.</li>
        <li>Returns labels and base64-encoded image data back to the front-end.</li>
      </ul>

      <h3>Database API Server</h3>
      <ul>
        <li>Handles user data operations, including authentication (signup/login) using MongoDB.</li>
        <li>Provides RESTful API endpoints for various user and image data interactions.</li>
        <li>Receives image data from the front-end, storing it in the database along with labels.</li>
        <li>Facilitates retrieval of images uploaded by specific users.</li>
      </ul>

      <h2>Technologies Used</h2>
      <ul>
        <li><strong>Front-end:</strong> React.js, React Router, Axios, ReactCardFlip.</li>
        <li><strong>Back-end:</strong> Node.js, Express.js, MongoDB, Mongoose, Google Cloud Vision API, JSON Web Tokens.</li>
        <li><strong>Deployment:</strong> I didn't deploy online.</li>
      </ul>

      <h2>Project Setup and Local Development</h2>
      <p>First you need to start react server 'npm start' then auth server(database)'node index.js' and vision-backend server must be on working too 'node server.js' . </p>

    </div>
  );
}

export default AboutPage;
