# PN Jewellers - Luxury eCommerce Platform

A premium jewelry eCommerce platform focused on visual storytelling, built for an immersive 3D experience with smooth micro-interactions.

## 🚀 Tech Stack
- **Frontend Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4, custom glassmorphism & gold shimmer CSS classes
- **3D Viewer:** React Three Fiber, Three.js, `@react-three/drei`
- **Animations:** Framer Motion
- **State Management:** Zustand (Cart, Wishlist, Auth stores via `localStorage`)
- **Routing:** React Router DOM (Lazy-loaded page transitions)
- **Icons:** React Icons (`hi2`)

## 🛠 Features Included
- **Homepage:** Fullscreen 3D floating ring, mouse parallax, drifting gold sparkles, scrollable featured collections with tilt cards, category tiles, trust badges, testimonials.
- **Product Listing:** Filter by metal type, stone type, price sliding range, and sort methods (Newest, Price, Popularity). 
- **Product Details:** Immersive 3D ring viewer with orbit controls, zoom, and 3 lighting environments (Studio, Warm, Daylight). 
- **eCommerce Flow:** Shopping Cart with state management and tax/shipping logic, multi-step Checkout (Address, Payment, Confirmation).
- **Session & Account:** Login and Account screen mockups mapping to `authStore` backed by `localStorage` for stateless frontend experience.

## 💻 How to Run Locally

If you haven't yet, install Node.js 20+

1. Open your terminal in this `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Look at the terminal output to find the local URL (usually `http://localhost:5173/`).
5. Open your browser and navigate to the URL provided.

## ⚙️ Project Structure

- `src/components/home/`: All sections that compose the main landing page.
- `src/data/`: Mock products and store data backing the platform.
- `src/hooks/`: Reusable react hooks like `useScrollReveal()`.
- `src/pages/`: Main application routes (`Home`, `ProductListing`, `ProductDetail`, etc).
- `src/store/`: Zustand global state slices.
- `src/styles/`: global Tailwind UI token exports and animations.
