import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import img1 from "../Images/1.png";
import img2 from "../Images/2.png";
import img3 from "../Images/3.png";
import img4 from "../Images/4.png";
import img5 from "../Images/5.png";
import img6 from "../Images/6.png";


const projects = [
  {
    id: 1,
    title: "Horizon Travels",
    description:
      "A modern travel agency website showcasing tour packages, destinations, and inquiry booking with a clean, trust-focused design.",
    image: img1,
    category: "Website",
    tech: ["Wordpress", "Elementor"],
    color: "from-primary to-accent",
    liveUrl: "https://horizontravels.co.uk",
  },
  {
    id: 2,
    title: "Ikhlas-Traveks",
    description:
      "A professional travel and tourism website highlighting visa services, travel packages, and customer contact funnels.",
    image: img2,
    category: "Website",
    tech: ["Wordpress", "Elementor"],
    color: "from-accent to-primary",
    liveUrl: "https://ikhlastravel.co.uk/"
  },
  {
    id: 3,
    title: "Fresh Movers",
    description:
      "A service-based business website for a moving company, featuring service details, booking requests, and location coverage.",
    image: img3,
    category: "Website",
    tech: ["WordPress", "Gutenberg"],
    color: "from-primary to-accent",
    liveUrl: "https://freshmovers.ae/"
  },
  {
    id: 4,
    title: "ASF Sanitary Fittings",
    description:
      "A custom-built web application for managing sanitary product listings, inquiries, and backend product data.",
    image: img4,
    category: "Web-App",
    tech: ["Custom Code", "PHP", "MySQL"],
    color: "from-accent to-primary",
    liveUrl: "https://asfsanitaryfitting.com/"
  },
  {
    id: 5,
    title: "Vision Sanitary Fittings",
    description:
      "A business web application designed to showcase sanitary products with dynamic management and admin control features.",
    image: img5,
    category: "Web-App",
    tech: ["Custom Code", "PHP", "MySQL"],
    color: "from-primary to-accent",
    liveUrl: "https://visionsanitaryfitting.com/"
  },
  {
    id: 6,
    title: "Mobi-Sim",
    description:
      "A Chrome extension for web developers that provides live mobile viewport previews to test and validate responsive designs in real time.",
    image: img6,
    category: "Chrome Extension",
    tech: ["HTML", "JavaScript", "APIs"],
    color: "from-accent to-primary",
    liveUrl: "https://chromewebstore.google.com/detail/mobi-sim/mnnaibpmgkhhopgpmaedmdnilhldhlhc"
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
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
