import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('pn-cart') || '[]'),

  addItem: (product, options = {}) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedMetal === (options.metal || product.metalType) &&
        item.selectedStone === (options.stone || product.stoneType) &&
        item.selectedSize === (options.size || null)
    );

    let newItems;
    if (existingIndex >= 0) {
      newItems = items.map((item, i) =>
        i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [
        ...items,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images?.[0] || '',
          selectedMetal: options.metal || product.metalType,
          selectedStone: options.stone || product.stoneType,
          selectedSize: options.size || null,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem('pn-cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id, metal, stone, size) => {
    const newItems = get().items.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedMetal === metal &&
          item.selectedStone === stone &&
          item.selectedSize === size
        )
    );
    localStorage.setItem('pn-cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (id, metal, stone, size, quantity) => {
    if (quantity < 1) return;
    const newItems = get().items.map((item) =>
      item.id === id &&
      item.selectedMetal === metal &&
      item.selectedStone === stone &&
      item.selectedSize === size
        ? { ...item, quantity }
        : item
    );
    localStorage.setItem('pn-cart', JSON.stringify(newItems));
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem('pn-cart');
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
