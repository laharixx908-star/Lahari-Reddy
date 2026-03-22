import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, X, ArrowRight, Moon, Sun, Dribbble, Video, BookOpen, Pencil, Scissors, Globe, Film, Music as MusicIcon } from "lucide-react";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Future Goals", href: "#goals" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
function useScrollReveal(active: boolean = true) {
  useEffect(() => {
    if (!active) return;

    const reveals = document.querySelectorAll(".reveal");
    const lefts = document.querySelectorAll(".reveal-left");
    const rights = document.querySelectorAll(".reveal-right");

    const setInitial = (el: Element, transform: string) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = transform;
      (el as HTMLElement).style.transition = "opacity 0.8s ease, transform 0.8s ease";
    };

    reveals.forEach((el) => setInitial(el, "translateY(40px)"));
    lefts.forEach((el) => setInitial(el, "translateX(-60px)"));
    rights.forEach((el) => setInitial(el, "translateX(60px)"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translate(0, 0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      reveals.forEach((el) => observer.observe(el));
      lefts.forEach((el) => observer.observe(el));
      rights.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [active]);
}
function SplashScreen({ onDismiss }: { onDismiss: () => void }) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(onDismiss, 500);
  };

  return (
    <div
      onClick={handleDismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#fdf8f6",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "1.5rem",
        cursor: "pointer",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: dismissing ? 0 : 1,
        transform: dismissing ? "scale(0.95)" : "scale(1)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "120px", height: "120px",
          animation: "splashBounce 0.8s ease forwards, splashFlip 1s ease 1.2s",
        }}
      >
        <g transform="translate(50,50) rotate(-15)">
          <circle cx="0" cy="0" r="48" fill="#5c3022"/>
          <line x1="-15" y1="-14" x2="-15" y2="-6" stroke="#fdf8f6" strokeWidth="4" strokeLinecap="round"/>
          <line x1="15" y1="-14" x2="15" y2="-6" stroke="#fdf8f6" strokeWidth="4" strokeLinecap="round"/>
          <path d="M -20 10 Q 0 26 20 10" stroke="#fdf8f6" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
      </svg>
      <p style={{
        fontFamily: "var(--app-font-serif)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        color: "#3a1f14", margin: 0, textAlign: "center",
        animation: "splashFadeUp 0.6s ease 1.5s both",
      }}>
        hoping you're doing fine!
      </p>
      <p style={{
        fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
        color: "#9c7b6e", margin: 0, textAlign: "center",
        animation: "splashFadeUp 0.6s ease 2s both, splashPulse 2s ease 2.6s infinite",
      }}>
        tap anywhere
      </p>
      <style>{`
        @keyframes splashBounce {
          0% { transform: scale(0) translateY(-200px); opacity: 0; }
          60% { transform: scale(1.2) translateY(10px); opacity: 1; }
          80% { transform: scale(0.9) translateY(-5px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes splashFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
function scrollTo(href: string) { 
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

interface ModalProps {
  title: string;
  content?: string | string[];
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  onClose: () => void;
}

function Modal({ title, content, imageUrl, images, videoUrl, onClose }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>
            {title}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-fg)", padding: "0.25rem", lineHeight: 1 }}>
            <X size={17} />
          </button>
        </div>
        <hr className="divider" style={{ marginBottom: "1.5rem" }} />
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            style={{ width: "100%", borderRadius: "6px", border: "0.5px solid var(--border-color)", display: "block", marginBottom: images || imageUrl ? "1rem" : 0, background: "#000" }}
          />
        )}
        {imageUrl && (
          <img src={imageUrl} alt={title} style={{ width: "100%", borderRadius: "6px", border: "0.5px solid var(--border-color)", display: "block" }} />
        )}
        {images && images.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${title} ${i + 1}`} style={{ width: "100%", borderRadius: "6px", border: "0.5px solid var(--border-color)", display: "block" }} />
            ))}
          </div>
        )}
        {content && (
          Array.isArray(content) ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginTop: imageUrl || images ? "1.5rem" : 0 }}>
              {content.map((para, i) => (
                <p key={i} style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: "1.75", margin: 0 }}>{para}</p>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: "1.75", margin: 0, marginTop: imageUrl || images ? "1.5rem" : 0 }}>{content}</p>
          )
        )}
      </div>
    </div>
  );
}

