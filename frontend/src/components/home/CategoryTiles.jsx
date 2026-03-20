import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';

const categories = [
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Symbols of eternal love',
    emoji: '💍',
    gradient: 'from-amber-50 to-orange-50',
  },
  {
    name: 'Chains',
    slug: 'chains',
    description: 'Elegance in every link',
    emoji: '📿',
    gradient: 'from-yellow-50 to-amber-50',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Grace that catches light',
    emoji: '✨',
    gradient: 'from-rose-50 to-pink-50',
  },
  {
    name: 'Bridal',
    slug: 'bridal',
    description: 'For your perfect day',
    emoji: '👑',
    gradient: 'from-violet-50 to-purple-50',
  },
];

export default function CategoryTiles() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Shop by Category</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Explore our curated collections crafted for every occasion
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <Link
              to={`/collections?category=${cat.slug}`}
              className="group block relative overflow-hidden rounded-xl aspect-[3/4] bg-gradient-to-br ${cat.gradient}"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gold/40 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  className="text-5xl sm:text-6xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {cat.emoji}
                </motion.div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-primary mb-1 group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm font-accent text-gray-500">
                  {cat.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 overflow-hidden h-6">
                  <motion.span
                    className="block font-accent text-xs text-gold tracking-wider uppercase font-semibold"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    Explore →
                  </motion.span>
                </div>
              </div>

              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 gold-shimmer pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
