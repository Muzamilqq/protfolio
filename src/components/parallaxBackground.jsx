import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";

const ParallaxBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  // Always call hooks (Rules of Hooks) — transforms just won't be applied on mobile
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);

  /*
    Mobile fast path — render only static <div> layers with no motion transforms.
    This completely removes per-frame style mutations, ResizeObserver callbacks,
    and scroll-listener overhead caused by framer-motion's useTransform pipeline.
    Visual result: still looks great, just no parallax depth.
  */
  if (isMobile) {
    return (
      <section className="absolute inset-0 bg-black/40">
        <div className="relative h-screen overflow-y-hidden">
          <div
            className="absolute inset-0 w-full h-screen -z-50"
            style={{
              backgroundImage: "url(/assets/sky.jpg)",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          />
          <div
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage: "url(/assets/mountain-2.png)",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: "url(/assets/mountain-1.png)",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          />
        </div>
      </section>
    );
  }

  // Desktop — full multi-layer parallax
  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountain Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
