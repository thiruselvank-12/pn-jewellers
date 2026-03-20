import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  Shop: [
    { name: 'Rings', path: '/collections?category=rings' },
    { name: 'Chains & Necklaces', path: '/collections?category=chains' },
    { name: 'Earrings', path: '/collections?category=earrings' },
    { name: 'Bridal Collection', path: '/collections?category=bridal' },
    { name: 'New Arrivals', path: '/collections' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Craftsmanship', path: '/craftsmanship' },
    { name: 'Store Locator', path: '/stores' },
    { name: 'Careers', path: '/careers' },
  ],
  Support: [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Shipping & Returns', path: '/shipping' },
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'Care Instructions', path: '/jewelry-care' },
    { name: 'FAQs', path: '/faq' },
  ],
};

const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaPinterestP, href: '#', label: 'Pinterest' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-white font-heading font-bold text-base">PN</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-wide">
                  PN Jewellers
                </span>
                <span className="text-gold text-[10px] font-accent font-medium tracking-[0.2em] uppercase">
                  Since 1975
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Crafting timeless jewelry since 1975. Every piece tells a story of heritage,
              precision, and unmatched elegance. Experience the art of fine Indian jewelry.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-accent font-semibold text-sm text-white tracking-wider uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/50 hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-accent">
            © {new Date().getFullYear()} PN Jewellers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-white/40 text-xs font-accent hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 text-xs font-accent hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
