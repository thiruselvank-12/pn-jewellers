import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('pn-user') || 'null'),
  token: localStorage.getItem('pn-token') || null,
  isAuthenticated: !!localStorage.getItem('pn-token'),

  login: (user, token) => {
    localStorage.setItem('pn-user', JSON.stringify(user));
    localStorage.setItem('pn-token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('pn-user');
    localStorage.removeItem('pn-token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    const user = { ...JSON.parse(localStorage.getItem('pn-user') || '{}'), ...userData };
    localStorage.setItem('pn-user', JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
