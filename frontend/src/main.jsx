import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '/src/context/AuthContext';
import { CourseProvider } from '/src/context/CourseContext'; // Import CourseProvider
import { LectureProvider } from '/src/context/LectureContext';
import { InstructorProvider } from '/src/context/InstructorContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider> {/* Wrap App with CourseProvider */}
          <LectureProvider>
            <InstructorProvider>
              <App />
            </InstructorProvider>
            
          </LectureProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
