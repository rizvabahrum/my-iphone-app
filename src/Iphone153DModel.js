import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber'; // No need for useLoader for GLB
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'; // useGLTF for GLB models
import { MathUtils } from 'three'; // MathUtils for general 3D math operations

// IphoneModel component is responsible for loading and displaying the 3D GLB model.
function IphoneModel() {
  // useGLTF hook from @react-three/drei loads GLB/GLTF models.
  // The path '/models/iPhone 15 Pro Max.glb' is relative to your project's 'public' folder.
  // Make sure the filename matches exactly, including spaces and capitalization,
  // to the file you placed in 'public/models/'.
  const { scene } = useGLTF('/models/iPhone 15 Pro Max.glb');

  // A ref is used to gain direct access to the Three.js object representing the loaded model.
  // This is useful for manual animations or manipulations if needed.
  const modelRef = useRef();

  // The 'useFrame' hook from @react-three/fiber allows running code on every rendered frame.
  // This is typically used for continuous animations. It's commented out by default here.
  /*
  useFrame(() => {
    if (modelRef.current) {
      // Example: Rotate the model slightly around its Y-axis for a continuous spinning effect.
      // Adjust the rotation speed (e.g., 0.005) to control how fast it spins.
      modelRef.current.rotation.y += 0.005;
    }
  });
  */

  // The <primitive> component is used to render a raw Three.js object (like the loaded GLB scene).
  // 'object={scene}' assigns the loaded 3D model (from useGLTF) to this primitive.
  // 'ref={modelRef}' attaches the React ref to the Three.js object for direct manipulation.
  // 'scale={0.1}' adjusts the overall size of the model in the scene. You may need to change this
  // value significantly depending on the original scale of your 3D model.
  // 'position={[0, -1.5, 0]}' sets the initial X, Y, Z coordinates of the model.
  // Adjust the Y-value to move the model up or down, centering it in the view.
  return <primitive object={scene} ref={modelRef} scale={0.1} position={[0, -1.5, 0]} />;
}

// Iphone153DModel is the main component that sets up the 3D environment for the iPhone model.
export default function Iphone153DModel() {
  return (
    // The <Canvas> component from @react-three/fiber creates a WebGL context and sets up the renderer.
    // 'camera' prop configures the default camera for the scene.
    //   - 'fov: 75' (Field of View) determines how much of the scene is visible (in degrees).
    //   - 'position: [0, 0, 5]' sets the camera's initial X, Y, Z coordinates in 3D space.
    <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
      {/* <ambientLight> provides a soft, even light that illuminates all objects in the scene equally. */}
      {/* 'intensity' controls the brightness of the ambient light. */}
      <ambientLight intensity={0.5} />

      {/* <spotLight> simulates a focused light source, like a flashlight or stage light. */}
      {/* 'position' defines the light's location. */}
      {/* 'angle' is the light's cone angle. 'penumbra' softens the edges of the light's cone. */}
      {/* 'decay' controls how the light's intensity diminishes with distance. 'intensity' is brightness. */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />

      {/* <pointLight> simulates a light bulb, emitting light in all directions from a single point. */}
      {/* 'position' sets its location. 'decay' and 'intensity' are similar to spotLight. */}
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      {/* <Suspense> is a React feature that allows you to "wait" for code to load. */}
      {/* Here, it's used while the 3D model (IphoneModel) is being fetched. */}
      {/* 'fallback={null}' means nothing will be rendered while loading; you could replace null */}
      {/* with a loading spinner component if you wanted. */}
      <Suspense fallback={null}>
        {/* Render the IphoneModel component, which will load and display the 3D iPhone. */}
        <IphoneModel />
      </Suspense>

      {/* <OrbitControls> from @react-three/drei enables interactive camera controls using mouse or touch. */}
      {/* 'enablePan' allows moving the camera sideways. */}
      {/* 'enableZoom' allows zooming in and out. */}
      {/* 'enableRotate' allows rotating the camera around the central point. */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

      {/* <Environment> from @react-three/drei adds a pre-configured environmental map for realistic lighting and reflections. */}
      {/* 'preset="city"' uses a common environmental map that makes 3D objects look more natural and integrated into the scene. */}
      {/* Other presets like 'sunset', 'dawn', 'warehouse', 'forest', 'studio' are also available. */}
      <Environment preset="city" />
    </Canvas>
  );
}
