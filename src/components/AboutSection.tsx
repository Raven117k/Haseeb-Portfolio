import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Zap } from "lucide-react";

const skills = [
  { name: "HTML/CSS", level: 95, color: "bg-primary" },
  { name: "JavaScript", level: 90, color: "bg-primary" },
  { name: "React", level: 88, color: "bg-primary" },
  { name: "Flutter", level: 85, color: "bg-accent" },
  { name: "PHP", level: 82, color: "bg-primary" },
  { name: "Firebase", level: 87, color: "bg-accent" },
  { name: "MySQL", level: 80, color: "bg-primary" },
  { name: "MongoDB", level: 78, color: "bg-accent" },
];

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating beautiful, intuitive user interfaces",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and exceptional user experience",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description: "Using cutting-edge technologies and best practices",
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
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
    <section ref={sectionRef} id="about" className="py-16 sm:py-32 relative overflow-hidden">
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ y: smoothBgY1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
      />
      <motion.div 
        style={{ y: smoothBgY2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Passionate Developer &{" "}
            <span className="gradient-text">Problem Solver</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            At 19, I've already built a diverse portfolio spanning mobile apps,
            web applications, and full-stack solutions. I believe in writing
            clean code that makes a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Left Column - Highlights */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-heading font-semibold mb-8">
                What I Bring to the Table
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
                      <item.icon className="w-6 h-6 text-primary" />
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

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-heading font-semibold mb-8">
              Technical Skills
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
