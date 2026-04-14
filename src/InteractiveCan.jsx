import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Bounds,
  Center,
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

function LoadingFallback() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(9, 12, 28, 0.72)',
          color: 'rgba(244, 247, 255, 0.86)',
          fontSize: '12px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(14px)',
        }}
      >
        Loading can {Math.round(progress)}%
      </div>
    </Html>
  );
}

function Model() {
  const groupRef = useRef(null);
  const obj = useLoader(OBJLoader, '/models/coca-can/coke-can.obj');
  const [labelMap, metalMap] = useLoader(THREE.TextureLoader, [
    '/models/coca-can/label.jpg',
    '/models/coca-can/metal.jpg',
  ]);

  const model = useMemo(() => {
    const cloned = obj.clone(true);

    labelMap.colorSpace = THREE.SRGBColorSpace;
    metalMap.colorSpace = THREE.SRGBColorSpace;

    labelMap.wrapS = THREE.RepeatWrapping;
    labelMap.wrapT = THREE.ClampToEdgeWrapping;
    labelMap.flipY = false;

    metalMap.wrapS = THREE.RepeatWrapping;
    metalMap.wrapT = THREE.RepeatWrapping;
    metalMap.repeat.set(1.2, 1.2);
    metalMap.flipY = false;

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      map: labelMap,
      color: '#ffffff',
      metalness: 0.48,
      roughness: 0.46,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      side: THREE.DoubleSide,
    });

    const lidMaterial = new THREE.MeshStandardMaterial({
      map: metalMap,
      color: '#e2e7f2',
      metalness: 0.92,
      roughness: 0.28,
      side: THREE.DoubleSide,
    });

    cloned.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;
      child.geometry.computeVertexNormals();

      const isMetal =
        child.name.toLowerCase().includes('couvercle') ||
        child.name.toLowerCase().includes('cube');

      child.material = isMetal ? lidMaterial : bodyMaterial;
    });

    cloned.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.2 / maxAxis;

    cloned.position.sub(center);
    cloned.scale.setScalar(scale);
    cloned.updateMatrixWorld(true);

    return cloned;
  }, [labelMap, metalMap, obj]);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += 0.003;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[-0.16, 0.42, 0.02]}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

export default function InteractiveCan() {
  return (
    <Canvas
      camera={{ position: [0, 0.22, 5.2], fov: 29 }}
      dpr={[1, 1.8]}
      shadows
    >
      <color attach="background" args={['#05070f']} />
      <fog attach="fog" args={['#090d22', 5.4, 10]} />
      <ambientLight intensity={1.35} />
      <directionalLight
        position={[3.8, 4.2, 4.8]}
        intensity={2.25}
        color="#fff3f7"
        castShadow
      />
      <directionalLight position={[-3.2, 1.8, 2.4]} intensity={1.35} color="#63c6ff" />
      <pointLight position={[0, -1.6, 2.3]} intensity={1.25} color="#ff4a72" />
      <Environment preset="city" />
      <Suspense fallback={<LoadingFallback />}>
        <Bounds fit clip observe margin={1.15}>
          <Model />
        </Bounds>
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.1}
        maxPolarAngle={Math.PI / 1.42}
        rotateSpeed={0.9}
      />
    </Canvas>
  );
}
