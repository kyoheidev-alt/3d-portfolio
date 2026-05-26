import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { logoK, javascript, mitsuba, mobile } from "../../assets";

const SCALE = 1.3;
const SCALED_SQRT2 = (1 / Math.sqrt(2)) * SCALE;

const TETRA_FACES = [
  [
    [1 * SCALE, 0, -SCALED_SQRT2],
    [-1 * SCALE, 0, -SCALED_SQRT2],
    [0, 1 * SCALE, SCALED_SQRT2],
  ],
  [
    [1 * SCALE, 0, -SCALED_SQRT2],
    [0, -1 * SCALE, SCALED_SQRT2],
    [-1 * SCALE, 0, -SCALED_SQRT2],
  ],
  [
    [-1 * SCALE, 0, -SCALED_SQRT2],
    [0, 1 * SCALE, SCALED_SQRT2],
    [0, -1 * SCALE, SCALED_SQRT2],
  ],
  [
    [1 * SCALE, 0, -SCALED_SQRT2],
    [0, 1 * SCALE, SCALED_SQRT2],
    [0, -1 * SCALE, SCALED_SQRT2],
  ],
];

const FACE_TEXTURES = [logoK, javascript, mitsuba, mobile];

const createFaceGeometry = (vertices) => {
  const points = vertices.map((vertex) => new THREE.Vector3(...vertex));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setIndex([0, 1, 2]);
  geometry.computeVertexNormals();
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(
      new Float32Array([0, 0, 1, 0, 0.5, 1]),
      2
    )
  );
  return geometry;
};

const FACE_GEOMETRIES = TETRA_FACES.map(createFaceGeometry);

const configureTexture = (texture, index) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = true;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.center.set(0.5, 0.5);
  texture.rotation = index === 2 ? Math.PI : 0;
  texture.offset.set(0, 0);
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
};

const TetrahedronFace = ({ color, index, setActiveIndex }) => {
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, FACE_TEXTURES[index]);
  configureTexture(texture, index);

  const faceColor =
    index === 0 ? "#ffffff" : hovered ? "#ffb6c1" : color;

  return (
    <mesh
      geometry={FACE_GEOMETRIES[index]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActiveIndex(index);
      }}
    >
      <meshBasicMaterial
        side={THREE.DoubleSide}
        color={faceColor}
        map={texture}
        toneMapped={false}
      />
    </mesh>
  );
};

const Tetrahedron = ({ setActiveIndex, activeIndex, reduceMotion }) => {
  const tetrahedronRef = useRef();
  const [direction, setDirection] = useState(0);
  const frameRef = useRef(0);

  useFrame(() => {
    if (!tetrahedronRef.current) return;

    frameRef.current += 1;
    const isIdle = activeIndex == null;
    if (isIdle && !reduceMotion && frameRef.current % 2 !== 0) {
      return;
    }

    let targetX = 0.01;
    let targetY = 0.01;
    const targetZ = 0;

    if (activeIndex === 0) {
      targetX = 100;
      targetY = 0;
    } else if (activeIndex === 1) {
      targetX = -80;
      targetY = 110;
    } else if (activeIndex === 2) {
      targetY = 50;
    } else if (activeIndex === 3) {
      targetY = -50;
    }

    if (!isIdle) {
      const targetEuler = new THREE.Euler(
        THREE.MathUtils.degToRad(targetX),
        THREE.MathUtils.degToRad(targetY),
        THREE.MathUtils.degToRad(targetZ),
        "XYZ"
      );
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
      const t = reduceMotion ? 0.2 : 0.05;
      tetrahedronRef.current.quaternion.slerp(targetQuaternion, t);
      return;
    }

    if (reduceMotion) return;

    if (tetrahedronRef.current.rotation.x > 15) {
      setDirection(1);
    } else if (tetrahedronRef.current.rotation.x < 0) {
      setDirection(0);
    }

    const sign = direction === 0 ? 1 : -1;
    tetrahedronRef.current.rotation.x += targetX * sign;
    tetrahedronRef.current.rotation.y += targetY * sign;
  });

  return (
    <group ref={tetrahedronRef}>
      {TETRA_FACES.map((_, index) => (
        <TetrahedronFace
          key={index}
          color={index === activeIndex ? "white" : "skyblue"}
          index={index}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </group>
  );
};

const TetraCanvas = ({ setActiveIndex, activeIndex }) => {
  const orbitRef = useRef();
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const dpr = useMemo(
    () =>
      typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : 1,
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    orbitRef.current?.reset();
  }, [activeIndex]);

  return (
    <Canvas
      id="tetra-canvas"
      className="z-10"
      dpr={dpr}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
      role="img"
      aria-label="セクション切替用の 3D 四面体。ドラッグで回転します。"
      onPointerMissed={() => setActiveIndex(null)}
    >
      <Tetrahedron
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        reduceMotion={reduceMotion}
      />
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enableRotate={!reduceMotion}
      />
    </Canvas>
  );
};

export default TetraCanvas;
