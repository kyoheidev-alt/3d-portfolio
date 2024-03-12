import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Hud, OrbitControls, OrthographicCamera, Environment, Preload, useGLTF, RoundedBox } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Viewcube = ({ renderPriority = 1, matrix = new THREE.Matrix4() }) => {
  const mesh = useRef(null)
  const { camera } = useThree()
  const [hovered, hover] = useState(null)

  useFrame(({ clock }) => {
    // Spin mesh to the inverse of the default cameras matrix
    matrix.copy(camera.matrix).invert();
    mesh.current.quaternion.setFromRotationMatrix(matrix);

    // 自動で回転する
    // const elapsedTime = clock.getElapsedTime(); // 現在の経過時間を取得
    // mesh.current.rotation.y = elapsedTime * 0.1; // 0.1倍の速さで回転
  });

  useEffect(() => {
    // 初期の回転を斜めに設定
    mesh.current.rotation.x = Math.PI / 5; // 45度
    mesh.current.rotation.y = Math.PI / 4; // 45度
  }, []); // 初回のみ実行

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[0, 0, 500]} />
      <mesh
        ref={mesh}
        //position={[size.width / 2 - 120, size.height / 2 - 120, 0]}

        onPointerOut={(e) => hover(null)}
        onPointerMove={(e) => hover(e.face.materialIndex)}>
        {[...Array(6)].map((_, index) => (
          <meshLambertMaterial attach={`material-${index}`} key={index} color={hovered === index ? 'orange' : 'hotpink'} />
        ))}
        <boxGeometry args={[300, 300, 300]} />
      </mesh>
      <ambientLight intensity={1} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
  )
}

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
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

export default ComputersCanvas;