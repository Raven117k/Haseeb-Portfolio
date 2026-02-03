import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Hero3D } from "./Hero3D";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
      aria-label="Haseeb Labs Hero - Best Programmer & Software Dev"
    >
      <Hero3D />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

      {/* Intensive SEO Hidden Block */}
      <div className="sr-only">
        <h1>Haseeb Labs - Software Dev & Strategic Thinker</h1>
        <p>Best programmer for high value clients, providing faster delivery and low cost software solutions with young energy.</p>
      </div>

      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge: Styled exactly like About Me's "About Me" tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-widest">
              Young Energy • Strategic Thinking • Faster Delivery
            </span>
          </motion.div>

          {/* Main Heading: Reduced from 8xl to match About Section's 5xl/6xl feel */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-[1.1]"
          >
            Hi, I'm <span className="gradient-text">Haseeb</span>, <br />
            <span className="text-2xl sm:text-4xl md:text-5xl opacity-90">Software Dev & Thinker</span>
          </motion.h1>

          {/* Subtitle: Size reduced to match About Section paragraph (text-lg) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-2 leading-relaxed"
          >
            The <span className="text-foreground font-semibold">best programmer</span> for <span className="text-foreground font-semibold">high value clients</span>. Delivering <span className="text-foreground font-semibold">low cost</span> and <span className="text-foreground font-semibold">faster delivery</span> through Haseeb Labs.
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 px-2"
          >
            {["React", "Flutter", "Firebase", "Strategic Thinking"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium bg-secondary rounded-full text-secondary-foreground border border-border/40"
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-all duration-300 glow text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-foreground bg-secondary border border-border rounded-xl hover:bg-secondary/80 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest">Explore Haseeb Labs</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}