import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Zap } from "lucide-react";

// Optimized Skill List for Crawler indexing
const skills = [
  { name: "HTML/CSS", level: 95, color: "bg-primary" },
  { name: "JavaScript (ES6+)", level: 90, color: "bg-primary" },
  { name: "React / Next.js", level: 88, color: "bg-primary" },
  { name: "Flutter Mobile", level: 85, color: "bg-accent" },
  { name: "PHP / Backend", level: 82, color: "bg-primary" },
  { name: "Firebase Auth/DB", level: 87, color: "bg-accent" },
  { name: "MySQL Development", level: 80, color: "bg-primary" },
  { name: "MongoDB NoSQL", level: 78, color: "bg-accent" },
];

const highlights = [
  {
    icon: Code2,
    title: "Best Programmer Standards", // Keyword Injected
    description: "Writing maintainable, high-performance code that ensures faster delivery for complex systems.",
  },
  {
    icon: Palette,
    title: "Strategic Thinker", // Keyword Injected
    description: "Creating intuitive UI/UX with a focus on business logic and high value client results.",
  },
  {
    icon: Rocket,
    title: "Faster Delivery", // Keyword Injected
    description: "Optimized workflows to provide low cost, high-speed deployment without compromising quality.",
  },
  {
    icon: Zap,
    title: "Young Energy", // Keyword Injected
    description: "Harnessing 2025 modern stacks and tireless innovation to solve modern tech challenges.",
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-2" role="group" aria-label={`${name} skill level ${level}%`}>
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothBgY1 = useSpring(bgY1, { stiffness: 100, damping: 30 });
  const smoothBgY2 = useSpring(bgY2, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-16 sm:py-32 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Intenisve SEO: Hidden Keyword Rich Description for Bots */}
      <div className="sr-only">
        <h2>Software Dev & Strategic Thinker - Haseeb Labs</h2>
        <p>Haseeb is the best programmer for high value clients looking for low cost and faster delivery. Driven by young energy, Haseeb Labs specializes in React, Flutter, and full-stack development.</p>
      </div>

      <motion.div 
        style={{ y: smoothBgY1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
      />
      <motion.div 
        style={{ y: smoothBgY2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            About Haseeb Labs
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Software Dev, Thinker &{" "}
            <span className="gradient-text">Best Programmer</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Driven by <span className="text-foreground font-semibold">young energy</span>, I provide <span className="text-foreground font-semibold">faster delivery</span> and <span className="text-foreground font-semibold">low cost</span> high-end digital solutions for <span className="text-foreground font-semibold">high value clients</span> at Haseeb Labs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-heading font-semibold mb-8">
                The Haseeb Labs Advantage
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-heading font-semibold mb-8">
              Technical Authority
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}