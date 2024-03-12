import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {  Text, Tetrahedron, Hud, OrbitControls, OrthographicCamera, Environment, Preload, useGLTF, RoundedBox } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Viewcube = ({ renderPriority = 1, matrix = new THREE.Matrix4() }) => {
  const mesh = useRef(null);
  const { camera } = useThree();
  const [hovered, hover] = useState(null);

  useFrame(({ clock }) => {
    matrix.copy(camera.matrix).invert();
    mesh.current.quaternion.setFromRotationMatrix(matrix);
  });

  useEffect(() => {
    mesh.current.rotation.x = Math.PI / 5;
    mesh.current.rotation.y = Math.PI / 4;
  }, []);

  const handleClick = (e) => {
    alert(`Clicked face index: ${e.face.materialIndex}`);
  };

  // 立方体の中心から各面の中心へのオフセット
  const facePositions = [
    { position: [150, 0, 0], rotation: [0, Math.PI / 2, 0] }, // 右面
    { position: [-150, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // 左面
    { position: [0, 150, 0], rotation: [Math.PI / 2, 0, 0] }, // 上面
    { position: [0, -150, 0], rotation: [-Math.PI / 2, 0, 0] }, // 下面
    { position: [0, 0, 150], rotation: [0, 0, 0] }, // 前面
    { position: [0, 0, -150], rotation: [0, Math.PI, 0] } // 後面
  ];

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 500]} />
      <mesh
        ref={mesh}
        onPointerOut={(e) => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}
        onPointerDown={handleClick}
      >
        {[...Array(6)].map((_, index) => (
          <meshLambertMaterial attach={`material-${index}`} key={index} color={hovered === index ? 'orange' : 'hotpink'} />
        ))}
        <boxGeometry args={[300, 300, 300]} />
        {facePositions.map((face, index) => (
          <Text
            key={index}
            position={face.position}
            rotation={face.rotation}
            fontSize={20}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {index + 1}
          </Text>
        ))}
      </mesh>
      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
  );
};



const CubeCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
        />
        <Viewcube />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default CubeCanvas;