import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Experience from './components/Experience';
import ScrollOverlay from './components/ScrollOverlay';
import './styles/index.css';

function App() {
  return (
    <div className="main">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <ScrollControls pages={4} damping={0.25}>
          {/* This makes useScroll() work */}
          <Scroll>
            <Experience />
          </Scroll>
        </ScrollControls>
      </Canvas>

      {/* HTML overlay (non-scrollable) */}
      <ScrollOverlay />
    </div>
  );
}

export default App;
