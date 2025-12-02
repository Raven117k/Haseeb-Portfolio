import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxWrapper({ 
  children, 
  offset = 50, 
  className = "" 
}: ParallaxWrapperProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className = "" }: ScaleOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function FadeInOnScroll({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0 
}: FadeInOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const getInitialOffset = () => {
    switch (direction) {
      case "up": return { x: 0, y: 60 };
      case "down": return { x: 0, y: -60 };
      case "left": return { x: 60, y: 0 };
      case "right": return { x: -60, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();
  
  const x = useTransform(scrollYProgress, [0, 1], [initialOffset.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [initialOffset.y, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY, opacity: smoothOpacity }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  degrees?: number;
}

export function RotateOnScroll({ 
  children, 
  className = "", 
  degrees = 5 
}: RotateOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ rotate: smoothRotate }} className={className}>
      {children}
    </motion.div>
  );
}
