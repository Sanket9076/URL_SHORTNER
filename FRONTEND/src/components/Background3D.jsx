import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const Starfield = () => {
  const ref = useRef();

  const count = 5000;
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        coords[i * 3] = x;
        coords[i * 3 + 1] = y;
        coords[i * 3 + 2] = z;
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

export default function Background3D() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <color attach="background" args={["#0a0b10"]} />
        <Starfield />
      </Canvas>
    </div>
  );
}
