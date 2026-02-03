import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Preload, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Performance Optimization: Moved outside component to prevent re-renders
function FloatingShape({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} args={[0.8, 0.3, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
}

function FloatingIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[0.7]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
}

function Particles({ count, color }: { count: number; color: string }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function Scene() {
  const { theme } = useTheme();
  const primaryColor = theme === "dark" ? "#00d4ff" : "#00b4d8";
  const accentColor = theme === "dark" ? "#8b5cf6" : "#7c3aed";
  const particleColor = theme === "dark" ? "#00d4ff" : "#0077b6";

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={primaryColor} />
      <pointLight position={[10, -10, 5]} intensity={0.3} color={accentColor} />
      
      <Suspense fallback={null}>
        <FloatingShape position={[-2.5, 1, -2]} color={primaryColor} size={1} speed={0.5} />
        <FloatingShape position={[3, -1, -1]} color={accentColor} size={0.6} speed={0.7} />
        <FloatingTorus position={[2, 2, -3]} color={primaryColor} />
        <FloatingIcosahedron position={[-3, -2, -2]} color={accentColor} />
        <Particles count={500} color={particleColor} />
      </Suspense>

      {/* Preload assets for SEO speed score */}
      <Preload all />
      {/* Reduce quality automatically if frames drop to keep LCP score high */}
      <AdaptiveEvents />
    </>
  );
}

export function Hero3D() {
  return (
    <div 
      className="absolute inset-0 opacity-80"
      role="img" 
      aria-label="Interactive 3D abstract visualization representing Haseeb Labs: Software Dev, Thinker, and Best Programmer services with Young Energy."
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]} // Performance: 1.5 is enough for retina, 2.0 is heavy for mobile SEO
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance", // Critical for SEO speed ranking
          stencil: false 
        }}
        // Helps Google understand this is a background element
        title="Haseeb Labs 3D Experience"
      >
        <Scene />
      </Canvas>
      
      {/* Hidden Text for Search Engine Bots (They read this instead of the Canvas) */}
      <div className="sr-only">
        <h2>Haseeb Labs Software Visualization</h2>
        <p>This 3D scene symbolizes the strategic thinking and young energy of Haseeb, the best programmer for high value clients. Providing faster delivery and low cost software development.</p>
      </div>
    </div>
  );
}