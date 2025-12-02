// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Sun, Moon } from "lucide-react";
// import { useTheme } from "./ThemeProvider";

// const navItems = [
//   { name: "Home", href: "#home" },
//   { name: "About", href: "#about" },
//   { name: "Projects", href: "#projects" },

//   { name: "Contact", href: "#contact" },
// ];

// export function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <motion.a
//             href="#home"
//             className="font-heading text-2xl font-bold gradient-text"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             HASEEB
//           </motion.a>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navItems.map((item, index) => (
//               <motion.a
//                 key={item.name}
//                 href={item.href}
//                 className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-sm tracking-wide"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -2 }}
//               >
//                 {item.name}
//               </motion.a>
//             ))}

//             {/* Theme Toggle */}
//             <motion.button
//               onClick={toggleTheme}
//               className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
//               whileHover={{ scale: 1.1, rotate: 180 }}
//               whileTap={{ scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//             >
//               <AnimatePresence mode="wait" initial={false}>
//                 {theme === "dark" ? (
//                   <motion.div
//                     key="sun"
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Sun className="w-5 h-5 text-primary" />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="moon"
//                     initial={{ rotate: 90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Moon className="w-5 h-5 text-primary" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center gap-4">
//             <motion.button
//               onClick={toggleTheme}
//               className="p-2 rounded-full bg-secondary"
//               whileTap={{ scale: 0.9 }}
//             >
//               {theme === "dark" ? (
//                 <Sun className="w-5 h-5 text-primary" />
//               ) : (
//                 <Moon className="w-5 h-5 text-primary" />
//               )}
//             </motion.button>
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
//           >
//             <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
//               {navItems.map((item, index) => (
//                 <motion.a
//                   key={item.name}
//                   href={item.href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="text-lg font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   {item.name}
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// Type for Lenis scroll events
interface LenisType {
  on: (event: "scroll", callback: (event: { scroll: number }) => void) => void;
  off: (event: "scroll", callback: (event: { scroll: number }) => void) => void;
}

// Extend Window to include lenis
declare global {
  interface Window {
    lenis?: LenisType;
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const lenis = window.lenis;

    if (lenis) {
      const handleScroll = ({ scroll }: { scroll: number }) => setIsScrolled(scroll > 50);
      lenis.on("scroll", handleScroll);
      return () => lenis.off("scroll", handleScroll);
    } else {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage with hash
      window.location.href = `/#${id}`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={handleNavClick("#home")}
            className="font-heading text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            HASEEB
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-sm tracking-wide"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary"
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className="text-lg font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
