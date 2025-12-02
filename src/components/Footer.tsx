import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="py-10 sm:py-16 border-t border-border relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              className="inline-block font-heading text-2xl font-bold gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              HASEEB
            </motion.a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building digital experiences that inspire. Let's create something
              extraordinary together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Haseeb. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Crafted by Haseeb
          </p>
        </div>
      </div>
    </footer>
  );
}
