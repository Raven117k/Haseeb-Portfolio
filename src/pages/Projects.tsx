import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Lenis from "lenis";

const categories = ["All", "Mobile Apps", "Web Apps", "WordPress", "Custom Code"];

const allProjects = [
  {
    id: 1,
    title: "FinTrack Pro",
    description:
      "A comprehensive finance tracking mobile app with real-time analytics, budget management, and expense categorization.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Charts"],
    color: "from-primary to-accent",
    featured: true,
  },
  {
    id: 2,
    title: "CloudCommerce",
    description:
      "Full-stack e-commerce platform with inventory management, payment integration, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "MongoDB", "Stripe"],
    color: "from-accent to-primary",
    featured: true,
  },
  {
    id: 3,
    title: "HealthHub",
    description:
      "Healthcare appointment booking system with telemedicine features, patient portal, and doctor scheduling.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    category: "WordPress",
    tech: ["WordPress", "PHP", "MySQL"],
    color: "from-primary to-accent",
    featured: true,
  },
  {
    id: 4,
    title: "TaskFlow",
    description:
      "Project management app with Kanban boards, team collaboration, progress tracking, and notifications.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Push Notifications"],
    color: "from-accent to-primary",
    featured: true,
  },
  {
    id: 5,
    title: "RestaurantOS",
    description:
      "Complete restaurant management system with ordering, POS, table management, and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "PHP", "MySQL"],
    color: "from-primary to-accent",
    featured: true,
  },
  {
    id: 6,
    title: "TravelBuddy",
    description:
      "Travel planning and booking platform with itinerary management, local recommendations, and trip sharing.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
    category: "WordPress",
    tech: ["WordPress", "JavaScript", "APIs"],
    color: "from-accent to-primary",
    featured: true,
  },
  {
    id: 7,
    title: "FitnessPal",
    description:
      "Workout tracking app with custom routines, progress photos, calorie tracking, and social features.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Health APIs"],
    color: "from-primary to-accent",
    featured: false,
  },
  {
    id: 8,
    title: "EduLearn",
    description:
      "Online learning platform with video courses, quizzes, certificates, and student progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "MongoDB", "Stripe"],
    color: "from-accent to-primary",
    featured: false,
  },
  {
    id: 9,
    title: "PropertyHub",
    description:
      "Real estate listing platform with virtual tours, mortgage calculator, and agent messaging system.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    category: "WordPress",
    tech: ["WordPress", "PHP", "Google Maps"],
    color: "from-primary to-accent",
    featured: false,
  },
  {
    id: 10,
    title: "EventMaster",
    description:
      "Event management and ticketing platform with QR code scanning, attendee management, and analytics.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["React", "Firebase", "QR Code"],
    color: "from-accent to-primary",
    featured: false,
  },
  {
    id: 11,
    title: "CryptoWatch",
    description:
      "Cryptocurrency portfolio tracker with real-time prices, alerts, news feed, and market analysis.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "APIs", "Charts"],
    color: "from-primary to-accent",
    featured: false,
  },
  {
    id: 12,
    title: "BlogForge",
    description:
      "Custom blogging platform with markdown editor, SEO tools, analytics, and social media integration.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
    category: "Custom Code",
    tech: ["React", "MongoDB", "SEO"],
    color: "from-accent to-primary",
    featured: false,
  },
  {
    id: 13,
    title: "InvoiceGen",
    description:
      "Invoice generation and management system with client tracking, payment reminders, and reporting.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    category: "Web Apps",
    tech: ["PHP", "MySQL", "PDF Generation"],
    color: "from-primary to-accent",
    featured: false,
  },
  {
    id: 14,
    title: "SocialDash",
    description:
      "Social media management dashboard with scheduling, analytics, and multi-platform posting.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    category: "Custom Code",
    tech: ["React", "APIs", "Charts"],
    color: "from-accent to-primary",
    featured: false,
  },
  {
    id: 15,
    title: "MealPrep",
    description:
      "Meal planning app with recipes, grocery lists, nutrition tracking, and weekly meal calendars.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Nutrition API"],
    color: "from-primary to-accent",
    featured: false,
  },
  {
    id: 16,
    title: "PetCare",
    description:
      "Pet management app with vet appointments, vaccination records, feeding schedules, and reminders.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop",
    category: "Mobile Apps",
    tech: ["Flutter", "Firebase", "Notifications"],
    color: "from-accent to-primary",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
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

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 text-xs font-medium bg-background/90 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1">
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

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // ⬅️ Force scroll to top IMMEDIATELY on mount  
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const filteredProjects = allProjects.filter((p) => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const featuredMatch = !showFeaturedOnly || p.featured;
    return categoryMatch && featuredMatch;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
              Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              Explore my complete collection of projects spanning mobile apps,
              web applications, WordPress solutions, and custom code implementations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 sm:py-8 border-b border-border sticky top-20 bg-background/80 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Featured Toggle */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 w-fit ${showFeaturedOnly
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              Featured Only
            </motion.button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-8"
          >
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 && "s"}
          </motion.p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No projects found matching your filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setShowFeaturedOnly(false);
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
