import { Html, useScroll } from '@react-three/drei';

export default function ScrollOverlay() {
  return (
    <div className="overlay">
      <section className="section">
        <h1>🔥 Your New Fashion Friend</h1>
        <p>Scroll to rotate and explore our eco-stylish tote bag</p>
      </section>
      <section className="section">
        <h1>🎨 3D Dynamic Showcase</h1>
        <p>Each scroll reveals a new side, a new vibe</p>
      </section>
      <section className="section">
        <h1>💼 Premium Minimal Design</h1>
        <p>Designed for elegance, powered by AI</p>
      </section>
      <section className="section">
        <h1>🛒 Shop Now</h1>
        <button className="btn">Explore Variants</button>
      </section>
    </div>
  );
}
