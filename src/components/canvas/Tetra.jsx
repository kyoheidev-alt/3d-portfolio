import React, { useRef, useState } from "react";
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
        e.stopPropagation(); // ここでイベントの伝播を止める
        setActiveIndex(index); // setActiveIndexを呼び出す
        // alert(`面のインデックス: ${index}`); // アラートを表示
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

  useFrame(() => {
    // ホバーしていない場合のみ回転させる
    if (hoveredIndex === null) {
      tetrahedronRef.current.rotation.x += 0.01;
      tetrahedronRef.current.rotation.y += 0.01;
    }
  });
  // ここで関数を受け取る
  // 正四面体の頂点
  const vertices = [
    [
      [1, 0, -1 / Math.sqrt(2)],
      [-1, 0, -1 / Math.sqrt(2)],
      [0, 1, 1 / Math.sqrt(2)],
    ],
    [
      [1, 0, -1 / Math.sqrt(2)],
      [0, -1, 1 / Math.sqrt(2)],
      [-1, 0, -1 / Math.sqrt(2)],
    ],
    [
      [-1, 0, -1 / Math.sqrt(2)],
      [0, 1, 1 / Math.sqrt(2)],
      [0, -1, 1 / Math.sqrt(2)],
    ],
    [
      [1, 0, -1 / Math.sqrt(2)],
      [0, 1, 1 / Math.sqrt(2)],
      [0, -1, 1 / Math.sqrt(2)],
    ],
  ];

  return (
    <group ref={tetrahedronRef}>
      {vertices.map((faceVertices, index) => (
        <TetrahedronFace
          key={index}
          vertices={faceVertices}
          color={index === activeIndex ? "red" : "skyblue"} // activeIndexに基づいて色を変更
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
    <Canvas className="z-10">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Tetrahedron setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};
export default TetraCanvas;
