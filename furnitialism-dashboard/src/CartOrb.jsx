import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Image } from '@react-three/drei';
import { useStore } from './store';
import * as THREE from 'three';

export const CartOrb = () => {
    const { animState, endAnimation } = useStore();
    const groupRef = useRef();
    const { camera, size } = useThree();
    const startTimeRef = useRef(0);
    const startVec = useRef(new THREE.Vector3());
    const endVec = useRef(new THREE.Vector3());
    const controlVec = useRef(new THREE.Vector3());

    // We render the image only if we have one.
    // To handle textures dynamically without suspense issues in a simple way for this demo,
    // we leverage the <Image> component from Drei which handles loading gracefully.

    useFrame((state) => {
        if (!animState.active || !groupRef.current) {
            if (groupRef.current) groupRef.current.visible = false;
            return;
        }

        // Initialize animation start
        if (!groupRef.current.visible) {
            groupRef.current.visible = true;
            startTimeRef.current = state.clock.elapsedTime;

            // 1. Start Position (3D World Space)
            startVec.current.set(...animState.startPos);

            // 2. End Position (Projected from 2D Screen)
            const [screenX, screenY] = animState.endPos;
            const ndcX = (screenX / size.width) * 2 - 1;
            const ndcY = -(screenY / size.height) * 2 + 1;

            // Vector at fixed distance from camera
            const dist = 2.5;
            endVec.current.set(ndcX, ndcY, 0.5);
            endVec.current.unproject(camera);
            endVec.current.sub(camera.position).normalize().multiplyScalar(dist).add(camera.position);

            // 3. Control Point for Bezier Curve (The Arch)
            // Midpoint + upward offset relative to camera up vector
            controlVec.current.copy(startVec.current).add(endVec.current).multiplyScalar(0.5);
            controlVec.current.y += 1.5; // Arch height

            // Allow group to face camera
            groupRef.current.lookAt(camera.position);

            // Reset scale
            groupRef.current.scale.set(0, 0, 0);
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const duration = 1.2; // Slower duration for visibility
        const progress = Math.min(elapsed / duration, 1);

        // Easing: Smooth Step
        const ease = progress * progress * (3 - 2 * progress);

        // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        const t = ease;
        const p0 = startVec.current;
        const p1 = controlVec.current;
        const p2 = endVec.current;

        groupRef.current.position.x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        groupRef.current.position.y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
        groupRef.current.position.z = (1 - t) * (1 - t) * p0.z + 2 * (1 - t) * t * p1.z + t * t * p2.z;

        // Scale Animation: Pop up then shrink at target
        let scale = 0;
        if (progress < 0.2) {
            // Pop in
            scale = progress / 0.2;
        } else if (progress > 0.8) {
            // Shrink out
            scale = 1 - (progress - 0.8) / 0.2;
        } else {
            scale = 1;
        }

        // Base size 0.5
        groupRef.current.scale.setScalar(scale * 0.5);

        // Rotation for fun (spin as it flies)
        // groupRef.current.rotation.z += 0.1; 

        if (progress >= 1) {
            endAnimation();
            groupRef.current.visible = false;
        }
    });

    return (
        <group ref={groupRef} visible={false}>
            {/* Glowing backing */}
            <mesh position={[0, 0, -0.01]}>
                <circleGeometry args={[0.6, 32]} />
                <meshBasicMaterial color="#7C3AED" transparent opacity={0.6} />
            </mesh>

            {/* Product Image */}
            {animState.image && (
                <Image
                    url={animState.image}
                    transparent
                    scale={[1, 1]}
                    radius={0.5} // Circular mask
                    toneMapped={false}
                />
            )}
        </group>
    );
};
