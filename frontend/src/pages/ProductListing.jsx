import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiHeart, HiAdjustments, HiX } from 'react-icons/hi';
import { products, categories, formatPrice } from '../data/products';
import useWishlistStore from '../store/wishlistStore';

const metalFilters = ['All', '18K Yellow Gold', '18K White Gold', '18K Rose Gold', '22K Yellow Gold', 'Platinum'];
const stoneFilters = ['All', 'Diamond', 'Ruby', 'Emerald', 'Pearl', 'Kundan', 'Polki'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

function ProductCard({ product, index }) {
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <span className="text-2xl">
                  {product.category === 'rings' ? '💍' : product.category === 'chains' ? '📿' : product.category === 'earrings' ? '✨' : '👑'}
                </span>
              </div>
              <span className="text-xs font-accent text-gray-400 tracking-wider uppercase">{product.name}</span>
            </div>
          </div>

          {/* Hover effects */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gold-shimmer pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-gold text-primary-dark text-[10px] font-accent font-bold tracking-wider uppercase rounded-sm">New</span>
            )}
            {product.originalPrice && (
              <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-accent font-bold tracking-wider uppercase rounded-sm">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            {isWishlisted ? <HiHeart className="w-4 h-4 text-red-500" /> : <HiOutlineHeart className="w-4 h-4 text-gray-600" />}
          </button>

          {/* Quick view */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
            <div className="btn-gold w-full text-xs !py-2.5">Quick View</div>
          </div>
        </div>
      </Link>

      <div>
        <p className="text-[11px] font-accent text-gray-400 tracking-wider uppercase mb-0.5">{product.metalType}</p>
        <h3 className="font-heading text-sm sm:text-base font-semibold text-primary mb-1 group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-accent font-bold text-sm text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="font-accent text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-[10px] ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`}>★</span>
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product.reviewCount})</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [selectedStone, setSelectedStone] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 600000]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') result = result.filter((p) => p.category === selectedCategory);
    if (selectedMetal !== 'All') result = result.filter((p) => p.metalType === selectedMetal);
    if (selectedStone !== 'All') result = result.filter((p) => p.stoneType.includes(selectedStone));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return result;
  }, [selectedCategory, selectedMetal, selectedStone, sortBy, priceRange]);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-bg py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-2"
          >
            {selectedCategory !== 'all' ? categories.find((c) => c.slug === selectedCategory)?.name || 'Collections' : 'All Collections'}
          </motion.h1>
          <div className="gold-divider" />
          <p className="font-accent text-sm text-gray-500 mt-3">
            {filtered.length} exquisite pieces
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-accent text-primary hover:border-gold transition-colors duration-300"
            >
              <HiAdjustments className="w-4 h-4" />
              Filters
            </button>

            {/* Category pills */}
            <div className="hidden sm:flex gap-2 ml-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-accent font-medium transition-all duration-300 ${
                  selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-accent font-medium transition-all duration-300 ${
                    selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-accent text-primary focus:outline-none focus:border-gold"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-bg rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-accent font-semibold text-sm text-primary">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-primary">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-accent font-medium text-gray-500 mb-2 uppercase tracking-wider">Metal Type</label>
                <select value={selectedMetal} onChange={(e) => setSelectedMetal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-accent focus:outline-none focus:border-gold">
                  {metalFilters.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-accent font-medium text-gray-500 mb-2 uppercase tracking-wider">Stone Type</label>
                <select value={selectedStone} onChange={(e) => setSelectedStone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-accent focus:outline-none focus:border-gold">
                  {stoneFilters.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-accent font-medium text-gray-500 mb-2 uppercase tracking-wider">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <input
                  type="range"
                  min="0"
                  max="600000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-gold"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">💎</p>
            <p className="font-heading text-xl text-primary mb-2">No pieces found</p>
            <p className="font-accent text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
