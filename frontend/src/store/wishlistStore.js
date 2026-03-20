import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('pn-wishlist') || '[]'),

  addItem: (product) => {
    const items = get().items;
    if (items.some((item) => item.id === product.id)) return;
    const newItems = [
      ...items,
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0] || '',
        metalType: product.metalType,
      },
    ];
    localStorage.setItem('pn-wishlist', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    localStorage.setItem('pn-wishlist', JSON.stringify(newItems));
    set({ items: newItems });
  },

  isWishlisted: (id) => {
    return get().items.some((item) => item.id === id);
  },

  toggleItem: (product) => {
    if (get().isWishlisted(product.id)) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },
}));

export default useWishlistStore;
