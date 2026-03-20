import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, Code, Wrench, Cpu, ChevronDown, ExternalLink } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#experience" },
  { label: "Future Goals", href: "#goals" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-navbar ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <span className="text-lg font-bold text-white tracking-wide">SLR</span>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-1.5 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 py-20">
        <div className="flex-1 text-center md:text-left">
          <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4">Welcome</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight glow-purple">
            Sai Lahari Reddy
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4 font-medium">
            I build, experiment, and turn ideas into reality.
          </p>
          <p className="text-white/50 text-base mb-8 max-w-xl">
            ECE student and GATE aspirant exploring the intersection of hardware and software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="glass-btn-primary px-6 py-3 text-white font-semibold text-sm"
            >
              View Projects
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="glass-btn px-6 py-3 text-white font-semibold text-sm"
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full glass-card flex items-center justify-center border-2 border-purple-500/30">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
              <span className="text-6xl text-white/30 font-bold">SL</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold section-title mb-6">About Me</h2>
        <div className="glass-card p-8 md:p-10">
          <p className="text-white/80 text-lg leading-relaxed">
            ECE student who builds real-world tech projects by combining hardware and software. Always learning, experimenting, and improving through hands-on work.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
            <MapPin size={14} />
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Mind-Mate",
      badge: "In Progress",
      badgeColor: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      description: "A platform designed to help students manage emotional balance through tasks, rewards, and an AI companion.",
    },
    {
      title: "Velora",
      badge: "Upcoming",
      badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      description: "A wearable safety concept designed as a stylish accessory that enables instant emergency alerts.",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="glass-card p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed flex-1">{project.description}</p>
              <button
                className="glass-btn px-4 py-2 text-sm text-white/60 cursor-default w-fit"
                disabled
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const categories = [
    {
      icon: <Code size={20} className="text-purple-400" />,
      label: "Core",
      skills: ["C", "Python"],
    },
    {
      icon: <Wrench size={20} className="text-blue-400" />,
      label: "Tools",
      skills: ["GitHub", "Vercel", "Canva", "AI Studio", "Antigravity"],
    },
    {
      icon: <Cpu size={20} className="text-green-400" />,
      label: "Hardware",
      skills: ["Arduino", "Sensors", "Basic Electronics"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Skills</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-5">
                {cat.icon}
                <h3 className="font-semibold text-white text-base">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-3">My Journey</h2>
        <p className="text-center text-white/40 italic mb-10">"A story of failure."</p>
        <div className="glass-card p-8 md:p-10 space-y-5">
          {[
            "I come from a single-parent family and grew up as an only child. For a long time, I struggled with consistency and direction. I used to give up easily and didn't take things seriously, which affected my academics and confidence.",
            "I had dreams like joining the Indian Navy through NDA, but I couldn't clear the first stage. I also wrote several Olympiad exams in school and couldn't clear them, which made me question myself a lot.",
            "A lot was invested in my education—my intermediate alone cost around 8 lakhs—but I still couldn't even score 90%. That made me feel like I wasn't doing justice to the opportunities I was given.",
            "My family had expectations from me, and I often felt like I wasn't meeting them. But things started to change when I qualified EAMCET with very limited preparation. That moment made my family slowly start believing in me, and it made me realize that I had potential—I just wasn't using it properly.",
            "I was also involved in sports like basketball and kho-kho. Even though I didn't win, those experiences taught me how to keep going and not quit easily.",
            "Getting selected as an intern at EvolveX meant a lot—after all the failures, it felt like a step forward.",
            "There was one moment that stayed with me. My mother once said that instead of spending so much on me, the same could have helped a hardworking child who needed it more. That line didn't leave me.",
            "I didn't take it as discouragement—I took it as responsibility. Someday, I want to build something meaningful and give back by starting a non-profit for children who don't have the opportunities I had.",
            "Over time, I started reflecting on myself and decided to change. I'm now working on becoming more focused, disciplined, and consistent.",
            "Today, my goals are clear: improve my skills, prepare for GATE, work towards opportunities like DRDO, build Velora into something real, and give back through that non-profit. Most importantly, I want to make my mother proud.",
          ].map((para, i) => (
            <p key={i} className="text-white/70 text-sm md:text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const entries = [
    {
      role: "EvolveX Intern",
      description: "Currently working on building and improving web applications while gaining practical experience.",
    },
    {
      role: "Hackforge Hackathon Participant",
      description: "Participated in a 48-hour hackathon, working in a team to build a project under time constraints.",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Experience</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.role} className="glass-card p-6 flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">{entry.role}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureGoals() {
  return (
    <section id="goals" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Future Goals</h2>
        <div className="glass-card p-8 md:p-10 space-y-5">
          {[
            "I aim to contribute to impactful technological advancements, with a long-term goal of working with DRDO.",
            "I also aspire to transform Velora into a real-world startup focused on safety solutions.",
            "Beyond technology, I hope to establish a non-profit organization dedicated to supporting underprivileged children.",
          ].map((goal, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hobbies() {
  return (
    <section id="hobbies" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Beyond Tech</h2>
        <div className="glass-card p-8 md:p-10 space-y-4">
          {[
            "Beyond my technical pursuits, I am a basketball player. I also play badminton and enjoy outdoor activities.",
            "I read romantic novels and spend time drawing and doing craft work while exploring new skills.",
          ].map((para, i) => (
            <p key={i} className="text-white/70 text-sm md:text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/laharixx908-star",
      display: "laharixx908-star",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sai-lahari-reddy-b-799818396",
      display: "sai-lahari-reddy-b",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:laharicareer19@gmail.com",
      display: "laharicareer19@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold section-title text-center mb-12">Contact</h2>
        <div className="glass-card p-8 md:p-10">
          <div className="flex items-center gap-2 justify-center mb-8 text-white/40 text-sm">
            <MapPin size={14} />
            <span>Hyderabad, India</span>
          </div>
          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  {link.icon}
                </span>
                <div className="flex-1">
                  <div className="text-xs text-white/40 mb-0.5">{link.label}</div>
                  <div className="text-white/80 text-sm group-hover:text-white transition-colors">
                    {link.display}
                  </div>
                </div>
                <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-white/30 text-sm">© 2025 Sai Lahari Reddy. Built with purpose.</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <Experience />
      <FutureGoals />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
}
