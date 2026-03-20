import { useState, useMemo, useRef, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { HiOutlineHeart, HiHeart, HiShieldCheck, HiRefresh, HiBadgeCheck, HiTruck, HiMinus, HiPlus, HiStar } from 'react-icons/hi';
import * as THREE from 'three';
import { products, formatPrice } from '../data/products';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';

/* ── 3D Product Viewer Ring ── */
function ProductRing({ lightingPreset }) {
  const meshRef = useRef();

  const lighting = useMemo(() => {
    switch (lightingPreset) {
      case 'warm': return { env: 'sunset', intensity: 1.8, color: '#ffe4b3' };
      case 'daylight': return { env: 'dawn', intensity: 2.2, color: '#ffffff' };
      default: return { env: 'studio', intensity: 2.0, color: '#fff5e1' };
    }
  }, [lightingPreset]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={lighting.intensity} color={lighting.color} />
      <directionalLight position={[-3, 2, -3]} intensity={0.6} color="#D4AF37" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#D4AF37" distance={8} />

      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
        <group ref={meshRef}>
          <mesh castShadow>
            <torusGeometry args={[1.3, 0.2, 64, 128]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} envMapIntensity={2.5} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0} transmission={0.9} thickness={0.5} ior={2.42} envMapIntensity={3} clearcoat={1} />
          </mesh>
          {[-0.35, 0.35].map((o, i) => (
            <mesh key={i} position={[o, 1.2, 0.1 * (i === 0 ? 1 : -1)]}>
              <octahedronGeometry args={[0.08, 0]} />
              <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0} transmission={0.85} thickness={0.3} ior={2.42} envMapIntensity={2.5} clearcoat={1} />
            </mesh>
          ))}
        </group>
      </Float>

      <Environment preset={lighting.env} />
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={6} autoRotate={false} enableDamping dampingFactor={0.05} />
    </>
  );
}

const lightingPresets = [
  { id: 'studio', label: 'Studio', icon: '🎬' },
  { id: 'warm', label: 'Warm', icon: '🌅' },
  { id: 'daylight', label: 'Daylight', icon: '☀️' },
];

const trustPoints = [
  { icon: HiBadgeCheck, text: 'BIS Hallmarked Gold' },
  { icon: HiShieldCheck, text: '100% Certified Stones' },
  { icon: HiTruck, text: 'Free Insured Shipping' },
  { icon: HiRefresh, text: '30-Day Easy Returns' },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product?.id));

  const [selectedMetal, setSelectedMetal] = useState(product?.metalType || '');
  const [selectedStone, setSelectedStone] = useState(product?.stoneType || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [lightingPreset, setLightingPreset] = useState('studio');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">💎</p>
          <h2 className="font-heading text-2xl mb-2">Product Not Found</h2>
          <Link to="/collections" className="btn-gold mt-4 inline-block">Browse Collections</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, { metal: selectedMetal, stone: selectedStone, size: selectedSize });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs font-accent text-gray-400">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: 3D Viewer */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                  <ProductRing lightingPreset={lightingPreset} />
                </Suspense>
              </Canvas>

              {/* Lighting presets */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-card">
                {lightingPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setLightingPreset(preset.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-accent font-medium transition-all duration-300 ${
                      lightingPreset === preset.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {preset.icon} {preset.label}
                  </button>
                ))}
              </div>

              {/* Interaction hint */}
              <div className="absolute top-4 right-4 text-xs font-accent text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                🖱️ Drag to rotate · Scroll to zoom
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {/* Category */}
            <p className="text-xs font-accent text-gold tracking-[0.2em] uppercase mb-2">{product.category}</p>

            {/* Name */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-accent text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-heading text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="font-accent text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-accent font-semibold rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Metal selector */}
            <div className="mb-5">
              <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-2">Metal Type</label>
              <div className="flex flex-wrap gap-2">
                {product.metalOptions.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-4 py-2 rounded-lg border text-xs font-accent font-medium transition-all duration-300 ${
                      selectedMetal === metal ? 'border-gold bg-gold/10 text-primary' : 'border-gray-200 text-gray-600 hover:border-gold/50'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Stone selector */}
            <div className="mb-5">
              <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-2">Stone</label>
              <div className="flex flex-wrap gap-2">
                {product.stoneOptions.map((stone) => (
                  <button
                    key={stone}
                    onClick={() => setSelectedStone(stone)}
                    className={`px-4 py-2 rounded-lg border text-xs font-accent font-medium transition-all duration-300 ${
                      selectedStone === stone ? 'border-gold bg-gold/10 text-primary' : 'border-gray-200 text-gray-600 hover:border-gold/50'
                    }`}
                  >
                    {stone}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-accent font-semibold text-gray-500 tracking-wider uppercase mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-lg border text-xs font-accent font-semibold transition-all duration-300 ${
                        selectedSize === size ? 'border-gold bg-gold text-primary-dark' : 'border-gray-200 text-gray-600 hover:border-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:text-primary transition-colors">
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="px-4 font-accent font-semibold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:text-primary transition-colors">
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-gold flex-1">
                {addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gold hover:text-gold'
                }`}
              >
                {isWishlisted ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 p-5 bg-bg rounded-xl mb-6">
              {trustPoints.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs font-accent text-gray-600">{text}</span>
                </div>
              ))}
            </div>

            {/* Product details & certifications */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex gap-4 mb-4">
                {['description', 'details', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-accent text-xs font-semibold tracking-wider uppercase pb-2 transition-all duration-300 ${
                      activeTab === tab ? 'text-primary border-b-2 border-gold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              )}

              {activeTab === 'details' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500 font-accent">Weight</span><span className="font-medium">{product.weight}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500 font-accent">Purity</span><span className="font-medium">{product.purity}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500 font-accent">Certifications</span><span className="font-medium">{product.certifications.join(', ')}</span></div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 font-accent">Reviews module — coming soon</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
