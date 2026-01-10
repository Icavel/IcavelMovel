// src/components/Constellation/Constellation3DModel.tsx
import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
        Carregando: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function ConstellationGLBModelComponent() {
  const groupRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, '/models/constellation.glb');

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={gltf.scene} 
        scale={[1.5, 1.5, 1.5]}
        position={[0, -0.5, 0]}
      />
    </group>
  );
}

function FallbackConstellationModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1.1, 7]} />
        <meshStandardMaterial 
          color="#0056b3" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      <mesh position={[0, 0.8, -2.2]}>
        <boxGeometry args={[1.7, 1.3, 2.8]} />
        <meshStandardMaterial 
          color="#1e3a8a"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
   
      <mesh position={[0, 0, 3.6]}>
        <boxGeometry args={[2.6, 0.25, 0.15]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
 
      <mesh position={[-1.3, -0.55, -1.8]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      <mesh position={[1.3, -0.55, -1.8]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      
      {[1.5, 2.5].map((zPos) => (
        <mesh key={`left-${zPos}`} position={[-1.3, -0.55, zPos]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      ))}
      
      {[1.5, 2.5].map((zPos) => (
        <mesh key={`right-${zPos}`} position={[1.3, -0.55, zPos]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      ))}
  
      <mesh position={[-0.7, 0.3, 3.55]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0.7, 0.3, 3.55]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function ConstellationModel({ useGLB = true }: { useGLB?: boolean }) {
  return (
    <Suspense fallback={<FallbackConstellationModel />}>
      {useGLB ? (
        <ConstellationGLBModelComponent />
      ) : (
        <FallbackConstellationModel />
      )}
    </Suspense>
  );
}

interface Constellation3DModelProps {
  scale?: number;
  className?: string;
  showControls?: boolean;
  useGLBModel?: boolean;
}

export default function Constellation3DModel({ 
  scale = 1,
  className = "",
  showControls = true,
  useGLBModel = true
}: Constellation3DModelProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [6, 3, 6], fov: 45 }}
        className="w-full h-full"
        style={{ 
  
          backgroundColor: '#f8fafc',
          borderRadius: '10px'
        }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <directionalLight 
            position={[8, 10, 4]} 
            intensity={1.2}
            castShadow
          />
          <pointLight position={[-4, 4, -4]} intensity={0.4} />
          
          <group scale={[scale * 0.7, scale * 0.7, scale * 0.7]}>
            <ConstellationModel useGLB={useGLBModel} />
          </group>
          
          {showControls && (
            <OrbitControls  
              enableZoom={true}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 6}
              maxDistance={10}
              minDistance={4}
              autoRotate
              autoRotateSpeed={0.7}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}