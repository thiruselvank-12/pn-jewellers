import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, OrbitControls, Ring } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

/* ── Floating Jewelry Ring (3D) ── */
function JewelryRing({ mouse }) {
  const meshRef = useRef();
  const innerRef = useRef();

  const goldMaterial = useMemo(() => ({
    color: '#D4AF37',
    metalness: 0.95,
    roughness: 0.08,
    envMapIntensity: 2.5,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      // Mouse parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (mouse.current.x * 0.4),
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (mouse.current.y * 0.2),
        0.05
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main ring torus */}
        <mesh castShadow>
          <torusGeometry args={[1.6, 0.22, 64, 128]} />
          <meshStandardMaterial {...goldMaterial} />
        </mesh>

        {/* Diamond accent on top */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <octahedronGeometry args={[0.25, 0]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.0}
            transmission={0.9}
            thickness={0.5}
            ior={2.42}
            envMapIntensity={3}
            clearcoat={1}
          />
        </mesh>

        {/* Side accent gems */}
        {[-0.4, 0.4].map((offset, i) => (
          <mesh key={i} position={[offset, 1.48, 0.12 * (i === 0 ? 1 : -1)]} castShadow>
            <octahedronGeometry args={[0.1, 0]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.1}
              roughness={0.0}
              transmission={0.85}
              thickness={0.3}
              ior={2.42}
              envMapIntensity={2.5}
              clearcoat={1}
            />
          </mesh>
        ))}

        {/* Inner ring detail */}
        <mesh ref={innerRef}>
          <torusGeometry args={[1.6, 0.08, 32, 128]} />
          <meshStandardMaterial
            color="#B8941E"
            metalness={1}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating particles ── */
function GoldParticles() {
  const count = 60;
  const particlesRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

/* ── 3D Scene ── */
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5e1" />
      <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#D4AF37" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#D4AF37" distance={10} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#fff8e7"
        castShadow
      />
      <JewelryRing mouse={mouse} />
      <GoldParticles />
      <Environment preset="studio" />
    </>
  );
}

/* ── Hero Section ── */
export default function HeroSection() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-primary-dark"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene mouse={mouse} />
        </Canvas>
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block font-accent text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
                Exquisite Craftsmanship
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl text-white font-bold leading-[1.1] mb-6"
            >
              Timeless{' '}
              <span className="gold-shimmer-text">Elegance</span>
              <br />
              Crafted for You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-base sm:text-lg max-w-md mb-8 leading-relaxed"
            >
              Discover handcrafted jewelry that celebrates heritage and artistry.
              Each piece is a masterwork of precision and beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/collections" className="btn-gold">
                Explore Collections
              </Link>
              <Link to="/collections?category=bridal" className="btn-outline-gold !border-white/30 !text-white hover:!bg-white hover:!text-primary-dark hover:!border-white">
                Bridal Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs font-accent tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
