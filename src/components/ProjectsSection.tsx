import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Mobile Apps", "Web Apps", "WordPress"];

const projects = [
  {
    id: 1,
    title: "FinTrack Pro",
    description:
      "A comprehensive finance tracking mobile app with real-time analytics and budget management.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Charts"],
    color: "from-primary to-accent",
  },
  {
    id: 2,
    title: "CloudCommerce",
    description:
      "Full-stack e-commerce platform with inventory management and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "MongoDB", "Stripe"],
    color: "from-accent to-primary",
  },
  {
    id: 3,
    title: "HealthHub",
    description:
      "Healthcare appointment booking system with telemedicine features and patient portal.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    category: "WordPress",
    tech: ["WordPress", "PHP", "MySQL"],
    color: "from-primary to-accent",
  },
  {
    id: 4,
    title: "TaskFlow",
    description:
      "Project management app with Kanban boards, team collaboration, and progress tracking.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Push Notifications"],
    color: "from-accent to-primary",
  },
  {
    id: 5,
    title: "RestaurantOS",
    description:
      "Complete restaurant management system with ordering, POS, and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "PHP", "MySQL"],
    color: "from-primary to-accent",
  },
  {
    id: 6,
    title: "TravelBuddy",
    description:
      "Travel planning and booking platform with itinerary management and local recommendations.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
    category: "WordPress",
    tech: ["WordPress", "JavaScript", "APIs"],
    color: "from-accent to-primary",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-background/90 rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium bg-secondary rounded-md text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgX2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothBgX1 = useSpring(bgX1, { stiffness: 100, damping: 30 });
  const smoothBgX2 = useSpring(bgX2, { stiffness: 100, damping: 30 });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ x: smoothBgX1 }}
        className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" 
      />
      <motion.div 
        style={{ x: smoothBgX2 }}
        className="absolute top-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-x-1/2" 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my expertise across mobile,
            web, and enterprise solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
