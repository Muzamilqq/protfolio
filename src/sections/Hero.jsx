import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText.jsx";
import ParallaxBackground from "../components/parallaxBackground.jsx";
import { Astronaut } from "../components/Astronaut.jsx";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader.jsx";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          camera={{ position: [0, 1, 3] }}
          // Force 1× pixel ratio on mobile — halves GPU fill work on high-DPR screens
          dpr={isMobile ? 1 : [1, 2]}
        >
          <Suspense fallback={<Loader />}>
            <Float
              // Lighter float animation on mobile
              speed={isMobile ? 1 : 2}
              floatIntensity={isMobile ? 0.3 : 1}
              rotationIntensity={isMobile ? 0.3 : 1}
            >
              <Astronaut
                scale={isMobile ? 0.23 : undefined}
                position={isMobile ? [0, -1.5, 0] : undefined}
              />
            </Float>
            {/*
              Mouse-tracking camera runs every frame via useFrame.
              Skip it on mobile — touch devices have no cursor,
              and this saves one useFrame call per render.
            */}
            {!isMobile && <Rig />}
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta,
    );
  });
}

export default Hero;
