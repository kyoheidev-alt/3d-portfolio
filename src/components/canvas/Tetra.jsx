import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // useLoaderをインポート
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { logo, javascript, mitsuba, mobile } from "../../assets";

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

  // UV座標の追加
  const uvs = new Float32Array([
    0.0,
    0.0, // 頂点1のUV座標
    1.0,
    0.0, // 頂点2のUV座標
    0.5,
    1.0, // 頂点3のUV座標
  ]);
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  let texturePath;
  switch (index) {
    case 0:
      texturePath = logo;
      break;
    case 1:
      texturePath = javascript;
      break;
    case 2:
      texturePath = mitsuba;
      break;
    case 3:
      texturePath = mobile;
      break;
    default:
      texturePath = javascript; // デフォルトのテクスチャ
  }

  const texture = useLoader(TextureLoader, texturePath);

  if (index === 0) {
    // テクスチャの回転を設定（例: 45度回転）
    texture.rotation = Math.PI / 1; // ラジアンで指定

    // テクスチャのオフセットやリピートなど、他のプロパティもここで設定可能
    texture.offset.set(0.85, 1);
    // テクスチャの繰り返しを設定して横に引き伸ばす
    texture.repeat.set(0.7, 1); // X軸に沿って2倍、Y軸に沿って変更なし
  } else if (index === 1) {
    texture.rotation = Math.PI / 1; // ラジアンで指定
    texture.repeat.set(2, 2); // X軸に沿って2倍、Y軸に沿って変更なし
  }

  // テクスチャが繰り返されるようにするためには、このプロパティも設定する必要があります
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;

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
      }}
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        color={hovered ? "pink" : color}
        map={texture}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

const Cube = () => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, javascript);
  // 立方体を回転させるためのアニメーション
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"royalblue"} map={texture} />
    </mesh>
  );
};

const Tetrahedron = ({ setActiveIndex, activeIndex }) => {
  const tetrahedronRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [direction, setDirection] = useState(0); // directionをuseStateで管理
  const texture = useLoader(TextureLoader, mobile); // mobile画像をテクスチャとして読み込む
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
          color={index === activeIndex ? "white" : "skyblue"}
          index={index}
          setActiveIndex={setActiveIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
      {/* 新しいmeshを追加 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};

const TetraCanvas = ({ setActiveIndex, activeIndex }) => {
  return (
    <>
      <Canvas
        id="tetra-canvas"
        className="z-10"
        onPointerMissed={() => setActiveIndex(null)}
      >
        <ambientLight intensity={1} />
        <spotLight position={[0, 1, 1]} angle={2} penumbra={2} />
        <pointLight position={[0, 10, 0]} intensity={1} />
        <directionalLight position={[-10, 10, 5]} intensity={0.5} />
        <Tetrahedron
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />

        <OrbitControls enableZoom={false} />
      </Canvas>
      <img src={logo} alt="" />
    </>
  );
};
export default TetraCanvas;
