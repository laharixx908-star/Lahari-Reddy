import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, X, ExternalLink, ArrowRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

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

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

interface ModalProps {
  title: string;
  content: string | string[];
  onClose: () => void;
}

function Modal({ title, content, onClose }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.4rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>
            {title}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-fg)", padding: "0.25rem" }}>
            <X size={18} />
          </button>
        </div>
        <hr className="divider" style={{ marginBottom: "1.5rem" }} />
        {Array.isArray(content) ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {content.map((para, i) => (
              <p key={i} style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: "1.75", margin: 0 }}>{para}</p>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: "1.75", margin: 0 }}>{content}</p>
        )}
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(253, 248, 246, 0.92)" : "rgba(253, 248, 246, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "0.5px solid var(--border-color)" : "0.5px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <span style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.1rem", color: "var(--foreground)", letterSpacing: "0.05em" }}>
          Sai Lahari
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
          {navItems.map((item) => (
            <button key={item.label} className="nav-link" onClick={() => { setMenuOpen(false); scrollTo(item.href); }}>
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-fg)", display: "none", padding: "0.5rem" }}
          className="show-mobile"
        >
          <div style={{ width: "18px", height: "1px", background: "currentColor", marginBottom: "5px" }}></div>
          <div style={{ width: "18px", height: "1px", background: "currentColor", marginBottom: "5px" }}></div>
          <div style={{ width: "18px", height: "1px", background: "currentColor" }}></div>
        </button>
      </div>

      {menuOpen && (
        <div style={{ borderTop: "0.5px solid var(--border-color)", background: "var(--surface)", padding: "0.75rem 1.5rem" }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-link"
              style={{ display: "block", width: "100%", textAlign: "left", marginBottom: "0.25rem" }}
              onClick={() => { setMenuOpen(false); scrollTo(item.href); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: "900px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
        <div style={{ width: "96px", height: "96px", borderRadius: "50%", background: "#ede0da", border: "0.5px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.5rem", color: "var(--muted-fg)", letterSpacing: "0.05em" }}>SL</span>
        </div>

        <p className="label-upper">Portfolio</p>

        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", lineHeight: 1.15, color: "var(--foreground)", margin: 0, fontFamily: "var(--app-font-serif)", fontWeight: 400 }}>
          Sai Lahari Reddy
        </h1>

        <p style={{ fontSize: "1.1rem", color: "var(--muted-fg)", maxWidth: "500px", margin: 0, fontWeight: 400, lineHeight: 1.65 }}>
          I build, experiment, and turn ideas into reality.
        </p>

        <p style={{ fontSize: "0.88rem", color: "var(--muted-fg)", maxWidth: "420px", margin: 0, opacity: 0.8 }}>
          ECE student and GATE aspirant exploring the intersection of hardware and software.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          <button className="btn-primary" onClick={() => scrollTo("#projects")}>View Projects</button>
          <button className="btn-ghost" onClick={() => scrollTo("#contact")}>Contact Me</button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>About</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>About Me</h2>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted-fg)", fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            ECE student who builds real-world tech projects by combining hardware and software. Always learning, experimenting, and improving through hands-on work.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", marginTop: "1.25rem", color: "var(--dusty-rose)", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
            <MapPin size={13} />
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeModal, setActiveModal] = useState<null | { title: string; content: string | string[] }>(null);

  const mindMateDesc = [
    "A platform designed to support students who experience emotional imbalance or frequent mood swings. The platform provides an AI companion that listens and offers supportive guidance, along with tasks and activities that help users build healthier habits and improve their emotional well-being. To keep users engaged, the platform includes a points and rewards system, where users can earn points by completing activities and playing games, and later redeem them to purchase coupons.",
  ];

  const lineFollowerDesc = [
    "A line follower robot is an autonomous mobile system designed to detect and follow a predefined path, usually a black line on a white surface (or vice versa). This project uses DC motors for movement and basic sensors to guide navigation.",
    "The robot operates using infrared (IR) sensors that continuously detect the line's position. Based on sensor input, a microcontroller processes the data and controls the DC motors accordingly—adjusting their speed and direction to keep the robot aligned with the path. When the robot deviates, the control system corrects its movement by varying motor rotation, enabling smooth and accurate tracking.",
    "This project demonstrates fundamental concepts of robotics such as sensor integration, motor control, and real-time decision-making. It is widely used in automation applications like industrial transport systems and smart delivery robots.",
  ];

  const projects = [
    {
      title: "Mind-Mate",
      tag: null,
      shortDesc: "A platform designed to support students who experience emotional imbalance or frequent mood swings — powered by an AI companion and a rewards system.",
      fullDesc: mindMateDesc,
      action: { label: "Visit Project", href: "https://mind-mate-orpin.vercel.app/", external: true },
    },
    {
      title: "Velora",
      tag: "Upcoming",
      shortDesc: "A wearable safety concept designed as a stylish accessory that enables instant emergency alerts.",
      descPoints: [
        "It explore's around Women Safety, and how technology can help create safer environments and faster support systems.",
        "A wearable safety concept designed as a stylish accessory that enables instant emergency alerts.",
      ],
      fullDesc: null,
      action: { label: "Coming Soon", href: null },
    },
    {
      title: "Line Follower Robot",
      tag: "Hardware",
      shortDesc: "An autonomous mobile system that detects and follows a predefined path using DC motors and IR sensors.",
      fullDesc: lineFollowerDesc,
      action: null,
    },
  ];

  return (
    <section id="projects" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Work</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Projects</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {projects.map((project) => (
            <div key={project.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>
                  {project.title}
                </h3>
                {project.tag && <span className="tag">{project.tag}</span>}
              </div>

              <hr className="divider" />

              {project.descPoints ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1 }}>
                  {project.descPoints.map((pt, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--primary)", marginTop: "0.3rem", flexShrink: 0, fontSize: "0.7rem" }}>—</span>
                      <p style={{ color: "var(--muted-fg)", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>{pt}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "var(--muted-fg)", fontSize: "0.87rem", lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {project.shortDesc}
                </p>
              )}

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.5rem" }}>
                {project.fullDesc && (
                  <button
                    className="btn-text"
                    onClick={() => setActiveModal({ title: project.title, content: project.fullDesc! })}
                  >
                    View more details
                  </button>
                )}
                {project.action && (
                  project.action.href ? (
                    <a
                      href={project.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ textDecoration: "none", fontSize: "0.75rem", padding: "0.5rem 1.25rem" }}
                    >
                      {project.action.label}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.78rem", color: "var(--muted-fg)", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7 }}>
                      {project.action.label}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <Modal
          title={activeModal.title}
          content={activeModal.content}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}

function Skills() {
  const categories = [
    {
      label: "Core",
      skills: ["C", "Python"],
      note: "Currently exploring: IoT, VLSI",
    },
    {
      label: "Tools",
      skills: ["GitHub", "Vercel", "Canva", "AI Studio", "Antigravity"],
      note: null,
    },
    {
      label: "Hardware",
      skills: ["Arduino", "Sensors", "Basic Electronics"],
      note: null,
    },
  ];

  return (
    <section id="skills" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Expertise</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Skills</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {categories.map((cat) => (
            <div key={cat.label} className="card" style={{ background: "var(--background)" }}>
              <p className="label-upper" style={{ marginBottom: "1.25rem", color: "var(--primary)" }}>{cat.label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: cat.note ? "1rem" : 0 }}>
                {cat.skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
              {cat.note && (
                <p style={{ fontSize: "0.78rem", color: "var(--muted-fg)", marginTop: "0.75rem", fontStyle: "italic", opacity: 0.8, margin: 0 }}>
                  {cat.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const paragraphs = [
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
  ];

  return (
    <section id="journey" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Personal</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "0.75rem" }}>My Journey</h2>
        <p style={{ textAlign: "center", fontStyle: "italic", color: "var(--muted-fg)", fontSize: "0.9rem", marginBottom: "3rem", opacity: 0.75 }}>
          "A story of failure."
        </p>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const certUrl = `${BASE}/hackforge-certificate.png`;

  const entries = [
    {
      role: "EvolveX Intern",
      description: "Currently working on building and improving web applications while gaining practical experience.",
      extra: null,
    },
    {
      role: "Hackforge Hackathon Participant",
      description: "Participated in a 48-hour hackathon, working in a team to build a project under time constraints.",
      extra: { label: "View Certificate", href: certUrl },
    },
  ];

  return (
    <section id="experience" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Background</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {entries.map((entry) => (
            <div key={entry.role} className="card" style={{ background: "var(--background)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0, marginTop: "0.55rem" }}></div>
                <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.05rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>
                  {entry.role}
                </h3>
              </div>
              <p style={{ color: "var(--muted-fg)", fontSize: "0.87rem", lineHeight: 1.7, margin: 0, paddingLeft: "1.25rem" }}>
                {entry.description}
              </p>
              {entry.extra && (
                <div style={{ paddingLeft: "1.25rem", marginTop: "0.875rem" }}>
                  <a
                    href={entry.extra.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-text"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                  >
                    {entry.extra.label}
                    <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureGoals() {
  const goals = [
    "My career goal is to achieve a strong score in the Graduate Aptitude Test in Engineering and secure an opportunity to contribute to national defense by joining Defence Research and Development Organisation.",
    "I also aspire to become an entrepreneur by transforming my project, Velora, into a real-time, practical implementation.",
    "Beyond technology, I hope to establish a non-profit organization dedicated to supporting underprivileged children.",
  ];

  return (
    <section id="goals" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Looking Ahead</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Future Goals</h2>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {goals.map((goal, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <ArrowRight size={15} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "0.3rem" }} />
              <p style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hobbies() {
  return (
    <section id="hobbies" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Interests</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Beyond Tech</h2>
        <div className="card" style={{ background: "var(--background)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            "Beyond my technical pursuits, I am a basketball player. I also play badminton and enjoy outdoor activities.",
            "I read romantic novels and spend time drawing and doing craft work while exploring new skills.",
          ].map((para, i) => (
            <p key={i} style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    {
      icon: <Github size={17} />,
      label: "GitHub",
      href: "https://github.com/laharixx908-star",
      display: "laharixx908-star",
    },
    {
      icon: <Linkedin size={17} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sai-lahari-reddy-b-799818396",
      display: "sai-lahari-reddy-b",
    },
    {
      icon: <Mail size={17} />,
      label: "Email",
      href: "mailto:laharicareer19@gmail.com",
      display: "laharicareer19@gmail.com",
    },
  ];

  return (
    <section id="contact" style={{ padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Get In Touch</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Contact</h2>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", marginBottom: "2rem", color: "var(--dusty-rose)", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
            <MapPin size={13} />
            <span>Hyderabad, India</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "8px",
                  border: "0.5px solid var(--border-color)",
                  background: "var(--background)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--dusty-rose)";
                  (e.currentTarget as HTMLElement).style.background = "#fdf0ec";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLElement).style.background = "var(--background)";
                }}
              >
                <span style={{ color: "var(--primary)" }}>{link.icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="label-upper" style={{ fontSize: "0.68rem", marginBottom: "0.2rem" }}>{link.label}</div>
                  <div style={{ fontSize: "0.88rem", color: "var(--foreground)" }}>{link.display}</div>
                </div>
                <ExternalLink size={13} style={{ color: "var(--border-color)" }} />
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
    <footer style={{ padding: "2.5rem 1.5rem", borderTop: "0.5px solid var(--border-color)", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "var(--muted-fg)", fontSize: "0.78rem", letterSpacing: "0.08em", opacity: 0.7, margin: 0 }}>
          © 2025 Sai Lahari Reddy
        </p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div style={{ minHeight: "100vh" }}>
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
