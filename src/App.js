import React from 'react';
// Import the new 3D model component
// This path assumes Iphone153DModel.js is directly in the src/ folder alongside App.js
import Iphone153DModel from './Iphone153DModel.js';

// Flag to enable or disable the 3D hero section
// Set this to true to display the 3D model
const USE_3D_HERO = true;

function App() {
  return (
    // The main container for your application.
    // Setting width and height to 100% of viewport dimensions ensures the 3D canvas fills the screen.
    <div className="w-screen h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
      {USE_3D_HERO ? (
        // If USE_3D_HERO is true, render the Iphone153DModel component
        // This component contains the <Canvas> for the 3D scene
        <Iphone153DModel />
      ) : (
        // If USE_3D_HERO is false, render a simple text fallback
        <div className="text-white text-3xl font-bold">
          3D Hero Disabled - Please enable in App.js
        </div>
      )}
    </div>
  );
}

export default App;