function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = dark
    ? scrolled ? "rgba(26,13,10,0.96)" : "rgba(26,13,10,0.80)"
    : scrolled ? "rgba(253,248,246,0.96)" : "rgba(253,248,246,0.80)";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg,
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      borderBottom: scrolled ? "0.5px solid var(--border-color)" : "0.5px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem",
        display: "flex", alignItems: "center", height: "52px", gap: "0.25rem",
        flexWrap: "nowrap", overflow: "hidden",
      }}>
        <button
          onClick={() => scrollTo("#home")}
          style={{
            fontFamily: "var(--app-font-serif)", fontSize: "1.05rem",
            color: "#5c3022",
            letterSpacing: "0.06em", background: "none", border: "none",
            cursor: "pointer", padding: 0, marginRight: "0.5rem", flexShrink: 0,
            fontWeight: 700,
          }}
        >
          LAHARI
        </button>

       <div style={{ display: "flex", alignItems: "center", flex: 1, flexWrap: "nowrap", overflowX: "auto", justifyContent: "flex-end", scrollbarWidth: "none" }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-link"
              onClick={() => scrollTo(item.href)}
              style={{ whiteSpace: "nowrap", fontSize: "0.68rem", padding: "0.25rem 0.5rem" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleDark}
          style={{
            background: "none", border: "0.5px solid var(--border-color)", cursor: "pointer",
            color: "var(--muted-fg)", padding: "0.375rem", borderRadius: "50%",
           display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap-reverse",
            transition: "all 0.2s ease", width: "30px", height: "30px", flexShrink: 0,
          }}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </nav>
  );
}
function Hero({ visible = false }: { visible?: boolean }) {
  const [emailModal, setEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "58px", position: "relative", overflow: "hidden" }}>
      
      {/* Watermark */}
      <div style={{
        position: "absolute", bottom: "0", left: "0", right: "0",
        fontFamily: "var(--app-font-serif)", fontSize: "clamp(6rem, 18vw, 14rem)",
        fontWeight: 700, color: "var(--foreground)", opacity: 0.04,
        letterSpacing: "0.05em", textAlign: "center", lineHeight: 1,
        pointerEvents: "none", userSelect: "none",
      }}>
        LAHARI
      </div>

      <div style={{ maxWidth: "1180px", margin: "0 auto", width: "100%", padding: "3rem 2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap-reverse", position: "relative", zIndex: 1 }}>

            <div style={{ flex: 1, minWidth: 0, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-60px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>  
            <p className="label-upper" style={{ color: "var(--primary)", marginBottom: "1.25rem", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--primary)" }}></span>
            Portfolio
          </p>

          <h1 style={{
            fontFamily: "var(--app-font-serif)", fontWeight: 400,
            fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
            lineHeight: 1.05, color: "var(--foreground)", margin: "0 0 1.25rem",
          }}>
            Sai Lahari Reddy
          </h1>

          <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "1rem", marginBottom: "1rem" }}>
            <p style={{
              fontFamily: "var(--app-font-serif)", fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--primary)", lineHeight: 1.5, margin: 0, maxWidth: "480px",
            }}>
              I build, experiment, and turn ideas into reality.
            </p>
          </div>

          <p style={{ fontSize: "0.92rem", color: "var(--muted-fg)", lineHeight: 1.75, margin: "0 0 2rem", maxWidth: "440px" }}>
            ECE student and GATE aspirant exploring the intersection of hardware and software.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <a href="https://github.com/laharixx908-star" target="_blank" rel="noopener noreferrer" className="icon-link" title="GitHub">
              <Github size={17} />
            </a>
            <a href="https://www.linkedin.com/in/sai-lahari-reddy-b-799818396" target="_blank" rel="noopener noreferrer" className="icon-link" title="LinkedIn">
              <Linkedin size={17} />
            </a>
            <button className="icon-link" title="Email" onClick={() => setEmailModal(true)}>
              <Mail size={17} />
            </button>
          </div>
        </div>

        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>

          <div style={{
            width: "clamp(220px, 28vw, 340px)",
            height: "clamp(220px, 28vw, 340px)",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid var(--primary)",
            background: "#ede0da",
            position: "relative",
            zIndex: 1,
          }}>
            <img
              src={`${BASE}/profile.jpeg`}
              alt="Sai Lahari Reddy"
              style={{
                width: "100%",
                height: "133%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
            />
          </div>
        </div>

      </div>

      {emailModal && (
        <div className="modal-overlay" onClick={() => setEmailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "380px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>Send an Email</h3>
              <button onClick={() => setEmailModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-fg)", padding: "0.25rem" }}>
                <X size={17} />
              </button>
            </div>
            <hr className="divider" style={{ marginBottom: "1.5rem" }} />
            <p style={{ color: "var(--muted-fg)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>You can reach me at</p>
            <div style={{ background: "var(--surface)", border: "0.5px solid var(--border-color)", borderRadius: "8px", padding: "0.875rem 1rem", marginBottom: "1.5rem", fontFamily: "monospace", fontSize: "0.9rem", color: "var(--foreground)" }}>
              laharicareer.19@gmail.com
            </div>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button className="btn-text" onClick={() => {
                navigator.clipboard.writeText("laharicareer.19@gmail.com");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}>
                {copied ? "Copied!" : "Copy Email"}
              </button>
              <a href="https://mail.google.com/mail/?view=cm&to=laharicareer.19@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.45rem 1.1rem" }}>
                Open Gmail
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
function About() {
  return (
    <section id="about" style={{ padding: "3rem 1.5rem 5rem" }}>
     <div className="reveal" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Introduction</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>About Me</h2>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted-fg)", fontSize: "0.95rem", lineHeight: 1.85, margin: 0 }}>
            My interests span embedded systems, digital design, and software development. Currently preparing for GATE while building projects that push me to think critically — both as an engineer and a problem-solver. I'm always looking to grow through work that has real technical depth.
          </p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeModal, setActiveModal] = useState<null | { title: string; content?: string | string[]; images?: string[]; videoUrl?: string }>(null);

  const mindMateDesc = [
    "A platform designed to support students who experience emotional imbalance or frequent mood swings. The platform provides an AI companion that listens and offers supportive guidance, along with tasks and activities that help users build healthier habits and improve their emotional well-being. To keep users engaged, the platform includes a points and rewards system, where users can earn points by completing activities and playing games, and later redeem them to purchase coupons.",
  ];

  const lineFollowerDesc = [
    "A line follower robot is an autonomous mobile system designed to detect and follow a predefined path, usually a black line on a white surface (or vice versa). This project uses DC motors for movement and basic sensors to guide navigation.",
    "The robot operates using infrared (IR) sensors that continuously detect the line's position. Based on sensor input, a microcontroller processes the data and controls the DC motors accordingly—adjusting their speed and direction to keep the robot aligned with the path. When the robot deviates, the control system corrects its movement by varying motor rotation, enabling smooth and accurate tracking.",
    "This project demonstrates fundamental concepts of robotics such as sensor integration, motor control, and real-time decision-making. It is widely used in automation applications like industrial transport systems and smart delivery robots.",
  ];

  const lfImages = [`${BASE}/lf1.jpeg`, `${BASE}/lf2.jpeg`, `${BASE}/lf3.jpeg`];

  const projects = [
    {
      title: "Line Follower Robot", tag: "Hardware",
      shortDesc: "An autonomous mobile system that detects and follows a predefined path using DC motors and IR sensors.",
      actions: [
        { label: "View more details", type: "text", onClick: () => setActiveModal({ title: "Line Follower Robot", content: lineFollowerDesc }) },
        { label: "View Project", type: "primary", onClick: () => setActiveModal({ title: "Line Follower Robot — Build", images: lfImages, videoUrl: `${BASE}/lf-video.mp4` }) },
      ],
      descPoints: undefined,
    },
    {
      title: "Mind-Mate", tag: null,
      shortDesc: "A platform designed to support students who experience emotional imbalance or frequent mood swings — powered by an AI companion and a rewards system.",
      actions: [
        { label: "View more details", type: "text", onClick: () => setActiveModal({ title: "Mind-Mate", content: mindMateDesc }) },
        { label: "Visit Project", type: "primary-link", href: "https://mind-mate-orpin.vercel.app/" },
      ],
      descPoints: undefined,
    },
    {
      title: "Velora", tag: "Upcoming",
      shortDesc: null,
      actions: [{ label: "Coming Soon", type: "muted", onClick: undefined }],
      descPoints: [
        "It explore's around Women Safety, and how technology can help create safer environments and faster support systems.",
        "A wearable safety concept designed as a stylish accessory that enables instant emergency alerts.",
      ],
    },
  ];

  return (
    <section id="projects" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div className="reveal" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Work</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {projects.map((project) => (
            <div key={project.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "var(--background)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>{project.title}</h3>
                {project.tag && <span className="tag">{project.tag}</span>}
              </div>
              <hr className="divider" />
              {project.descPoints ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                  {project.descPoints.map((pt, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--primary)", marginTop: "0.35rem", flexShrink: 0, fontSize: "0.65rem" }}>—</span>
                      <p style={{ color: "var(--muted-fg)", fontSize: "0.86rem", lineHeight: 1.7, margin: 0 }}>{pt}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "var(--muted-fg)", fontSize: "0.86rem", lineHeight: 1.7, margin: 0, flex: 1 }}>{project.shortDesc}</p>
              )}
              <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.375rem" }}>
                {project.actions.map((action, i) => {
                  if (action.type === "text") return <button key={i} className="btn-text" onClick={action.onClick}>{action.label}</button>;
                  if (action.type === "primary") return <button key={i} className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.45rem 1.1rem" }} onClick={action.onClick}>{action.label}</button>;
                  if (action.type === "primary-link") return <a key={i} href={(action as { href?: string }).href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.45rem 1.1rem" }}>{action.label}</a>;
                  if (action.type === "muted") return <span key={i} style={{ fontSize: "0.75rem", color: "var(--muted-fg)", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.65 }}>{action.label}</span>;
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeModal && (
        <Modal
          title={activeModal.title}
          content={activeModal.content}
          images={activeModal.images}
          videoUrl={activeModal.videoUrl}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}

function Skills() {
  const categories = [
    { label: "Core", skills: ["C", "Python"], exploring: ["IoT", "VLSI"] },
    { label: "Tools", skills: ["GitHub", "Vercel", "Canva", "AI Studio", "Antigravity"], exploring: [] },
    { label: "Hardware", skills: ["Arduino", "Sensors", "Basic Electronics"], exploring: [] },
  ];

  return (
    <section id="skills" style={{ padding: "5rem 1.5rem" }}>
      <div className="reveal" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Expertise</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Skills</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {categories.map((cat) => (
            <div key={cat.label} className="card">
              <p className="label-upper" style={{ marginBottom: "1.25rem", color: "var(--primary)" }}>{cat.label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {cat.skills.map((skill) => <span key={skill} className="tag-explore">{skill}</span>)}
              </div>
              {cat.exploring.length > 0 && (
                <>
                  <p className="label-upper" style={{ marginTop: "1.25rem", marginBottom: "0.75rem", fontSize: "0.65rem", opacity: 0.7 }}>Currently Exploring</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {cat.exploring.map((skill) => <span key={skill} className="tag-explore">{skill}</span>)}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [certModal, setCertModal] = useState(false);
  const certUrl = `${BASE}/hackforge-certificate.png`;

  return (
    <section id="experience" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div className="reveal" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Professional Path</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Experience</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <div className="card" style={{ background: "var(--background)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }}></div>
              <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.05rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>EvolveX Intern</h3>
              <span className="highlight-badge">Full Stack Dev</span>
            </div>
            <p style={{ color: "var(--muted-fg)", fontSize: "0.87rem", lineHeight: 1.7, margin: 0, paddingLeft: "1.25rem" }}>
              Currently working on building and improving web applications while gaining practical experience.
            </p>
          </div>

          <div className="card" style={{ background: "var(--background)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }}></div>
              <h3 style={{ fontFamily: "var(--app-font-serif)", fontSize: "1.05rem", fontWeight: 400, color: "var(--foreground)", margin: 0 }}>Hackforge Hackathon Participant</h3>
            </div>
            <p style={{ color: "var(--muted-fg)", fontSize: "0.87rem", lineHeight: 1.7, margin: 0, paddingLeft: "1.25rem" }}>
              Participated in HackForge Hackathon, a 48-hour hackathon conducted by the StudentForge team in collaboration with Promptechies at CMR Institute of Technology. During the event, we worked intensively on building Mind-Mate.
            </p>
            <div style={{ paddingLeft: "1.25rem", marginTop: "0.875rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn-text" onClick={() => setCertModal(true)}>View Certificate</button>
              <button className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.45rem 1.1rem" }} onClick={() => scrollTo("#projects")}>View Project Details</button>
            </div>
          </div>

        </div>
      </div>
      {certModal && <Modal title="Hackforge Certificate" imageUrl={certUrl} onClose={() => setCertModal(false)} />}
    </section>
  );
}

function Hobbies() {
  const hobbies = [
    {
      icon: <Dribbble size={20} />,     
      title: "Basketball",
      desc: "I'm a basketball player — on the court is where I feel most alive",
      badge: "PLAYER",
    },
    {
      icon: <Video size={20} />,
      title: "Badminton",
      desc: "Fast rallies & outdoor fun",
      badge: null,
    },
    {
      icon: <BookOpen size={20} />,
      title: "Reading",
      desc: "Romantic novels & storytelling",
      badge: null,
    },
    {
      icon: <Pencil size={20} />,
      title: "Drawing",
      desc: "Sketching & visual expression",
      badge: null,
    },
    {
      icon: <Scissors size={20} />,
      title: "Craft work",
      desc: "Making things with my hands",
      badge: null,
    },
    {
      icon: <Globe size={20} />,
      title: "Outdoor activities",
      desc: "Exploring & staying active outside",
      badge: null,
    },
    {
      icon: <Film size={20} />,
      title: "Films",
      desc: "Cinema, stories & everything in between",
      badge: null,
    },
    {
      icon: <MusicIcon size={20} />,
      title: "Music",
      desc: "Good music for every mood",
      badge: null,
    },
  ];

  return (
    <section id="hobbies" style={{ padding: "5rem 1.5rem" }}>
      <div className="reveal" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Interests & Hobbies</p>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--app-font-serif)", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, color: "var(--foreground)", margin: "0" }}>
            beyond my
          </h2>
          <h2 style={{ fontFamily: "var(--app-font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, color: "var(--primary)", margin: "0 0 1rem" }}>
            technical pursuits
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {hobbies.map((hobby) => (
            <div key={hobby.title} className="card" style={{ background: "var(--background)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "var(--primary)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fdf8f6",
              }}>
                {hobby.icon}
              </div>
              <h3 style={{ fontFamily: "var(--app-font-sans)", fontSize: "1rem", fontWeight: 500, color: "var(--foreground)", margin: 0 }}>
                {hobby.title}
              </h3>
              <p style={{ color: "var(--muted-fg)", fontSize: "0.86rem", lineHeight: 1.7, margin: 0 }}>
                {hobby.desc}
              </p>
              {hobby.badge && (
                <span style={{
                  display: "inline-block", alignSelf: "flex-start",
                  fontSize: "0.65rem", letterSpacing: "0.1em",
                  border: "0.5px solid var(--border-color)",
                  borderRadius: "999px", padding: "0.25rem 0.75rem",
                  color: "var(--muted-fg)", marginTop: "0.25rem",
                }}>
                  {hobby.badge}
                </span>
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
    {
      badge: "Career Goal",
      color: "#e8f0e8",
      textColor: "#3a6b3a",
      borderColor: "#b5d4b5",
      icon: "◎",
      desc: "Achieve a strong score in GATE and secure an opportunity to contribute to national defense by joining DRDO.",
    },
    {
      badge: "Venture",
      color: "#eef5e8",
      textColor: "#4a6b2a",
      borderColor: "#c0d4a0",
      icon: "⊛",
      desc: "Aspire to become an entrepreneur by transforming my project, Velora, into a real-time, practical implementation.",
    },
    {
      badge: "Beyond Tech",
      color: "#e8eef5",
      textColor: "#2a4a6b",
      borderColor: "#a0b8d4",
      icon: "⊕",
      desc: "Hope to establish an NPO dedicated to supporting underprivileged children and making a meaningful impact beyond technology.",
    },
  ];

  return (
    <section id="goals" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div className="reveal" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Looking Ahead</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Future Goals</h2>
        <div className="card" style={{ background: "var(--background)", display: "flex", flexDirection: "column", gap: "0" }}>
          {goals.map((goal, i) => (
            <div key={i}>
              {i > 0 && <hr className="divider" style={{ margin: "1.5rem 0" }} />}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: i === 0 ? "0 0 0" : "0" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  alignSelf: "flex-start",
                  background: goal.color, color: goal.textColor,
                  border: `1px solid ${goal.borderColor}`,
                  borderRadius: "999px", padding: "0.3rem 0.75rem",
                  fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
                }}>
                  <span style={{ fontSize: "0.75rem" }}>{goal.icon}</span>
                  {goal.badge}
                </span>
                <p style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>
                  {goal.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const paragraphs = [
    "I grew up in a single-parent household, raised by my mother. For a long time, I lacked direction and consistency — I would give up too easily and not take my responsibilities seriously enough.",
    "My mother always wanted a passionate, studious, and well-mannered child. What she got was someone lazy, mischievous, and consistently inconsistent. That gap between who she hoped I would be and who I actually was — I felt it, even when I pretended not to.",
    "I appeared for the NDA examination twice, aspiring to join the Indian Navy, but could not clear the first stage either time. I participated in numerous Olympiad examinations throughout school without qualifying a single one. These experiences led me to doubt my own abilities significantly.",
    "A considerable amount was invested in my intermediate education — approximately 8 lakhs — yet I was unable to score 90%. That made me feel like I wasn't doing justice to the opportunities I was given.",
    "Alongside academics, I was involved in sports — basketball and kho-kho. Not even a single win to my name — but those experiences instilled in me the discipline to keep going despite setbacks.",
    "My family had expectations from me, and I often felt like I wasn't meeting them. But things started to change when I qualified EAMCET with very limited preparation. That moment made my family slowly start believing in me, and it made everyone including me realize that I had potential—I just wasn't using it properly.",
    "Getting selected as an intern at EvolveX meant a lot—after all the failures, it felt like a step forward.",
    "There was one moment that stayed with me. My mother once said that instead of spending so much on me, the same could have helped a hardworking child who needed it more. That line didn't leave me.",
    "I didn't take it as discouragement—I took it as responsibility. Someday, I want to build something meaningful and give back by starting a non-profit for children who don't have the opportunities I had.",
    "Over time, I started reflecting on myself and decided to change. I'm now working on becoming more focused, disciplined, and consistent.",
  ];

  const closingQuote = "Today, my goals are clear: improve my skills, prepare for GATE, work towards opportunities like DRDO, build Velora into something real, and give back through that non-profit. Most importantly, I want to make my mother proud.";

  return (
    <section id="journey" style={{ padding: "5rem 1.5rem" }}>
      <div className="reveal" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p className="label-upper" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Personal Narrative</p>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "0.75rem" }}>My Journey</h2>
        <p style={{ textAlign: "center", fontStyle: "italic", color: "var(--muted-fg)", fontSize: "0.88rem", marginBottom: "3rem", opacity: 0.75 }}>
          "A story of failure."
        </p>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ color: "var(--muted-fg)", fontSize: "0.9rem", lineHeight: 1.85, margin: 0 }}>{para}</p>
          ))}

          <blockquote style={{
            margin: "0.5rem 0 0",
            padding: "1.125rem 1.5rem",
            borderLeft: "3px solid var(--primary)",
            background: "var(--surface)",
            borderRadius: "0 6px 6px 0",
          }}>
            <p style={{
              fontFamily: "var(--app-font-serif)",
              fontStyle: "italic",
              fontSize: "0.975rem",
              lineHeight: 1.85,
              color: "var(--foreground)",
              margin: 0,
            }}>
              {closingQuote}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await import("@emailjs/browser").then(({ send }) =>
        send(
          "service_2wuux2h",
          "template_au3tdn9",
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          "bV0sHD8MKjCOTpr1v"
        )
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const links = [
    { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/laharixx908-star", display: "laharixx908-star" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/sai-lahari-reddy-b-799818396", display: "sai-lahari-reddy-b" },
    { icon: <Mail size={18} />, label: "Email", href: "https://mail.google.com/mail/?view=cm&to=laharicareer.19@gmail.com", display: "laharicareer.19@gmail.com" },
  ];

  return (
    <section id="contact" style={{ padding: "5rem 1.5rem", background: "var(--surface)" }}>
      <div className="reveal" style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--app-font-serif)", fontWeight: 400, fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, color: "var(--foreground)", margin: "0 0 0.25rem" }}>
            wanna build something
          </h2>
          <h2 style={{ fontFamily: "var(--app-font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, color: "var(--primary)", margin: "0 0 1.25rem" }}>
            new & crazy?
          </h2>
          <p style={{ color: "var(--muted-fg)", fontSize: "0.92rem", lineHeight: 1.75, maxWidth: "420px" }}>
            open to ideas, collabs, wild projects, or just a random convo. drop a text — i'll get back to you, no cap.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start" }}>

          <div className="card" style={{ background: "var(--background)" }}>
            <p className="label-upper" style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>Find Me Here</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {links.map((link) => (
                <a key={link.label} href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "0.875rem",
                    padding: "0.75rem 0.875rem", borderRadius: "10px",
                    textDecoration: "none", color: "inherit",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ color: "var(--primary)", background: "var(--surface)", padding: "0.5rem", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {link.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="label-upper" style={{ fontSize: "0.65rem", marginBottom: "0.1rem" }}>{link.label}</div>
                    <div style={{ fontSize: "0.83rem", color: "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{link.display}</div>
                  </div>
                  <span style={{ color: "var(--muted-fg)", fontSize: "0.8rem" }}>›</span>
                </a>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: "var(--background)" }}>
            <p className="label-upper" style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>Slide Into My Inbox</p>
            <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-fg)", marginBottom: "0.4rem" }}>Your Name</label>
                  <input className="contact-input" type="text" placeholder="your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    style={{}}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-fg)", marginBottom: "0.4rem" }}>Email</label>
                  <input className="contact-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                    style={{}}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-fg)", marginBottom: "0.4rem" }}>Message</label>
                <textarea className="contact-input" placeholder="spill it, don't hold back..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical", minHeight: "110px" }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }} disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent! ✓" : status === "error" ? "Failed, Try Again" : <>Send <span style={{ fontSize: "1rem" }}>›</span></>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
function Footer({ dark }: { dark: boolean }) {
  return (
    <footer style={{ padding: "2.5rem 1.5rem", borderTop: "0.5px solid var(--border-color)", background: dark ? "var(--background)" : "var(--surface)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "var(--muted-fg)", fontSize: "0.75rem", letterSpacing: "0.08em", opacity: 0.65, margin: 0 }}>© 2025 Sai Lahari Reddy</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
const [heroVisible, setHeroVisible] = useState(false);
  useScrollReveal(!showSplash);
  return (
    <div className={dark ? "dark-mode" : ""} style={{ minHeight: "100vh", background: "var(--background)", transition: "background 0.3s ease" }}>
      {showSplash && <SplashScreen onDismiss={() => { setShowSplash(false); setTimeout(() => setHeroVisible(true), 100); }} />}
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
      <Hero visible={heroVisible} />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Hobbies />
      <FutureGoals />
      <Journey />
      <Contact />
      <Footer dark={dark} />
    </div>
  );
}
