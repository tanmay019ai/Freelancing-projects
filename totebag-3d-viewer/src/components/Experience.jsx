import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import ToteBag from './ToteBag';

export default function Experience() {
  const group = useRef();
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset; // 0 → 1
    const totalPages = 4; // must match ScrollControls pages
    const pageIndex = Math.round(offset * (totalPages - 1));

    // Each section rotates 90° (Math.PI / 2)
    const targetRotationY = pageIndex * (Math.PI / 2);

    if (group.current) {
      // Smoothly interpolate towards target rotation
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.1 // smoothness factor
      );
    }
  });

  return (
    <group ref={group}>
      {/* Axis correction */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <ToteBag />
      </group>
    </group>
  );
}
