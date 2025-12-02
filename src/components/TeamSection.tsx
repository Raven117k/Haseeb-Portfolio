import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

const team = [
  {
    id: 1,
    name: "Haseeb",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&crop=face",
    bio: "Full-stack architect with a passion for clean code and scalable solutions.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 2,
    name: "Haseeb",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&crop=face",
    bio: "Creating intuitive interfaces that users love and businesses trust.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 3,
    name: "Haseeb",
    role: "Mobile Developer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&crop=face",
    bio: "Flutter expert building cross-platform apps with native performance.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 4,
    name: "Haseeb",
    role: "Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face",
    bio: "Database wizard ensuring your data is fast, secure, and reliable.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Avatar */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
          
          {/* Social Icons - Appear on Hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <motion.a
              href={member.socials.twitter}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={member.socials.linkedin}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={member.socials.github}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-heading font-semibold mb-1">
            {member.name}
          </h3>
          <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
          <p className="text-muted-foreground text-sm">{member.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgRotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const bgRotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const smoothBgRotate1 = useSpring(bgRotate1, { stiffness: 100, damping: 30 });
  const smoothBgRotate2 = useSpring(bgRotate2, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} id="team" className="py-16 sm:py-32 relative overflow-hidden">
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ rotate: smoothBgRotate1 }}
        className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2" 
      />
      <motion.div 
        style={{ rotate: smoothBgRotate2 }}
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            The Team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Meet Our <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            A versatile team of specialists (all roles performed by one
            dedicated developer) bringing your vision to life.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Fun Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-muted-foreground text-sm mt-12 italic"
        >
          * Plot twist: It's all me! One developer, many hats. 🎭
        </motion.p>
      </div>
    </section>
  );
}
