import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function ToteBag(props) {
  const { scene } = useGLTF('/white.glb');
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

