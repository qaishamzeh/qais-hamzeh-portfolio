import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  Github,
  Globe2,
  LayoutDashboard,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Rocket,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import gymWebsiteImage from "./assets/projects/gym-website.png";
import portfolioWebsiteImage from "./assets/projects/portfolio-website.png";
import restaurantWebsiteImage from "./assets/projects/restaurant-website.png";

const developerName = "Qais Hamzeh";

const navItems = ["About", "Skills", "Services", "Projects", "Contact"];

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flutter",
  "Firebase",
  "Tailwind CSS",
  "AI Tools",
  "UI/UX Design",
  "API Integrations",
];

const services = [
  {
    title: "Website Development",
    icon: Globe2,
    text: "High-end marketing sites, landing pages, and conversion-focused web experiences.",
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    text: "Polished mobile products with clean flows, modern architecture, and fast iteration.",
  },
  {
    title: "Custom Dashboards",
    icon: LayoutDashboard,
    text: "Executive dashboards, SaaS portals, admin systems, and data-rich internal tools.",
  },
  {
    title: "AI Integrations",
    icon: Bot,
    text: "AI assistants, workflow automation, smart APIs, and productivity accelerators.",
  },
  {
    title: "Business Websites",
    icon: BriefcaseBusiness,
    text: "Premium digital presences built to make service businesses look instantly credible.",
  },
  {
    title: "E-commerce Solutions",
    icon: ShoppingBag,
    text: "Elegant storefronts, payment flows, product systems, and scalable commerce features.",
  },
];

const projects = [
  {
    title: "Restaurant Website",
    description:
      "A modern restaurant web experience built to present the brand, menu, and atmosphere with a polished client-ready feel.",
    tech: ["Website", "Responsive UI", "Brand Design"],
    variant: "commerce",
    image: restaurantWebsiteImage,
    githubUrl: "https://github.com/qaishamzeh/resturant-project",
  },
  {
    title: "Gym Website",
    description:
      "A fitness-focused website concept with strong visuals, clear service sections, and a layout designed to convert visitors into members.",
    tech: ["Website", "Landing Page", "UI Design"],
    variant: "console",
    image: gymWebsiteImage,
    githubUrl: "https://github.com/qaishamzeh/gym-website",
  },
  {
    title: "Qais Hamzeh Portfolio",
    description:
      "A cinematic personal portfolio for showcasing software development, websites, mobile apps, UI/UX, and AI integrations.",
    tech: ["React", "Vite", "Framer Motion"],
    variant: "mobile",
    image: portfolioWebsiteImage,
    liveUrl: "https://qais-hamzeh-portfolio.vercel.app",
    githubUrl: "https://github.com/qaishamzeh/qais-hamzeh-portfolio",
  },
];

const testimonials = [
  {
    quote:
      "The final product felt like a premium startup launch, not a typical freelance delivery.",
    name: "Sarah K.",
    role: "Founder, Studio North",
  },
  {
    quote:
      "Fast, strategic, and design-minded. The dashboard immediately improved how our team works.",
    name: "David R.",
    role: "Operations Lead",
  },
  {
    quote:
      "Every detail was considered, from performance to micro-interactions. Clients noticed.",
    name: "Mina A.",
    role: "Creative Director",
  },
];

