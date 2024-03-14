import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const TetrahedronFace = ({
  vertices,
  color,
  index,
  setActiveIndex,
  setHoveredIndex,
}) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const points = vertices.map((vertex) => new THREE.Vector3(...vertex));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setIndex([0, 1, 2]); // 三角形を形成
  geometry.computeVertexNormals();

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredIndex(index); // ホバー開始時にインデックスを設定
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        setHoveredIndex(null); // ホバー終了時にnullを設定
      }}
      onClick={(e) => {
        // e.stopPropagation(); // ここでイベントの伝播を止める
        setActiveIndex(index); // setActiveIndexを呼び出す
      }}
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        color={hovered ? "hotpink" : color}
      />
    </mesh>
  );
};

const Tetrahedron = ({ setActiveIndex, activeIndex }) => {
  const tetrahedronRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0); // directionをuseStateで管理
  // 回転ロジックをuseFrame内で最適化
  useFrame(() => {
    // console.log(
    //   "x: ",
    //   tetrahedronRef.current.rotation.x,
    //   "y: ",
    //   tetrahedronRef.current.rotation.y,
    //   "z: ",
    //   tetrahedronRef.current.rotation.z
    // );
    if (!tetrahedronRef.current) return;

    // activeIndexに基づいて回転目標を設定
    let targetX = 0.01,
      targetY = 0.01,
      targetZ = 0; // デフォルトの回転
    if (activeIndex === 0) {
      targetX = 2;
      targetY = 0;
      targetZ = 0;
    } else if (activeIndex === 1) {
      targetX = 4;
      targetY = 0;
      targetZ = 0;
    } else if (activeIndex === 2) {
      targetX = 3;
      targetY = 4;
      targetZ = 0;
    } else if (activeIndex === 3) {
      targetX = 6.5;
      targetY = 5.5;
      targetZ = 0;
    }

    // activeIndexが設定されている場合、目標の回転値に近づける
    if (activeIndex != null) {
      tetrahedronRef.current.rotation.x = THREE.MathUtils.lerp(
        tetrahedronRef.current.rotation.x,
        targetX,
        0.05
      );
      tetrahedronRef.current.rotation.y = THREE.MathUtils.lerp(
        tetrahedronRef.current.rotation.y,
        targetY,
        0.05
      );
      tetrahedronRef.current.rotation.z = THREE.MathUtils.lerp(
        tetrahedronRef.current.rotation.z,
        targetZ,
        0.05
      );
    } else {
      // activeIndexが設定されていない場合、directionに基づいて回転方向を変更
      if (tetrahedronRef.current.rotation.x > 15) {
        setDirection(1);
      } else if (tetrahedronRef.current.rotation.x < 0) {
        setDirection(0);
      }
      if (direction === 0) {
        tetrahedronRef.current.rotation.x += targetX;
        tetrahedronRef.current.rotation.y += targetY;
        tetrahedronRef.current.rotation.z += targetZ;
      } else {
        tetrahedronRef.current.rotation.x -= targetX;
        tetrahedronRef.current.rotation.y -= targetY;
        tetrahedronRef.current.rotation.z -= targetZ;
      }
    }
  });

  const scale = 1.2;
  const scaledSqrt2 = (1 / Math.sqrt(2)) * scale;

  // verticesの定義を最適化
  const vertices = [
    [
      [1 * scale, 0, -scaledSqrt2],
      [-1 * scale, 0, -scaledSqrt2],
      [0, 1 * scale, scaledSqrt2],
    ],
    [
      [1 * scale, 0, -scaledSqrt2],
      [0, -1 * scale, scaledSqrt2],
      [-1 * scale, 0, -scaledSqrt2],
    ],
    [
      [-1 * scale, 0, -scaledSqrt2],
      [0, 1 * scale, scaledSqrt2],
      [0, -1 * scale, scaledSqrt2],
    ],
    [
      [1 * scale, 0, -scaledSqrt2],
      [0, 1 * scale, scaledSqrt2],
      [0, -1 * scale, scaledSqrt2],
    ],
  ];

  return (
    <group ref={tetrahedronRef}>
      {vertices.map((faceVertices, index) => (
        <TetrahedronFace
          key={index}
          vertices={faceVertices}
          color={index === activeIndex ? "red" : "skyblue"}
          index={index}
          setActiveIndex={setActiveIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </group>
  );
};

const TetraCanvas = ({ setActiveIndex, activeIndex }) => {
  return (
    <Canvas
      id="tetra-canvas"
      className="z-10"
      onPointerMissed={() => setActiveIndex(null)}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Tetrahedron setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};
export default TetraCanvas;
