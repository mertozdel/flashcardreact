# I messed up while uploading to 'git', it may not work but you can look at the codes.


# Image Processing and Translation Web Application

## Overview
This web application provides a comprehensive solution for image processing and language translation. It leverages React for the frontend, with a dual-backend system utilizing Google Cloud APIs and a custom MongoDB database API. The app offers user authentication, image upload with label detection, and language translation features.

## Front-end (React Application - HomePage Component)

### User Authentication and Navigation
- The application supports user authentication with options to log in or sign up.
- Upon successful login, a JSON Web Token (JWT) is stored in localStorage for session management.
- useAuth and useNavigate from React Router are utilized for handling authentication status and navigation.

### File Upload and Image Processing
- Users can upload images, which are then processed using the Google Cloud Vision API.
- The API detects labels (keywords) from the uploaded image.
- The frontend displays the image along with these detected labels.
- The image data, along with the labels, are sent to the database API for storage in MongoDB.

### Language Translation
- Users have the option to translate the labels into various languages.
- Translations are displayed with a flip card animation, implemented using ReactCardFlip.
- Language selection is user-driven and accommodates multiple languages.

### Flashcards
- Flashcards are dynamically created based on the image labels.
- Each flashcard shows the label and its associated confidence score.

## Back-end (Two Separate APIs)

### Google Cloud API Server (Image Processing)
- Manages image uploads through the /upload endpoint.
- Integrates with the Google Cloud Vision API for robust label detection.
- Sends back the labels and base64-encoded image data to the front-end.

### Database API (User and Image Data Management)
- Handles user data, including authentication processes (signup and login), using MongoDB.
- Provides multiple endpoints for user-related operations (/signup, /login, /api/users).
- Manages image data processing, receiving image data from the front-end and storing it in MongoDB.
- Offers an endpoint to retrieve images uploaded by specific users (/user-images/:userId).

## How to Use
1. **User Authentication:** New users can sign up, and existing users can log in to access the application.
2. **Upload Image:** Users can upload an image file for label detection.
3. **View Labels and Translate:** Detected labels are displayed, and users can select a language to translate these labels.
4. **Explore Flashcards:** Users can interact with flashcards created from image labels, enhancing their language learning experience.