const stats = [
  { label: "Projects Delivered", value: 42, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Core Services", value: 5, suffix: "" },
  { label: "Avg. Load Score", value: 95, suffix: "+" },
];

function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const doneTyping = !deleting && visible === word;
    const doneDeleting = deleting && visible === "";
    const delay = doneTyping ? 1300 : deleting ? 42 : 76;

    const id = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true);
        return;
      }
      if (doneDeleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setVisible((current) =>
        deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(id);
  }, [deleting, visible, wordIndex, words]);

  return visible;
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(110, Math.floor((width * height) / 14500));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: index % 8 === 0 ? 1.35 : 0.75,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(255, 255, 255, 0.46)";
      context.strokeStyle = "rgba(94, 234, 212, 0.12)";
      context.lineWidth = 1;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
          if (distance < 118) {
            context.globalAlpha = 1 - distance / 118;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.stroke();
            context.globalAlpha = 1;
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

function MouseLight() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 24 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(94, 234, 212, 0.11), rgba(245, 199, 107, 0.045) 34%, transparent 68%)`;

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="mouse-light"
      style={{
        background,
      }}
      aria-hidden="true"
    />
  );
}

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const duration = 1350;

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <a className="brand" href="#top" aria-label={`${developerName} home`}>
        <span>QH</span>
        {developerName}
      </a>

      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        Hire Me
        <ArrowUpRight size={16} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </motion.header>
  );
}

function Hero() {
  const typed = useTypewriter(["AI Integrations", "Mobile Apps", "Web Platforms", "Clean Interfaces"]);

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="availability-pill">
            <span />
            Available for premium client work
          </div>
          <h1>I Build Modern Digital Experiences.</h1>
          <p className="hero-subtitle">Software Developer • Web Developer • App Developer</p>
          <p className="hero-text">
            I design and engineer polished software, responsive websites, mobile applications,
            and AI-powered systems for ambitious brands that want to look sharp and move fast.
          </p>
          <div className="typing-line" aria-label={`Specialized in ${typed}`}>
            <Sparkles size={18} />
            <span>{typed}</span>
            <i />
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View Projects
              <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href="#contact">
              Hire Me
              <Send size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 34 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          aria-label="Animated futuristic developer interface preview"
        >
          <div className="visual-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="code-card">
            <div className="code-line wide" />
            <div className="code-line medium accent" />
            <div className="code-line short" />
            <div className="code-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="metric-panel">
            <strong>98%</strong>
            <span>Client signal</span>
          </div>
          <div className="orbit-ring" />
          <div className="terminal-panel">
            <span>deploy --premium</span>
            <strong>Live</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section-shell about" id="about">
      <SectionHeader
        eyebrow="About Me"
        title="Elegant software with serious business intent."
        text="A concise, high-trust presence for clients who care about detail, speed, and measurable quality."
      />
      <div className="about-grid">
        <motion.div
          className="glass-panel about-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p>
            I am {developerName}, a software developer focused on building clean, modern digital
            products that feel premium from the first interaction. My work blends strong
            engineering, refined design judgment, and practical business thinking.
          </p>
          <p>
            I care deeply about clean code, modern design, performance, accessibility, and user
            experience. Whether it is a brand website, mobile app, dashboard, or AI automation, the
            goal is always the same: ship something fast, beautiful, and durable.
          </p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              className="stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <strong>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-shell" id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="A modern stack for polished products."
        text="From interface systems to backend APIs and intelligent automations, each layer is built with care."
      />
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            className="skill-card"
            key={skill}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Code2 size={20} />
            <span>{skill}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-shell services" id="services">
      <SectionHeader
        eyebrow="Services"
        title="Premium builds for modern businesses."
        text="Strategy, design, development, and integrations shaped into sharp, client-ready digital systems."
      />
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              className="service-card glass-panel"
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <Icon size={24} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectVisual({ image, title, variant }) {
  const bars = useMemo(() => Array.from({ length: 8 }, (_, index) => index), []);

  if (image) {
    return (
      <div className={`project-visual project-image ${variant}`}>
        <img src={image} alt={`${title} project preview`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`project-visual ${variant}`} role="img" aria-label={`${variant} project image`}>
      <div className="project-browser">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-layout">
        <div className="visual-sidebar">
          <span />
          <span />
          <span />
        </div>
        <div className="visual-main">
          <div className="visual-chart">
            {bars.map((bar) => (
              <i key={bar} style={{ "--height": `${34 + ((bar * 17) % 54)}%` }} />
            ))}
          </div>
          <div className="visual-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="section-shell" id="projects">
      <SectionHeader
        eyebrow="Portfolio"
        title="Selected work with client-ready polish."
        text="Concept showcases for the kind of premium software, web, mobile, and AI systems I build."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card glass-panel"
            key={project.title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <ProjectVisual image={project.image} title={project.title} variant={project.variant} />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-list">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href={project.liveUrl || "#contact"}>
                  {project.liveUrl ? "Live Demo" : "Request Demo"}
                  <ArrowUpRight size={16} />
                </a>
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                  <Github size={16} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-shell testimonials" id="testimonials">
      <SectionHeader
        eyebrow="Testimonials"
        title="Quiet confidence from happy clients."
        text="Minimal, direct feedback from teams that wanted a premium digital result."
      />
      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <motion.figure
            className="testimonial-card"
            key={testimonial.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <blockquote>"{testimonial.quote}"</blockquote>
            <figcaption>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
  };

  return (
    <section className="section-shell contact" id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s build something clients remember."
        text="Send the idea, the problem, or the vision. I will help turn it into a premium digital product."
      />
      <div className="contact-grid">
        <motion.div
          className="contact-panel glass-panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <a href="mailto:hello@yourname.dev">
            <Mail size={20} />
            hello@yourname.dev
          </a>
          <a href="https://wa.me/905398563224" target="_blank" rel="noreferrer">
            <MessageCircle size={20} />
            WhatsApp: 0539 856 32 24
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <Github size={20} />
            GitHub
          </a>
          <div className="contact-note">
            <Check size={18} />
            Replies within 24 hours for serious project inquiries.
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <input aria-label="Name" name="name" placeholder="Name" required />
          <input aria-label="Email" name="email" placeholder="Email" type="email" required />
          <select aria-label="Project type" name="service" defaultValue="">
            <option value="" disabled>
              Project type
            </option>
            <option>Website Development</option>
            <option>Mobile App Development</option>
            <option>AI Automation</option>
            <option>UI/UX Design</option>
          </select>
          <textarea aria-label="Project details" name="message" placeholder="Tell me about the project" />
          <button className="button primary" type="submit">
            Send Message
            <Send size={17} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#top" aria-label={`${developerName} home`}>
        <span>QH</span>
        {developerName}
      </a>
      <p>Premium software, websites, apps, UI/UX, and AI integrations.</p>
      <div className="footer-socials">
        <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="mailto:hello@yourname.dev" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ParticleField />
      <MouseLight />
      <div className="page-shell">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
