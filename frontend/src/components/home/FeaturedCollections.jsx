import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import useScrollReveal from '../../hooks/useScrollReveal';
import useWishlistStore from '../../store/wishlistStore';
import { products, formatPrice } from '../../data/products';

function ProductCard({ product, index }) {
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[280px] sm:w-[300px] group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-100 mb-4">
          {/* Placeholder with gold shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="text-gold text-2xl">💎</span>
              </div>
              <span className="text-xs font-accent text-gray-400 tracking-wider uppercase">{product.category}</span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

          {/* Gold shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gold-shimmer pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-gold text-primary-dark text-[10px] font-accent font-bold tracking-wider uppercase rounded-sm">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-accent font-bold tracking-wider uppercase rounded-sm">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-300"
      >
        {isWishlisted ? (
          <HiHeart className="w-4.5 h-4.5 text-red-500" />
        ) : (
          <HiOutlineHeart className="w-4.5 h-4.5 text-gray-600" />
        )}
      </button>

      {/* Info */}
      <div>
        <p className="text-xs font-accent text-gray-400 tracking-wider uppercase mb-1">
          {product.metalType}
        </p>
        <h3 className="font-heading text-base font-semibold text-primary mb-1 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-accent font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-accent text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedCollections() {
  const scrollRef = useRef(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const featured = products.filter((p) => p.isFeatured);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured Collections</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Handpicked masterpieces that define elegance and sophistication
        </p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-all duration-300 -ml-2 hidden sm:flex"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-all duration-300 -mr-2 hidden sm:flex"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* View All CTA */}
      <div className="text-center mt-10">
        <Link to="/collections" className="btn-outline-gold">
          View All Collections
        </Link>
      </div>
    </section>
  );
}
