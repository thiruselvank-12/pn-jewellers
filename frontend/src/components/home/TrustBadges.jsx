import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { HiShieldCheck, HiTruck, HiRefresh, HiBadgeCheck } from 'react-icons/hi';

const badges = [
  {
    icon: HiBadgeCheck,
    title: 'BIS Hallmarked',
    description: 'Every piece is 100% BIS certified for gold purity',
  },
  {
    icon: HiShieldCheck,
    title: '100% Certified',
    description: 'IGI & GIA certified diamonds and gemstones',
  },
  {
    icon: HiTruck,
    title: 'Free Insured Shipping',
    description: 'Complimentary delivery with full insurance coverage',
  },
  {
    icon: HiRefresh,
    title: '30-Day Returns',
    description: 'Hassle-free returns within 30 days of purchase',
  },
];

export default function TrustBadges() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center p-6 rounded-xl hover:bg-bg transition-all duration-500"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <badge.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-base font-semibold text-primary mb-1.5">
                {badge.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-accent leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
