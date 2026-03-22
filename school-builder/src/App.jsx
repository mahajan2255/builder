import { useState, useRef, useEffect } from "react";
import {
  Award, Users, BookOpen, Trophy, GraduationCap, FlaskConical,
  Palette, Globe, Calculator, Music, Medal, Target, Zap,
  Calendar, FileText, CheckCircle, MapPin, Phone, Mail, Clock,
  Star, Quote, Dumbbell, Theater, Microscope, Camera, Globe2,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowRight, ChevronRight, ChevronUp, ChevronDown, X,
} from "lucide-react";

/* ─── CSS ──────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:6px;height:6px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#64748b;border-radius:3px;}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeLeft{from{opacity:0;transform:translateX(-48px);}to{opacity:1;transform:translateX(0);}}
@keyframes fadeRight{from{opacity:0;transform:translateX(48px);}to{opacity:1;transform:translateX(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
@keyframes orb1{0%,100%{transform:scale(1);opacity:.3;}50%{transform:scale(1.2);opacity:.5;}}
@keyframes orb2{0%,100%{transform:scale(1);opacity:.25;}50%{transform:scale(1.3);opacity:.4;}}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(10px);}}
@keyframes dotBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(18px);}}
@keyframes spin{to{transform:rotate(360deg);}}

.anim-up{animation:fadeUp .7s ease both;}
.anim-left{animation:fadeLeft .7s ease both;}
.anim-right{animation:fadeRight .7s ease both;}
.anim-in{animation:fadeIn .7s ease both;}
.anim-scale{animation:scaleIn .5s ease both;}

.card-hover{transition:transform .25s,box-shadow .25s;}
.card-hover:hover{transform:translateY(-8px);box-shadow:0 20px 48px rgba(0,0,0,.14);}
.scale-hover{transition:transform .25s;}
.scale-hover:hover{transform:scale(1.05);}
.img-zoom img{transition:transform .5s;}
.img-zoom:hover img{transform:scale(1.1);}
.nav-link{transition:color .15s;}
.nav-link:hover{color:#93c5fd!important;}
.footer-link{transition:color .2s;}
.footer-link:hover{color:#fff!important;}
.social-btn{transition:background .2s;}
.social-btn:hover{background:#2563eb!important;}
`;

/* ─── HELPERS ───────────────────────────────────────────────────── */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

function useInView(delay = 0) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis, delay];
}

function AnimBox({ children, type = "up", delay = 0, style = {}, className = "" }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const cls = vis ? `anim-${type}` : "";
  return (
    <div ref={ref} className={`${cls} ${className}`}
      style={{ opacity: vis ? undefined : 0, animationDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─── EDITABLE TEXT ─────────────────────────────────────────────── */
function ET({ value, onChange, tag: Tag = "span", style = {}, className = "" }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const r = document.createRange(); r.selectNodeContents(ref.current);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
  }, [editing]);
  return (
    <Tag ref={ref} contentEditable={editing} suppressContentEditableWarning
      onDoubleClick={e => { e.stopPropagation(); setEditing(true); }}
      onBlur={e => { setEditing(false); onChange(e.currentTarget.textContent || value); }}
      onKeyDown={e => { if ((e.key === "Enter" && Tag !== "p" && Tag !== "div") || e.key === "Escape") ref.current.blur(); }}
      title={!editing ? "Double-click to edit" : ""}
      style={{ ...style, outline: editing ? "2px solid #3b82f6" : "none", borderRadius: editing ? 3 : 0, cursor: editing ? "text" : "inherit" }}
      className={className}>{value}</Tag>
  );
}

/* ─── GRADIENT MAP ──────────────────────────────────────────────── */
const G = {
  "from-blue-500 to-blue-600":      "linear-gradient(135deg,#3b82f6,#2563eb)",
  "from-purple-500 to-purple-600":  "linear-gradient(135deg,#a855f7,#9333ea)",
  "from-pink-500 to-pink-600":      "linear-gradient(135deg,#ec4899,#db2777)",
  "from-green-500 to-green-600":    "linear-gradient(135deg,#22c55e,#16a34a)",
  "from-orange-500 to-orange-600":  "linear-gradient(135deg,#f97316,#ea580c)",
  "from-indigo-500 to-indigo-600":  "linear-gradient(135deg,#6366f1,#4f46e5)",
  "from-yellow-400 to-orange-500":  "linear-gradient(135deg,#facc15,#f97316)",
  "from-blue-400 to-cyan-500":      "linear-gradient(135deg,#60a5fa,#06b6d4)",
  "from-purple-400 to-pink-500":    "linear-gradient(135deg,#c084fc,#ec4899)",
  "from-green-400 to-emerald-500":  "linear-gradient(135deg,#4ade80,#10b981)",
  "from-pink-500 to-rose-500":      "linear-gradient(135deg,#ec4899,#f43f5e)",
  "from-purple-500 to-indigo-500":  "linear-gradient(135deg,#a855f7,#6366f1)",
  "from-orange-500 to-red-500":     "linear-gradient(135deg,#f97316,#ef4444)",
  "from-blue-500 to-cyan-500":      "linear-gradient(135deg,#3b82f6,#06b6d4)",
  "from-green-500 to-emerald-500":  "linear-gradient(135deg,#22c55e,#10b981)",
  "from-yellow-500 to-amber-500":   "linear-gradient(135deg,#eab308,#f59e0b)",
  "from-teal-500 to-cyan-500":      "linear-gradient(135deg,#14b8a6,#06b6d4)",
  "from-fuchsia-500 to-pink-500":   "linear-gradient(135deg,#d946ef,#ec4899)",
};
const g = k => G[k] || "linear-gradient(135deg,#3b82f6,#2563eb)";

/* ─── INITIAL DATA ──────────────────────────────────────────────── */
const INIT = [
  { id:"nav1", type:"navbar", props:{ schoolName:"DS Public School", logoLetter:"P", links:["About","Academics","Admissions","Campus Life","Contact"], loginText:"Portal Login" }},
  { id:"hero1", type:"hero", props:{ headline:"Excellence in Education", tagline:"Empowering minds, inspiring futures since 1985", description:"A premier institution dedicated to nurturing academic excellence, character development, and global citizenship", primaryCta:"Apply Now", secondaryCta:"Schedule a Tour", bgImage:"https://images.unsplash.com/photo-1647667436195-6954ef8b27e0?w=1080&q=80" }},
  { id:"about1", type:"about", props:{ heading:"Building Tomorrow's Leaders Today", para1:"At DS Public School, we believe in nurturing well-rounded individuals who are prepared to meet the challenges of tomorrow. Our curriculum combines rigorous academics with character development, ensuring our students excel in all aspects of life.", para2:"With state-of-the-art facilities, dedicated faculty, and a supportive community, we create an environment where every student can thrive and discover their unique potential.", image:"https://images.unsplash.com/photo-1764720573370-5008f1ccc9fa?w=900&q=80", stats:[{v:"38+",l:"Years of Excellence"},{v:"2,500+",l:"Students Enrolled"},{v:"150+",l:"Expert Faculty"},{v:"95%",l:"University Acceptance"}] }},
  { id:"prog1", type:"programs", props:{ heading:"Academic Programs", subtext:"Comprehensive education that prepares students for success in college and beyond", programs:[{title:"Advanced Academics",desc:"Rigorous curriculum with AP and honors courses designed to challenge and inspire.",color:"from-blue-500 to-blue-600"},{title:"STEM Excellence",desc:"State-of-the-art laboratories and innovative programs in science, technology, engineering, and mathematics.",color:"from-purple-500 to-purple-600"},{title:"Arts & Culture",desc:"Comprehensive visual and performing arts programs to nurture creative expression.",color:"from-pink-500 to-pink-600"},{title:"Global Studies",desc:"International curriculum and exchange programs fostering global citizenship.",color:"from-green-500 to-green-600"},{title:"Mathematics",desc:"Advanced mathematics program from foundational concepts to calculus and beyond.",color:"from-orange-500 to-orange-600"},{title:"Music & Drama",desc:"Award-winning music and theater programs with professional-grade facilities.",color:"from-indigo-500 to-indigo-600"}] }},
  { id:"ach1", type:"achievements", props:{ heading:"Awards & Achievements", subtext:"Celebrating excellence and recognizing outstanding accomplishments", items:[{year:"2025",title:"National STEM Excellence Award",desc:"Recognized as the top STEM school in the region for innovation and student achievement.",color:"from-yellow-400 to-orange-500"},{year:"2024",title:"International Robotics Champions",desc:"Our robotics team won first place at the World Robotics Championship in Tokyo.",color:"from-blue-400 to-cyan-500"},{year:"2024",title:"100% College Acceptance Rate",desc:"Every graduating senior accepted to their top choice universities for the 5th consecutive year.",color:"from-purple-400 to-pink-500"},{year:"2023",title:"Green School Certification",desc:"Achieved platinum-level sustainable campus certification for environmental initiatives.",color:"from-green-400 to-emerald-500"}] }},
  { id:"adm1", type:"admissions", props:{ heading:"Admissions Process", subtext:"Join our community in four simple steps", steps:[{number:"01",title:"Submit Application",desc:"Complete our online application form and submit required documents."},{number:"02",title:"Schedule Visit",desc:"Book a campus tour and meet with our admissions team."},{number:"03",title:"Interview",desc:"Participate in a student and parent interview with our faculty."},{number:"04",title:"Enrollment",desc:"Receive your decision and complete enrollment paperwork."}], ctaTitle:"Ready to Join Our Community?", ctaSubtext:"Applications for the 2025–2026 academic year are now open.", ctaButton:"Start Your Application" }},
  { id:"fac1", type:"faculty", props:{ heading:"Meet Our Faculty", subtext:"World-class educators dedicated to student success", members:[{name:"Dr. Elizabeth Mitchell",role:"Principal",dept:"Administration",img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",cred:"Ph.D. in Educational Leadership"},{name:"Prof. James Anderson",role:"Head of Sciences",dept:"STEM Department",img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",cred:"M.S. in Physics, 20 years experience"},{name:"Dr. Sarah Williams",role:"Head of Arts",dept:"Arts & Humanities",img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",cred:"Ph.D. in Fine Arts, Award-winning artist"},{name:"Mr. David Chen",role:"Technology Director",dept:"Computer Science",img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",cred:"M.S. Computer Science, Former Google Engineer"},{name:"Ms. Maria Rodriguez",role:"Head of Languages",dept:"World Languages",img:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",cred:"M.A. in Linguistics, Fluent in 5 languages"},{name:"Dr. Robert Taylor",role:"Head of Mathematics",dept:"Mathematics",img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",cred:"Ph.D. in Mathematics, Published researcher"}] }},
  { id:"ne1", type:"newevents", props:{ newsHeading:"Latest News", newsSubtext:"Stay updated with happenings around campus", news:[{id:"n1",title:"DS Public School Wins National Debate Championship",category:"Achievement",date:"March 1, 2026",img:"https://images.unsplash.com/photo-1764720573370-5008f1ccc9fa?w=600&q=80",excerpt:"Our debate team brought home the gold medal after competing against 150 schools nationwide."},{id:"n2",title:"New STEM Center Opens Next Month",category:"Facilities",date:"February 28, 2026",img:"https://images.unsplash.com/photo-1743677077216-00a458eff9e0?w=600&q=80",excerpt:"State-of-the-art facility featuring robotics labs, maker spaces, and innovation studios."},{id:"n3",title:"Student Art Exhibition Featured in City Gallery",category:"Arts",date:"February 25, 2026",img:"https://images.unsplash.com/photo-1598389118600-9a83ceb4ebe6?w=600&q=80",excerpt:"Our talented artists showcase their work in a prestigious downtown exhibition."}], eventsHeading:"Upcoming Events", eventsSubtext:"Mark your calendar for these exciting activities", events:[{id:"e1",title:"Open House & Campus Tour",date:"March 15, 2026",time:"10:00 AM – 2:00 PM",location:"Main Campus",color:"from-blue-500 to-blue-600"},{id:"e2",title:"Spring Musical: Les Misérables",date:"March 22–24, 2026",time:"7:00 PM",location:"Performing Arts Center",color:"from-purple-500 to-purple-600"},{id:"e3",title:"Science Fair & Innovation Expo",date:"April 5, 2026",time:"9:00 AM – 4:00 PM",location:"STEM Building",color:"from-green-500 to-green-600"},{id:"e4",title:"College Planning Workshop",date:"April 12, 2026",time:"6:00 PM – 8:00 PM",location:"Auditorium",color:"from-orange-500 to-orange-600"}] }},
  { id:"gal1", type:"gallery", props:{ heading:"Campus Life", subtext:"Experience our vibrant community and world-class facilities", images:[{url:"https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?w=800&q=80",title:"Science Labs",span:"row-span-2"},{url:"https://images.unsplash.com/photo-1709159057219-80439fbeddce?w=600&q=80",title:"Library",span:""},{url:"https://images.unsplash.com/photo-1718054231254-4b289c2175c2?w=600&q=80",title:"Sports Facilities",span:""},{url:"https://images.unsplash.com/photo-1686213011371-2aff28a08f16?w=800&q=80",title:"Graduation",span:"col-span-2"}] }},
  { id:"ex1", type:"extracurricular", props:{ heading:"Beyond the Classroom", subtext:"Discover your passion with over 50 clubs, sports, and extracurricular activities", ctaTitle:"Join Our Vibrant Community", ctaSubtext:"With activities for every interest, you'll find your place to grow, learn, and excel", ctaButton:"View All Activities", activities:[{category:"Arts & Culture",color:"from-pink-500 to-rose-500",clubs:["Art Club","Photography","Creative Writing","Fashion Design"]},{category:"Music & Performance",color:"from-purple-500 to-indigo-500",clubs:["Orchestra","Jazz Band","Choir","Drama Club"]},{category:"Athletics",color:"from-orange-500 to-red-500",clubs:["Basketball","Soccer","Swimming","Track & Field"]},{category:"STEM",color:"from-blue-500 to-cyan-500",clubs:["Robotics","Coding Club","Science Olympiad","Math Team"]},{category:"Leadership",color:"from-green-500 to-emerald-500",clubs:["Student Council","Model UN","Debate Team","Peer Mentoring"]},{category:"Media",color:"from-yellow-500 to-amber-500",clubs:["Yearbook","School Newspaper","Broadcasting","Digital Media"]},{category:"Service",color:"from-teal-500 to-cyan-500",clubs:["Community Service","Environmental Club","Charity Drive","Tutoring"]},{category:"Theater Arts",color:"from-fuchsia-500 to-pink-500",clubs:["Drama Productions","Improv Comedy","Musical Theater","Stage Crew"]}] }},
  { id:"test1", type:"testimonials", props:{ heading:"What Our Community Says", subtext:"Hear from parents, students, and alumni about their DS Public School experience", items:[{name:"Sarah Johnson",role:"Parent",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",text:"DS Public School has been transformational for our daughter. The teachers are exceptional, and the supportive environment has helped her thrive academically and personally."},{name:"Michael Chen",role:"Graduate, Class of 2024",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",text:"The education I received here prepared me perfectly for university. The AP program and mentorship from faculty gave me a significant advantage."},{name:"Emily Rodriguez",role:"Parent",img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",text:"The holistic approach to education at DS Public School is remarkable. My son has grown not just academically, but also as a compassionate and confident individual."}] }},
  { id:"con1", type:"contact", props:{ heading:"Get in Touch", subtext:"Have questions? We're here to help you every step of the way", address:"123 Education Boulevard, Academic District, State 12345", phone:"+1 (555) 123-4567", email:"admissions@dspublicschool.edu", hours:"Mon-Fri: 8:00 AM - 5:00 PM" }},
  { id:"foot1", type:"footer", props:{ schoolName:"DS Public School", desc:"Empowering minds and inspiring futures since 1985. Building tomorrow's leaders through excellence in education.", address:"123 Education Boulevard, Academic District, State 12345", phone:"+1 (555) 123-4567", email:"info@dspublicschool.edu" }},
];

const META = {
  navbar:{icon:"☰",label:"Navbar",desc:"Navigation bar"},
  hero:{icon:"★",label:"Hero Banner",desc:"Full-screen hero"},
  about:{icon:"🏫",label:"About",desc:"About the school"},
  programs:{icon:"📚",label:"Programs",desc:"Academic programs"},
  achievements:{icon:"🏆",label:"Achievements",desc:"Awards & achievements"},
  admissions:{icon:"📋",label:"Admissions",desc:"Admissions process"},
  faculty:{icon:"👨🏫",label:"Faculty",desc:"Meet our faculty"},
  newevents:{icon:"📰",label:"News & Events",desc:"News and events"},
  gallery:{icon:"🖼",label:"Gallery",desc:"Campus gallery"},
  extracurricular:{icon:"🎭",label:"Extracurricular",desc:"Activities & clubs"},
  testimonials:{icon:"💬",label:"Testimonials",desc:"Community voices"},
  contact:{icon:"📞",label:"Contact",desc:"Contact information"},
  footer:{icon:"▬",label:"Footer",desc:"Page footer"},
  login:{icon:"🔑",label:"Login",desc:"User authentication"},
};
const NEW_DEF = {
  navbar:{schoolName:"DS Public School",logoLetter:"P",links:["About","Academics","Admissions","Contact"],loginText:"Portal Login"},
  hero:{headline:"Excellence in Education",tagline:"Empowering minds, inspiring futures since 1985",description:"A premier institution dedicated to nurturing academic excellence.",primaryCta:"Apply Now",secondaryCta:"Schedule a Tour",bgImage:"https://images.unsplash.com/photo-1647667436195-6954ef8b27e0?w=1080"},
  about:{heading:"Building Tomorrow's Leaders",para1:"We nurture well-rounded individuals.",para2:"State-of-the-art facilities and dedicated faculty.",image:"https://images.unsplash.com/photo-1764720573370-5008f1ccc9fa?w=800",stats:[{v:"38+",l:"Years"},{v:"2,500+",l:"Students"},{v:"150+",l:"Faculty"},{v:"95%",l:"Acceptance"}]},
  programs:{heading:"Academic Programs",subtext:"Comprehensive education for future success",programs:[{title:"Advanced Academics",desc:"Rigorous curriculum.",color:"from-blue-500 to-blue-600"},{title:"STEM Excellence",desc:"Innovation labs.",color:"from-purple-500 to-purple-600"},{title:"Arts & Culture",desc:"Creative expression.",color:"from-pink-500 to-pink-600"}]},
  achievements:{heading:"Awards & Achievements",subtext:"Celebrating excellence",items:[{year:"2025",title:"National STEM Award",desc:"Top STEM school in region.",color:"from-yellow-400 to-orange-500"}]},
  admissions:{heading:"Admissions Process",subtext:"Join our community",steps:[{number:"01",title:"Submit Application",desc:"Complete our form."},{number:"02",title:"Schedule Visit",desc:"Book a tour."},{number:"03",title:"Interview",desc:"Meet faculty."},{number:"04",title:"Enrollment",desc:"Complete paperwork."}],ctaTitle:"Ready to Join?",ctaSubtext:"Applications now open.",ctaButton:"Start Application"},
  faculty:{heading:"Meet Our Faculty",subtext:"World-class educators",members:[{name:"Dr. Elizabeth Mitchell",role:"Principal",dept:"Administration",img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",cred:"Ph.D. in Educational Leadership"}]},
  newevents:{newsHeading:"Latest News",newsSubtext:"Stay updated",news:[{id:"x1",title:"New Achievement",category:"Achievement",date:"Today",img:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",excerpt:"Our students achieved great results."}],eventsHeading:"Upcoming Events",eventsSubtext:"Mark your calendar",events:[{id:"x2",title:"Open House",date:"March 15",time:"10:00 AM",location:"Main Campus",color:"from-blue-500 to-blue-600"}]},
  gallery:{heading:"Campus Life",subtext:"Our vibrant community",images:[{url:"https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?w=800",title:"Science Labs",span:"row-span-2"},{url:"https://images.unsplash.com/photo-1709159057219-80439fbeddce?w=600",title:"Library",span:""},{url:"https://images.unsplash.com/photo-1718054231254-4b289c2175c2?w=600",title:"Sports",span:""}]},
  extracurricular:{heading:"Beyond the Classroom",subtext:"Over 50 clubs and activities",ctaTitle:"Join Our Community",ctaSubtext:"Activities for every interest.",ctaButton:"View All Activities",activities:[{category:"Arts & Culture",color:"from-pink-500 to-rose-500",clubs:["Art Club","Photography","Creative Writing"]},{category:"Athletics",color:"from-orange-500 to-red-500",clubs:["Basketball","Soccer","Swimming"]}]},
  testimonials:{heading:"What Our Community Says",subtext:"Hear from our school family",items:[{name:"Sarah Johnson",role:"Parent",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",text:"DS Public School has been transformational for our daughter."}]},
  contact:{heading:"Get in Touch",subtext:"We're here to help",address:"123 Education Blvd",phone:"+1 (555) 123-4567",email:"info@dspublicschool.edu",hours:"Mon-Fri: 8AM-5PM"},
  footer:{schoolName:"DS Public School",desc:"Empowering minds since 1985.",address:"123 Education Blvd",phone:"+1 (555) 123-4567",email:"info@dspublicschool.edu"},
  login:{heading:"Student Login",buttonText:"Login securely",emailPlaceholder:"Email Address",passwordPlaceholder:"Password"},
};

/* ─── ICON ARRAYS ───────────────────────────────────────────────── */
const PROG_ICONS = [GraduationCap, FlaskConical, Palette, Globe, Calculator, Music];
const ACH_ICONS  = [Trophy, Medal, Target, Zap];
const ADM_ICONS  = [FileText, Calendar, Users, CheckCircle];
const ACT_ICONS  = [Palette, Music, Dumbbell, Microscope, Users, Camera, Globe2, Theater];
const SOCIAL     = [Facebook, Twitter, Instagram, Linkedin, Youtube];
const STAT_ICONS = [Award, Users, BookOpen, Trophy];

/* ─── SECTION RENDERERS ─────────────────────────────────────────── */

function NavbarSec({ props: p, onUpdate }) {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current?.closest("[data-canvas]");
    if (!canvas) return;
    const h = () => setScrolled(canvas.scrollTop > 50);
    canvas.addEventListener("scroll", h);
    return () => canvas.removeEventListener("scroll", h);
  }, []);
  return (
    <nav ref={ref}
      style={{ background: scrolled ? "rgba(255,255,255,.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.08)" : "none", position: "sticky", top: 0, zIndex: 50, transition: "all .3s", animation: "fadeUp .6s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: scrolled ? "#2563eb" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s", overflow: "hidden" }}>
            {p.logoImage ? <img src={p.logoImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Logo" /> :
              <ET value={p.logoLetter} onChange={v => onUpdate({ ...p, logoLetter: v })}
                style={{ fontSize: 22, fontWeight: 700, color: scrolled ? "#fff" : "#2563eb", fontFamily: "'Playfair Display',serif", transition: "color .3s" }} />
            }
          </div>
          <ET value={p.schoolName} onChange={v => onUpdate({ ...p, schoolName: v })}
            style={{ fontSize: 22, fontWeight: 700, color: scrolled ? "#1e293b" : "#fff", fontFamily: "'Playfair Display',serif", transition: "color .3s" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {p.links.map((l, i) => (
            <a key={i} href="#" onClick={e => {
                e.preventDefault();
                const id = l.toLowerCase() === "academics" ? "programs" : l.toLowerCase();
                const target = document.getElementById(`section-${id}`);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }} className="nav-link"
              style={{ color: scrolled ? "#475569" : "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", fontFamily: "'Inter',sans-serif", animationDelay: `${i * 0.1}s`, animation: "fadeUp .5s ease both" }}>
              {l}
            </a>
          ))}
          <button onClick={() => window.setActivePage && window.setActivePage("login")} style={{ background: scrolled ? "#2563eb" : "#fff", color: scrolled ? "#fff" : "#2563eb", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all .3s" }}>
            <ET value={p.loginText} onChange={v => onUpdate({ ...p, loginText: v })} style={{ color: "inherit" }} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSec({ props: p, onUpdate }) {
  return (
    <section style={{ position: "relative", minHeight: 640, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(135deg,#0f172a,#1e3a5f,#1e293b)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${p.bgImage}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
      <div style={{ position: "absolute", top: 80, left: 80, width: 288, height: 288, background: "rgba(59,130,246,.28)", borderRadius: "50%", filter: "blur(64px)", animation: "orb1 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: 80, right: 80, width: 384, height: 384, background: "rgba(139,92,246,.22)", borderRadius: "50%", filter: "blur(80px)", animation: "orb2 10s ease-in-out infinite" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 32px", maxWidth: 960 }}>
        <ET tag="h1" value={p.headline} onChange={v => onUpdate({ ...p, headline: v })}
          style={{ fontSize: 78, fontWeight: 700, color: "#fff", lineHeight: 1.05, letterSpacing: "-2px", fontFamily: "'Playfair Display',serif", margin: "0 0 22px", display: "block", animation: "fadeUp .8s .2s ease both", opacity: 0, animationFillMode: "forwards" }} />
        <ET tag="p" value={p.tagline} onChange={v => onUpdate({ ...p, tagline: v })}
          style={{ fontSize: 22, color: "#bfdbfe", margin: "0 0 14px", fontFamily: "'Inter',sans-serif", display: "block", animation: "fadeUp .8s .4s ease both", opacity: 0, animationFillMode: "forwards" }} />
        <ET tag="p" value={p.description} onChange={v => onUpdate({ ...p, description: v })}
          style={{ fontSize: 16, color: "rgba(191,219,254,.78)", maxWidth: 540, margin: "0 auto 44px", lineHeight: 1.75, fontFamily: "'Inter',sans-serif", display: "block", animation: "fadeUp .8s .6s ease both", opacity: 0, animationFillMode: "forwards" }} />
        <div style={{ display: "flex", gap: 16, justifyContent: "center", animation: "fadeUp .8s .8s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "15px 32px", borderRadius: 8, fontSize: 17, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif" }}>
            <ET value={p.primaryCta} onChange={v => onUpdate({ ...p, primaryCta: v })} style={{ color: "#fff" }} />
            <ChevronRight size={20} />
          </button>
          <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.45)", padding: "15px 32px", borderRadius: 8, fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            <ET value={p.secondaryCta} onChange={v => onUpdate({ ...p, secondaryCta: v })} style={{ color: "#fff" }} />
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", animation: "bounce 2s infinite" }}>
          <div style={{ width: 24, height: 40, border: "2px solid rgba(255,255,255,.45)", borderRadius: 12, padding: 4, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%", animation: "dotBounce 2s infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
function AboutSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
          <AnimBox type="left">
            <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
              style={{ fontSize: 46, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 24px", lineHeight: 1.1, letterSpacing: "-1px", display: "block" }} />
            <ET tag="p" value={p.para1} onChange={v => onUpdate({ ...p, para1: v })}
              style={{ fontSize: 17, color: "#475569", lineHeight: 1.8, margin: "0 0 18px", fontFamily: "'Inter',sans-serif", display: "block" }} />
            <ET tag="p" value={p.para2} onChange={v => onUpdate({ ...p, para2: v })}
              style={{ fontSize: 17, color: "#475569", lineHeight: 1.8, margin: 0, fontFamily: "'Inter',sans-serif", display: "block" }} />
          </AnimBox>
          <AnimBox type="right" style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 25px 64px rgba(0,0,0,.18)", position: "relative" }} className="img-zoom">
              <img src={p.image} alt="" style={{ width: "100%", height: 440, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(30,58,138,.45),transparent)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 112, height: 112, background: "#2563eb", borderRadius: 16, zIndex: -1 }} />
            <div style={{ position: "absolute", top: -20, right: -20, width: 112, height: 112, background: "#7c3aed", borderRadius: 16, zIndex: -1 }} />
          </AnimBox>
        </div>
        <AnimBox type="up" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {p.stats.map((s, i) => {
            const Icon = STAT_ICONS[i] || Award;
            return (
              <div key={i} className="card-hover" style={{ textAlign: "center", padding: "24px 16px", borderRadius: 16, background: "linear-gradient(135deg,#eff6ff,#f5f3ff)", cursor: "default" }}>
                <Icon style={{ width: 40, height: 40, color: "#2563eb", margin: "0 auto 14px", display: "block" }} />
                <ET tag="div" value={s.v} onChange={v => { const n = [...p.stats]; n[i] = { ...n[i], v }; onUpdate({ ...p, stats: n }); }}
                  style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", display: "block" }} />
                <ET tag="div" value={s.l} onChange={v => { const n = [...p.stats]; n[i] = { ...n[i], l: v }; onUpdate({ ...p, stats: n }); }}
                  style={{ fontSize: 14, color: "#475569", marginTop: 6, fontFamily: "'Inter',sans-serif", display: "block" }} />
              </div>
            );
          })}
        </AnimBox>
      </div>
    </section>
  );
}

function ProgramsSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "linear-gradient(135deg,#f8fafc,#eff6ff)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 48, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {p.programs.map((prog, i) => {
            const Icon = PROG_ICONS[i % PROG_ICONS.length];
            return (
              <AnimBox key={i} type="up" delay={i * 0.1}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,.07)", height: "100%" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 14, background: g(prog.color), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    <Icon style={{ width: 32, height: 32, color: "#fff" }} />
                  </div>
                  <ET tag="h3" value={prog.title} onChange={v => { const n = [...p.programs]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, programs: n }); }}
                    style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 12px", display: "block" }} />
                  <ET tag="p" value={prog.desc} onChange={v => { const n = [...p.programs]; n[i] = { ...n[i], desc: v }; onUpdate({ ...p, programs: n }); }}
                    style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0 }} />
                </div>
              </AnimBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AchievementsSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 80 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 52, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1.5px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom,#bfdbfe,#c4b5fd,#fbcfe8)" }} />
          {p.items.map((a, i) => {
            const Icon = ACH_ICONS[i % ACH_ICONS.length];
            const isLeft = i % 2 === 0;
            return (
              <AnimBox key={i} type="up" delay={i * 0.15} style={{ display: "flex", flexDirection: isLeft ? "row" : "row-reverse", gap: 32, alignItems: "center", marginBottom: 72 }}>
                <div style={{ flex: 1, textAlign: isLeft ? "right" : "left" }}>
                  <div className="scale-hover" style={{ background: "linear-gradient(135deg,#f8fafc,#eff6ff)", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,.07)", display: "inline-block", width: "100%" }}>
                    <span style={{ display: "inline-block", padding: "6px 16px", background: g(a.color), color: "#fff", borderRadius: 100, fontWeight: 700, fontSize: 14, marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
                      <ET value={a.year} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], year: v }; onUpdate({ ...p, items: n }); }} style={{ color: "#fff" }} />
                    </span>
                    <ET tag="h3" value={a.title} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, items: n }); }}
                      style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 12px", display: "block" }} />
                    <ET tag="p" value={a.desc} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], desc: v }; onUpdate({ ...p, items: n }); }}
                      style={{ color: "#64748b", lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0 }} />
                  </div>
                </div>
                <div style={{ width: 80, display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: g(a.color), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 1, transition: "transform .4s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "rotate(360deg) scale(1.2)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "rotate(0) scale(1)"}>
                    <Icon style={{ width: 38, height: 38, color: "#fff" }} />
                  </div>
                </div>
                <div style={{ flex: 1 }} />
              </AnimBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdmissionsSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 48, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 60 }}>
          {p.steps.map((step, i) => {
            const Icon = ADM_ICONS[i];
            return (
              <AnimBox key={i} type="up" delay={i * 0.1}>
                <div style={{ background: "linear-gradient(135deg,#eff6ff,#f5f3ff)", borderRadius: 20, padding: 32, height: "100%" }}>
                  <ET tag="div" value={step.number} onChange={v => { const n = [...p.steps]; n[i] = { ...n[i], number: v }; onUpdate({ ...p, steps: n }); }}
                    style={{ fontSize: 60, fontWeight: 700, color: "#bfdbfe", lineHeight: 1, fontFamily: "'Playfair Display',serif", display: "block" }} />
                  <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "14px 0" }}>
                    <Icon style={{ width: 26, height: 26, color: "#fff" }} />
                  </div>
                  <ET tag="h3" value={step.title} onChange={v => { const n = [...p.steps]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, steps: n }); }}
                    style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 10px", display: "block" }} />
                  <ET tag="p" value={step.desc} onChange={v => { const n = [...p.steps]; n[i] = { ...n[i], desc: v }; onUpdate({ ...p, steps: n }); }}
                    style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, fontFamily: "'Inter',sans-serif", margin: 0 }} />
                </div>
              </AnimBox>
            );
          })}
        </div>
        <AnimBox type="up" style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 28, padding: "56px 48px", textAlign: "center", color: "#fff" }}>
          <ET tag="h3" value={p.ctaTitle} onChange={v => onUpdate({ ...p, ctaTitle: v })}
            style={{ fontSize: 38, fontWeight: 700, fontFamily: "'Playfair Display',serif", margin: "0 0 14px", display: "block" }} />
          <ET tag="p" value={p.ctaSubtext} onChange={v => onUpdate({ ...p, ctaSubtext: v })}
            style={{ fontSize: 18, color: "#bfdbfe", margin: "0 0 30px", fontFamily: "'Inter',sans-serif", display: "block" }} />
          <button style={{ background: "#fff", color: "#2563eb", border: "none", padding: "14px 36px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            <ET value={p.ctaButton} onChange={v => onUpdate({ ...p, ctaButton: v })} style={{ color: "#2563eb" }} />
          </button>
        </AnimBox>
      </div>
    </section>
  );
}
function FacultySec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "linear-gradient(135deg,#0f172a,#1e3a5f,#312e81)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .05, backgroundImage: "radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize: "50px 50px" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 52, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1.5px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#93c5fd", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {p.members.map((m, i) => (
            <AnimBox key={i} type="up" delay={i * 0.1}>
              <div className="scale-hover" style={{ background: "rgba(255,255,255,.07)", backdropFilter: "blur(12px)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.15)", height: "100%" }}>
                <div style={{ position: "relative", height: 280, overflow: "hidden" }} className="img-zoom">
                  <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.1))" }} />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <ET tag="h3" value={m.name} onChange={v => { const n = [...p.members]; n[i] = { ...n[i], name: v }; onUpdate({ ...p, members: n }); }}
                    style={{ fontSize: 19, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif", margin: "0 0 4px", display: "block" }} />
                  <ET tag="p" value={m.role} onChange={v => { const n = [...p.members]; n[i] = { ...n[i], role: v }; onUpdate({ ...p, members: n }); }}
                    style={{ color: "#60a5fa", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", margin: "0 0 2px" }} />
                  <ET tag="p" value={m.dept} onChange={v => { const n = [...p.members]; n[i] = { ...n[i], dept: v }; onUpdate({ ...p, members: n }); }}
                    style={{ color: "#93c5fd", fontSize: 13, fontFamily: "'Inter',sans-serif", margin: "0 0 8px" }} />
                  <ET tag="p" value={m.cred} onChange={v => { const n = [...p.members]; n[i] = { ...n[i], cred: v }; onUpdate({ ...p, members: n }); }}
                    style={{ color: "#bfdbfe", fontSize: 12, fontFamily: "'Inter',sans-serif", margin: 0, lineHeight: 1.5 }} />
                </div>
              </div>
            </AnimBox>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsEventsSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* News */}
        <div style={{ marginBottom: 80 }}>
          <AnimBox type="up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <ET tag="h2" value={p.newsHeading} onChange={v => onUpdate({ ...p, newsHeading: v })}
                style={{ fontSize: 52, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 8px", letterSpacing: "-1.5px", display: "block" }} />
              <ET tag="p" value={p.newsSubtext} onChange={v => onUpdate({ ...p, newsSubtext: v })}
                style={{ fontSize: 17, color: "#64748b", fontFamily: "'Inter',sans-serif", margin: 0 }} />
            </div>
            <button style={{ border: "1.5px solid #e2e8f0", background: "#fff", padding: "9px 18px", borderRadius: 8, color: "#475569", fontSize: 14, cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              View All News <ArrowRight size={16} />
            </button>
          </AnimBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {p.news.map((item, i) => (
              <AnimBox key={item.id} type="up" delay={i * 0.1}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.08)", cursor: "pointer" }}>
                  <div style={{ height: 220, overflow: "hidden", position: "relative" }} className="img-zoom">
                    <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: 16, left: 16, background: "#2563eb", color: "#fff", padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                      <ET value={item.category} onChange={v => { const n = [...p.news]; n[i] = { ...n[i], category: v }; onUpdate({ ...p, news: n }); }} style={{ color: "#fff" }} />
                    </span>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 13, marginBottom: 10, fontFamily: "'Inter',sans-serif" }}>
                      <Calendar size={14} />
                      <ET value={item.date} onChange={v => { const n = [...p.news]; n[i] = { ...n[i], date: v }; onUpdate({ ...p, news: n }); }} />
                    </div>
                    <ET tag="h3" value={item.title} onChange={v => { const n = [...p.news]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, news: n }); }}
                      style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 10px", display: "block", lineHeight: 1.35 }} />
                    <ET tag="p" value={item.excerpt} onChange={v => { const n = [...p.news]; n[i] = { ...n[i], excerpt: v }; onUpdate({ ...p, news: n }); }}
                      style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: 0, fontFamily: "'Inter',sans-serif" }} />
                  </div>
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
        {/* Events */}
        <div>
          <AnimBox type="up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <ET tag="h2" value={p.eventsHeading} onChange={v => onUpdate({ ...p, eventsHeading: v })}
                style={{ fontSize: 52, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 8px", letterSpacing: "-1.5px", display: "block" }} />
              <ET tag="p" value={p.eventsSubtext} onChange={v => onUpdate({ ...p, eventsSubtext: v })}
                style={{ fontSize: 17, color: "#64748b", fontFamily: "'Inter',sans-serif", margin: 0 }} />
            </div>
            <button style={{ border: "1.5px solid #e2e8f0", background: "#fff", padding: "9px 18px", borderRadius: 8, color: "#475569", fontSize: 14, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>View Calendar</button>
          </AnimBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22 }}>
            {p.events.map((ev, i) => (
              <AnimBox key={ev.id} type={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div className="scale-hover" style={{ background: "linear-gradient(135deg,#f8fafc,#eff6ff)", borderRadius: 18, padding: "22px 26px", borderLeft: "4px solid #2563eb" }}>
                  <span style={{ display: "inline-block", padding: "4px 14px", background: g(ev.color), color: "#fff", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 14, fontFamily: "'Inter',sans-serif" }}>
                    <ET value={ev.date} onChange={v => { const n = [...p.events]; n[i] = { ...n[i], date: v }; onUpdate({ ...p, events: n }); }} style={{ color: "#fff" }} />
                  </span>
                  <ET tag="h3" value={ev.title} onChange={v => { const n = [...p.events]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, events: n }); }}
                    style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", display: "block" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#475569", fontFamily: "'Inter',sans-serif" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Clock size={18} style={{ color: "#2563eb" }} /><ET value={ev.time} onChange={v => { const n = [...p.events]; n[i] = { ...n[i], time: v }; onUpdate({ ...p, events: n }); }} /></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={18} style={{ color: "#2563eb" }} /><ET value={ev.location} onChange={v => { const n = [...p.events]; n[i] = { ...n[i], location: v }; onUpdate({ ...p, events: n }); }} /></div>
                  </div>
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function GallerySec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 48, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridAutoRows: "220px", gap: 16 }}>
          {p.images.map((img, i) => (
            <AnimBox key={i} type="scale" delay={i * 0.1}
              style={{ borderRadius: 18, overflow: "hidden", position: "relative", cursor: "pointer", gridRow: img.span === "row-span-2" ? "span 2" : "auto", gridColumn: img.span === "col-span-2" ? "span 2" : "auto" }}
              className="img-zoom">
              <img src={img.url} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7),transparent)", opacity: 0, transition: "opacity .3s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                  <ET tag="h3" value={img.title} onChange={v => { const n = [...p.images]; n[i] = { ...n[i], title: v }; onUpdate({ ...p, images: n }); }}
                    style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display',serif", margin: 0, display: "block" }} />
                </div>
              </div>
            </AnimBox>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtracurricularSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "linear-gradient(135deg,#f8fafc,#fff,#eff6ff)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 52, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1.5px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 720, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {p.activities.map((act, i) => {
            const Icon = ACT_ICONS[i % ACT_ICONS.length];
            return (
              <AnimBox key={i} type="scale" delay={i * 0.05}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,.07)", height: "100%" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 14, background: g(act.color), display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 8px 24px rgba(0,0,0,.13)" }}>
                    <Icon style={{ width: 32, height: 32, color: "#fff" }} />
                  </div>
                  <ET tag="h3" value={act.category} onChange={v => { const n = [...p.activities]; n[i] = { ...n[i], category: v }; onUpdate({ ...p, activities: n }); }}
                    style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", display: "block" }} />
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {act.clubs.map((club, ci) => (
                      <li key={ci} style={{ display: "flex", alignItems: "center", gap: 8, color: "#475569", fontSize: 13, fontFamily: "'Inter',sans-serif" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: g(act.color), flexShrink: 0 }} />{club}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimBox>
            );
          })}
        </div>
        <AnimBox type="up" style={{ marginTop: 60, textAlign: "center", background: "linear-gradient(135deg,#2563eb,#7c3aed,#ec4899)", borderRadius: 28, padding: "48px 40px", color: "#fff" }}>
          <ET tag="h3" value={p.ctaTitle} onChange={v => onUpdate({ ...p, ctaTitle: v })}
            style={{ fontSize: 38, fontWeight: 700, fontFamily: "'Playfair Display',serif", margin: "0 0 14px", display: "block" }} />
          <ET tag="p" value={p.ctaSubtext} onChange={v => onUpdate({ ...p, ctaSubtext: v })}
            style={{ fontSize: 18, color: "#bfdbfe", margin: "0 0 24px", fontFamily: "'Inter',sans-serif", display: "block" }} />
          <div style={{ display: "inline-block", padding: "12px 32px", background: "#fff", color: "#2563eb", borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            <ET value={p.ctaButton} onChange={v => onUpdate({ ...p, ctaButton: v })} style={{ color: "#2563eb" }} />
          </div>
        </AnimBox>
      </div>
    </section>
  );
}

function TestimonialsSec({ props: p, onUpdate }) {
  return (
    <section style={{ padding: "96px 32px", background: "linear-gradient(135deg,#1e3a5f,#0f172a,#312e81)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .1, backgroundImage: "radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize: "40px 40px" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 48, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#93c5fd", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {p.items.map((t, i) => (
            <AnimBox key={i} type="up" delay={i * 0.2}>
              <div className="card-hover" style={{ background: "rgba(255,255,255,.09)", backdropFilter: "blur(12px)", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,.18)", height: "100%" }}>
                <Quote style={{ width: 48, height: 48, color: "#93c5fd", marginBottom: 16 }} />
                <ET tag="p" value={t.text} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], text: v }; onUpdate({ ...p, items: n }); }}
                  style={{ color: "#fff", lineHeight: 1.75, margin: "0 0 22px", fontFamily: "'Inter',sans-serif", fontSize: 15 }} />
                <div style={{ display: "flex", marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 20, height: 20, color: "#fbbf24", fill: "#fbbf24" }} />)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={t.img} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <ET tag="div" value={t.name} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], name: v }; onUpdate({ ...p, items: n }); }}
                      style={{ fontWeight: 700, color: "#fff", fontFamily: "'Inter',sans-serif", display: "block" }} />
                    <ET tag="div" value={t.role} onChange={v => { const n = [...p.items]; n[i] = { ...n[i], role: v }; onUpdate({ ...p, items: n }); }}
                      style={{ color: "#93c5fd", fontSize: 13, fontFamily: "'Inter',sans-serif", display: "block" }} />
                  </div>
                </div>
              </div>
            </AnimBox>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSec({ props: p, onUpdate }) {
  const inp = { background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "12px 14px", fontSize: 14, width: "100%", outline: "none", boxSizing: "border-box", fontFamily: "'Inter',sans-serif", color: "#1e293b" };
  const rows = [{ icon: MapPin, title: "Address", key: "address" }, { icon: Phone, title: "Phone", key: "phone" }, { icon: Mail, title: "Email", key: "email" }, { icon: Clock, title: "Office Hours", key: "hours" }];
  return (
    <section style={{ padding: "96px 32px", background: "linear-gradient(135deg,#f8fafc,#eff6ff)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimBox type="up" style={{ textAlign: "center", marginBottom: 60 }}>
          <ET tag="h2" value={p.heading} onChange={v => onUpdate({ ...p, heading: v })}
            style={{ fontSize: 48, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 14px", letterSpacing: "-1px" }} />
          <ET tag="p" value={p.subtext} onChange={v => onUpdate({ ...p, subtext: v })}
            style={{ fontSize: 19, color: "#64748b", maxWidth: 600, margin: "0 auto", fontFamily: "'Inter',sans-serif" }} />
        </AnimBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <AnimBox type="left">
            <h3 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 28px" }}>Contact Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {rows.map(({ icon: Icon, title, key }, idx) => (
                <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px", borderRadius: 16, background: "rgba(255,255,255,.7)", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.7)"}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 24, height: 24, color: "#fff" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4, fontFamily: "'Inter',sans-serif" }}>{title}</div>
                    <ET tag="div" value={p[key]} onChange={v => onUpdate({ ...p, [key]: v })} style={{ color: "#64748b", fontFamily: "'Inter',sans-serif", fontSize: 14 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 20, height: 200, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin style={{ width: 48, height: 48, color: "#94a3b8" }} />
            </div>
          </AnimBox>
          <AnimBox type="right" style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 8px 32px rgba(0,0,0,.08)" }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", fontFamily: "'Playfair Display',serif", margin: "0 0 24px" }}>Send us a Message</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>First Name</label><input placeholder="John" style={inp} /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Last Name</label><input placeholder="Doe" style={inp} /></div>
              </div>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Email</label><input type="email" placeholder="john.doe@example.com" style={inp} /></div>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" style={inp} /></div>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#475569", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Message</label><textarea placeholder="Tell us how we can help..." rows={5} style={{ ...inp, resize: "vertical" }} /></div>
              <button style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", padding: "15px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Send Message</button>
            </div>
          </AnimBox>
        </div>
      </div>
    </section>
  );
}

function FooterSec({ props: p, onUpdate }) {
  const cols = { "Quick Links": ["About Us","Academics","Admissions","Campus Life","Contact"], "Resources": ["Student Portal","Parent Portal","Faculty Portal","Alumni Network","Career Center"], "Information": ["Academic Calendar","School Policies","News & Events","Employment","Privacy Policy"] };
  return (
    <footer style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f,#0f172a)", padding: "64px 32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <AnimBox type="up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }}>P</span>
              </div>
              <ET tag="span" value={p.schoolName} onChange={v => onUpdate({ ...p, schoolName: v })} style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }} />
            </div>
            <ET tag="p" value={p.desc} onChange={v => onUpdate({ ...p, desc: v })} style={{ color: "#93c5fd", fontSize: 14, lineHeight: 1.75, margin: "0 0 22px", fontFamily: "'Inter',sans-serif", display: "block" }} />
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL.map((Icon, i) => (
                <div key={i} className="social-btn" style={{ width: 38, height: 38, background: "rgba(255,255,255,.09)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .2s" }}>
                  <Icon style={{ width: 18, height: 18, color: "#fff" }} />
                </div>
              ))}
            </div>
          </AnimBox>
          {Object.entries(cols).map(([title, items], si) => (
            <AnimBox key={title} type="up" delay={si * 0.1}>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display',serif", margin: "0 0 18px" }}>{title}</h4>
              {items.map(l => (
                <a key={l} href="#" className="footer-link" style={{ display: "block", color: "#93c5fd", fontSize: 14, textDecoration: "none", fontFamily: "'Inter',sans-serif", marginBottom: 10, transition: "color .2s" }}>{l}</a>
              ))}
            </AnimBox>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(147,197,253,.6)", fontSize: 13, fontFamily: "'Inter',sans-serif" }}>© 2026 {p.schoolName}. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Terms of Service","Privacy Policy","Cookie Policy"].map(l => (
              <a key={l} href="#" className="footer-link" style={{ color: "rgba(147,197,253,.6)", fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── RENDERER MAP ──────────────────────────────────────────────── */
function LoginSec({ props: p, onUpdate }) {
  return (
    <section style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc", padding: 40 }}>
      <div style={{ background: "#fff", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,.05)", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <ET value={p.heading} onChange={v => onUpdate({ ...p, heading: v })} style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "#1e293b", fontFamily: "'Playfair Display',serif" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input placeholder={p.emailPlaceholder} style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: 14 }} readOnly disabled />
          <input placeholder={p.passwordPlaceholder} type="password" style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", fontSize: 14 }} readOnly disabled />
          <button style={{ background: "#2563eb", color: "#fff", padding: "14px", borderRadius: 8, border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background .2s" }}>
             <ET value={p.buttonText} onChange={v => onUpdate({ ...p, buttonText: v })} style={{ background:"transparent", border:"none", color:"inherit" }} />
          </button>
        </div>
      </div>
    </section>
  );
}
const RENDERERS = { navbar: NavbarSec, hero: HeroSec, about: AboutSec, programs: ProgramsSec, achievements: AchievementsSec, admissions: AdmissionsSec, faculty: FacultySec, newevents: NewsEventsSec, gallery: GallerySec, extracurricular: ExtracurricularSec, testimonials: TestimonialsSec, contact: ContactSec, footer: FooterSec, login: LoginSec };

/* ─── SECTION WRAPPER ───────────────────────────────────────────── */
function SectionWrap({ section, selected, onSelect, onUpdate, onDelete, index, reorderSection }) {
  const [hov, setHov] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);
  const Comp = RENDERERS[section.type];
  if (!Comp) return null;
  return (
    <div onClick={e => { e.stopPropagation(); onSelect(section.id); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      draggable={dragEnabled}
      onDragStart={e => e.dataTransfer.setData("text/plain", index)}
      onDragEnd={() => setDragEnabled(false)}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); const from = parseInt(e.dataTransfer.getData("text/plain"), 10); reorderSection(from, index); setDragEnabled(false); }}
      style={{ position: "relative", outline: selected ? "2px solid #2563eb" : hov ? "2px solid rgba(37,99,235,.35)" : "none", outlineOffset: -2, transition: "outline .1s" }}>
      {(selected || hov) && (
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 50, display: "flex", gap: 4 }}>
          <div 
            onMouseDown={() => setDragEnabled(true)}
            onMouseUp={() => setDragEnabled(false)}
            onMouseLeave={() => setDragEnabled(false)}
            style={{ background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)",color:"#e2e8f0",padding:"4px 8px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"grab",display:"flex",alignItems:"center" }}>
            ⋮⋮ Drag
          </div>
          <TB icon={<X size={14}/>} onClick={e => { e.stopPropagation(); onDelete(section.id); }} danger />
        </div>
      )}
      {selected && <div style={{ position: "absolute", top: 10, left: 10, zIndex: 50, background: "#2563eb", color: "#fff", padding: "2px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700 }}>{META[section.type]?.label}</div>}
      <div id={`section-${section.type}`} style={{ pointerEvents: dragEnabled ? "none" : "auto" }}>
        <Comp props={section.props} onUpdate={np => onUpdate(section.id, np)} />
      </div>
    </div>
  );
}
function TB({ icon, onClick, danger }) {
  return (
    <button onClick={onClick} style={{ background: "rgba(0,0,0,.75)", backdropFilter: "blur(4px)", border: "none", color: danger ? "#f87171" : "#e2e8f0", width: 28, height: 28, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
  );
}
/* ─── UI COMPONENTS ─────────────────────────────────────────────── */
function PG({ label, children }) {
  return <div style={{ marginBottom:16 }}><div style={{ color:"#374151",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:7 }}>{label}</div><div style={{ display:"flex",flexDirection:"column",gap:6 }}>{children}</div></div>;
}
function TP({ label, value, onChange }) {
  return <div><div style={{ color:"#4b5563",fontSize:10,marginBottom:3 }}>{label}</div><input value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%",background:"#1a1a24",border:"1px solid #1e1e2a",color:"#e2e8f0",borderRadius:6,padding:"6px 8px",fontSize:11,outline:"none",boxSizing:"border-box" }} /></div>;
}
function ImageUpload({ label, value, onChange }) {
  const handleFile = e => { const f=e.target.files[0]; if(f) { const r=new FileReader(); r.onload=ev=>onChange(ev.target.result); r.readAsDataURL(f); } };
  return <div style={{ marginBottom:8 }}><div style={{ color:"#4b5563",fontSize:10,marginBottom:3 }}>{label}</div><div style={{ display:"flex",gap:6 }}><input value={value} onChange={e=>onChange(e.target.value)} placeholder="URL or Browse..." style={{ flex:1,background:"#1a1a24",border:"1px solid #1e1e2a",color:"#e2e8f0",borderRadius:6,padding:"6px 8px",fontSize:11,outline:"none",boxSizing:"border-box" }} /><label style={{ background:"#2563eb",color:"#fff",padding:"6px 12px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",whiteSpace:"nowrap",flexShrink:0 }}>Upload<input type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }} /></label></div></div>;
}

/* ─── CMS PANEL ─────────────────────────────────────────────────── */
function CMSPanel({ sections, onUpdateSections }) {
  const [tab, setTab] = useState("news");
  const [open, setOpen] = useState(null);
  const neSec = sections.find(s => s.type === "newevents");
  const fs = { background: "#0a0a0c", border: "1px solid #1e1e2a", color: "#e2e8f0", borderRadius: 5, padding: "5px 8px", fontSize: 11, width: "100%", outline: "none", boxSizing: "border-box" };
  const updNE = (key, items) => onUpdateSections(sections.map(s => s.type === "newevents" ? { ...s, props: { ...s.props, [key]: items } } : s));
  const addNews = () => { const id = uid(); updNE("news", [...(neSec?.props?.news||[]), { id, title:"New Article", category:"Achievement", date:"Today", img:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600", excerpt:"Describe the story here." }]); setOpen(id); };
  const addEv   = () => { const id = uid(); updNE("events", [...(neSec?.props?.events||[]), { id, title:"New Event", date:"Date", time:"Time", location:"Location", color:"from-blue-500 to-blue-600" }]); setOpen(id); };
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {[["news","📰","News"],["events","📅","Events"]].map(([t,ic,lb]) => (
          <button key={t} onClick={() => setTab(t)} style={{ flex:1, background:tab===t?"#1e1e3a":"#1a1a24", border:`1px solid ${tab===t?"rgba(37,99,235,.2)":"#1e1e2a"}`, color:tab===t?"#60a5fa":"#64748b", padding:"6px 4px", borderRadius:6, fontSize:10, fontWeight:700, textTransform:"uppercase", cursor:"pointer" }}>{ic} {lb}</button>
        ))}
      </div>
      {!neSec && <p style={{ color:"#475569",fontSize:12 }}>Add a News & Events section first.</p>}
      {neSec && tab==="news" && <>
        <button onClick={addNews} style={{ width:"100%",background:"transparent",border:"1px dashed rgba(37,99,235,.3)",color:"#60a5fa",padding:"8px",borderRadius:8,fontSize:12,cursor:"pointer",marginBottom:8,fontWeight:600 }}>+ Add News Article</button>
        {neSec.props.news.map((item,i)=>(
          <div key={item.id} style={{ background:"#1a1a24",border:`1px solid ${open===item.id?"rgba(37,99,235,.2)":"#1e1e2a"}`,borderRadius:8,marginBottom:6,overflow:"hidden" }}>
            <div style={{ padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer" }} onClick={()=>setOpen(open===item.id?null:item.id)}>
              <span style={{ color:"#c4c4d4",fontSize:11,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:140 }}>{item.title}</span>
              <div style={{ display:"flex",gap:4 }}>
                <span style={{ color:"#475569",fontSize:11 }}>{open===item.id?"▲":"▼"}</span>
                <button onClick={e=>{e.stopPropagation();updNE("news",neSec.props.news.filter(x=>x.id!==item.id));if(open===item.id)setOpen(null);}} style={{ background:"none",border:"none",color:"#f87171",cursor:"pointer",fontSize:12,padding:0 }}>✕</button>
              </div>
            </div>
            {open===item.id && <div style={{ padding:"8px 10px",borderTop:"1px solid #1e1e2a",display:"flex",flexDirection:"column",gap:5 }}>
              {[["title","Title"],["category","Category"],["date","Date"]].map(([k,lb])=>(
                <div key={k}><div style={{ color:"#475569",fontSize:10,marginBottom:2 }}>{lb}</div><input value={item[k]} onChange={e=>{const n=[...neSec.props.news];n[i]={...n[i],[k]:e.target.value};updNE("news",n);}} style={fs} /></div>
              ))}
              <div style={{marginTop:4}}><ImageUpload label="Cover Image" value={item.img||""} onChange={v=>{const n=[...neSec.props.news];n[i]={...n[i],img:v};updNE("news",n);}} /></div>
              <div><div style={{ color:"#475569",fontSize:10,marginBottom:2 }}>Excerpt</div><textarea value={item.excerpt} rows={2} onChange={e=>{const n=[...neSec.props.news];n[i]={...n[i],excerpt:e.target.value};updNE("news",n);}} style={{...fs,resize:"vertical"}} /></div>
            </div>}
          </div>
        ))}
      </>}
      {neSec && tab==="events" && <>
        <button onClick={addEv} style={{ width:"100%",background:"transparent",border:"1px dashed rgba(37,99,235,.3)",color:"#60a5fa",padding:"8px",borderRadius:8,fontSize:12,cursor:"pointer",marginBottom:8,fontWeight:600 }}>+ Add Event</button>
        {neSec.props.events.map((item,i)=>(
          <div key={item.id} style={{ background:"#1a1a24",border:`1px solid ${open===item.id?"rgba(37,99,235,.2)":"#1e1e2a"}`,borderRadius:8,marginBottom:6,overflow:"hidden" }}>
            <div style={{ padding:"8px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer" }} onClick={()=>setOpen(open===item.id?null:item.id)}>
              <span style={{ color:"#c4c4d4",fontSize:11,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:140 }}>{item.title}</span>
              <div style={{ display:"flex",gap:4 }}>
                <span style={{ color:"#475569",fontSize:11 }}>{open===item.id?"▲":"▼"}</span>
                <button onClick={e=>{e.stopPropagation();updNE("events",neSec.props.events.filter(x=>x.id!==item.id));if(open===item.id)setOpen(null);}} style={{ background:"none",border:"none",color:"#f87171",cursor:"pointer",fontSize:12,padding:0 }}>✕</button>
              </div>
            </div>
            {open===item.id && <div style={{ padding:"8px 10px",borderTop:"1px solid #1e1e2a",display:"flex",flexDirection:"column",gap:5 }}>
              {[["title","Title"],["date","Date"],["time","Time"],["location","Location"]].map(([k,lb])=>(
                <div key={k}><div style={{ color:"#475569",fontSize:10,marginBottom:2 }}>{lb}</div><input value={item[k]} onChange={e=>{const n=[...neSec.props.events];n[i]={...n[i],[k]:e.target.value};updNE("events",n);}} style={fs} /></div>
              ))}
            </div>}
          </div>
        ))}
      </>}
    </div>
  );
}

/* ─── RIGHT PANEL ───────────────────────────────────────────────── */
function RightPanel({ section, onUpdate }) {
  if (!section) return (
    <div style={{ width:236,background:"#0d0d11",borderLeft:"1px solid #1a1a22",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,gap:10,flexShrink:0 }}>
      <div style={{ fontSize:28,opacity:.2 }}>◈</div>
      <div style={{ color:"#334155",fontSize:12,textAlign:"center",lineHeight:1.6 }}>Select any section on the canvas to edit its properties</div>
    </div>
  );
  const u = np => onUpdate(section.id, np);
  const p = section.props;
  return (
    <div style={{ width:236,background:"#0d0d11",borderLeft:"1px solid #1a1a22",overflow:"auto",flexShrink:0 }}>
      <div style={{ padding:"14px 14px 10px",borderBottom:"1px solid #1a1a22" }}>
        <div style={{ color:"#60a5fa",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:3 }}>{META[section.type]?.label}</div>
        <div style={{ color:"#334155",fontSize:11 }}>Section Properties</div>
      </div>
      <div style={{ padding:12 }}>
        {section.type==="navbar"&&<PG label="BRANDING"><TP label="School Name" value={p.schoolName} onChange={v=>u({...p,schoolName:v})} /><ImageUpload label="Logo URL or Image" value={p.logoImage||""} onChange={v=>u({...p,logoImage:v})} /><TP label="Logo Letter" value={p.logoLetter} onChange={v=>u({...p,logoLetter:v})} /><TP label="Login Button" value={p.loginText} onChange={v=>u({...p,loginText:v})} /></PG>}
        {section.type==="hero"&&<><PG label="CONTENT"><TP label="Headline" value={p.headline} onChange={v=>u({...p,headline:v})} /><TP label="Tagline" value={p.tagline} onChange={v=>u({...p,tagline:v})} /><TP label="Description" value={p.description} onChange={v=>u({...p,description:v})} /><TP label="Primary CTA" value={p.primaryCta} onChange={v=>u({...p,primaryCta:v})} /><TP label="Secondary CTA" value={p.secondaryCta} onChange={v=>u({...p,secondaryCta:v})} /></PG><PG label="BG IMAGE URL"><ImageUpload label="URL or Upload" value={p.bgImage} onChange={v=>u({...p,bgImage:v})} /></PG></>}
        {section.type==="about"&&<><PG label="CONTENT"><TP label="Heading" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Paragraph 1" value={p.para1} onChange={v=>u({...p,para1:v})} /><TP label="Paragraph 2" value={p.para2} onChange={v=>u({...p,para2:v})} /></PG><PG label="IMAGE URL"><ImageUpload label="URL or Upload" value={p.image} onChange={v=>u({...p,image:v})} /></PG></>}
        {section.type==="login"&&<PG label="LOGIN FORM"><TP label="Heading" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Email Placeholder" value={p.emailPlaceholder} onChange={v=>u({...p,emailPlaceholder:v})} /><TP label="Password Placeholder" value={p.passwordPlaceholder} onChange={v=>u({...p,passwordPlaceholder:v})} /><TP label="Button Text" value={p.buttonText} onChange={v=>u({...p,buttonText:v})} /></PG>}
        {["programs","achievements","extracurricular"].includes(section.type)&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><div style={{ color:"#334155",fontSize:11,lineHeight:1.5 }}>💡 Double-click text on canvas to edit inline.</div></>}
        {section.type==="faculty"&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><PG label="FACULTY PHOTOS">{p.members.map((m, i) => (<ImageUpload key={i} label={m.name || `Member ${i+1}`} value={m.img||""} onChange={v=>{ const nm = [...p.members]; nm[i]={...nm[i], img:v}; u({...p, members: nm}); }} />))}</PG><div style={{ color:"#334155",fontSize:11,lineHeight:1.5 }}>💡 Double-click text on canvas to edit inline.</div></>}
        {section.type==="testimonials"&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><PG label="AUTHOR PHOTOS">{p.items.map((t, i) => (<ImageUpload key={i} label={t.name || `Person ${i+1}`} value={t.img||""} onChange={v=>{ const nm = [...p.items]; nm[i]={...nm[i], img:v}; u({...p, items: nm}); }} />))}</PG><div style={{ color:"#334155",fontSize:11,lineHeight:1.5 }}>💡 Double-click text on canvas to edit inline.</div></>}
        {section.type==="gallery"&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><PG label="GALLERY IMAGES">{p.images.map((img, i) => (<ImageUpload key={i} label={img.title || `Image ${i+1}`} value={img.url||""} onChange={v=>{ const nm = [...p.images]; nm[i]={...nm[i], url:v}; u({...p, images: nm}); }} />))}</PG><div style={{ color:"#334155",fontSize:11,lineHeight:1.5 }}>💡 Double-click text on canvas to edit inline.</div></>}
        {section.type==="admissions"&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><PG label="CTA BANNER"><TP label="Title" value={p.ctaTitle} onChange={v=>u({...p,ctaTitle:v})} /><TP label="Subtext" value={p.ctaSubtext} onChange={v=>u({...p,ctaSubtext:v})} /><TP label="Button" value={p.ctaButton} onChange={v=>u({...p,ctaButton:v})} /></PG></>}
        {section.type==="newevents"&&<><PG label="NEWS"><TP label="Heading" value={p.newsHeading} onChange={v=>u({...p,newsHeading:v})} /><TP label="Subtext" value={p.newsSubtext} onChange={v=>u({...p,newsSubtext:v})} /></PG><PG label="EVENTS"><TP label="Heading" value={p.eventsHeading} onChange={v=>u({...p,eventsHeading:v})} /><TP label="Subtext" value={p.eventsSubtext} onChange={v=>u({...p,eventsSubtext:v})} /></PG><div style={{ color:"#334155",fontSize:11 }}>Manage items in the CMS tab →</div></>}
        {section.type==="contact"&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><PG label="CONTACT INFO"><TP label="Address" value={p.address} onChange={v=>u({...p,address:v})} /><TP label="Phone" value={p.phone} onChange={v=>u({...p,phone:v})} /><TP label="Email" value={p.email} onChange={v=>u({...p,email:v})} /><TP label="Hours" value={p.hours} onChange={v=>u({...p,hours:v})} /></PG></>}
        {section.type==="footer"&&<PG label="SCHOOL INFO"><TP label="School Name" value={p.schoolName} onChange={v=>u({...p,schoolName:v})} /><TP label="Description" value={p.desc} onChange={v=>u({...p,desc:v})} /><TP label="Address" value={p.address} onChange={v=>u({...p,address:v})} /><TP label="Phone" value={p.phone} onChange={v=>u({...p,phone:v})} /><TP label="Email" value={p.email} onChange={v=>u({...p,email:v})} /></PG>}
        <div style={{ marginTop:16,paddingTop:16,borderTop:"1px solid #1a1a22" }}>
          <button onClick={()=>onUpdate(section.id,null)} style={{ background:"rgba(127,29,29,.1)",color:"#f87171",border:"1px solid rgba(127,29,29,.27)",width:"100%",padding:"8px",borderRadius:6,fontSize:11,cursor:"pointer",fontWeight:600 }}>🗑 Remove Section</button>
        </div>
      </div>
    </div>
  );
}

/* ─── LEFT PANEL ────────────────────────────────────────────────── */
function LeftPanel({ sections, selectedId, leftTab, setLeftTab, onAddSection, onSelectSection, onUpdateSections }) {
  return (
    <div style={{ width:232,background:"#0d0d11",borderRight:"1px solid #1a1a22",display:"flex",flexDirection:"column",flexShrink:0 }}>
      <div style={{ display:"flex",borderBottom:"1px solid #1a1a22",flexShrink:0 }}>
        {[["components","⊞","Add"],["layers","◈","Layers"],["cms","📋","CMS"]].map(([t,ic,lb])=>(
          <button key={t} onClick={()=>setLeftTab(t)} style={{ flex:1,background:"transparent",border:"none",borderBottom:`2px solid ${leftTab===t?"#2563eb":"transparent"}`,color:leftTab===t?"#60a5fa":"#334155",padding:"10px 2px 9px",fontSize:9,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"color .15s" }}>
            <span style={{ fontSize:13 }}>{ic}</span><span>{lb}</span>
          </button>
        ))}
      </div>
      <div style={{ flex:1,overflow:"auto",padding:12 }}>
        {leftTab==="components"&&<>
          <div style={{ color:"#1e2a3a",fontSize:9,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8 }}>DS Public School</div>
          <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
            {Object.entries(META).map(([type,info])=>(
              <button key={type} onClick={()=>onAddSection(type)}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#2563eb";e.currentTarget.style.background="#1e2a3e";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a22";e.currentTarget.style.background="#161620";}}
                style={{ background:"#161620",border:"1px solid #1a1a22",color:"#8892a4",padding:"9px 10px",borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",gap:9,textAlign:"left",transition:"all .12s" }}>
                <span style={{ fontSize:16 }}>{info.icon}</span>
                <div><div style={{ fontSize:11,fontWeight:600,color:"#c4c4d4" }}>{info.label}</div><div style={{ fontSize:10,color:"#334155" }}>{info.desc}</div></div>
                <span style={{ marginLeft:"auto",color:"#2563eb",fontSize:14,fontWeight:700 }}>+</span>
              </button>
            ))}
          </div>
        </>}
        {leftTab==="layers"&&<>
          <div style={{ color:"#1e2a3a",fontSize:9,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8 }}>Page Layers</div>
          <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
            {sections.map((s,i)=>(
              <div key={s.id} onClick={()=>onSelectSection(s.id)} style={{ background:selectedId===s.id?"#1e2a3e":"#161620",border:`1px solid ${selectedId===s.id?"rgba(37,99,235,.2)":"#1a1a22"}`,color:selectedId===s.id?"#60a5fa":"#64748b",padding:"7px 10px",borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:11 }}>
                <span style={{ fontSize:12 }}>{META[s.type]?.icon}</span>
                <span>{META[s.type]?.label}</span>
                <span style={{ marginLeft:"auto",color:"#1e2a3a",fontSize:9,fontWeight:600 }}>#{i+1}</span>
              </div>
            ))}
          </div>
        </>}
        {leftTab==="cms"&&<CMSPanel sections={sections} onUpdateSections={onUpdateSections} />}
      </div>
      <div style={{ padding:"10px 12px",borderTop:"1px solid #1a1a22",background:"#0a0a0c" }}>
        <div style={{ color:"#1e3a5f",fontSize:10,lineHeight:1.5 }}>💡 <strong style={{ color:"#334155" }}>Double-click</strong> any text on canvas to edit inline</div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────── */
const INIT_LOGIN = [
  { id: uid(), type: "navbar", props: { ...NEW_DEF.navbar } },
  { id: uid(), type: "login", props: { ...NEW_DEF.login } },
  { id: uid(), type: "footer", props: { ...NEW_DEF.footer } }
];

export default function SchoolBuilder() {
  const [pages,       setPages]       = useState({ home: INIT, login: INIT_LOGIN });
  const [activePage,  setActivePage]  = useState("home");
  const [selectedId,  setSelectedId]  = useState(null);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [leftTab,     setLeftTab]     = useState("components");
  const [history,     setHistory]     = useState([{pages: {home: INIT, login: INIT_LOGIN}, activePage: "home"}]);
  const [histIdx,     setHistIdx]     = useState(0);
  const [modal,       setModal]       = useState(null);
  const [isFullScreen,setIsFullScreen]= useState(false);

  useEffect(() => { window.setActivePage = setActivePage; }, []);

  const sections = pages[activePage];
  const setSections = n => { 
    const np = {...pages, [activePage]: n}; 
    setPages(np); 
    pushHist(np, activePage); 
  };
  
  const pushHist = (p, a) => { const h = history.slice(0,histIdx+1).concat([{pages: p, activePage: a}]); setHistory(h); setHistIdx(h.length-1); };
  const undo = () => { if (histIdx>0) { setHistIdx(histIdx-1); setPages(history[histIdx-1].pages); setActivePage(history[histIdx-1].activePage); } };
  const redo = () => { if (histIdx<history.length-1) { setHistIdx(histIdx+1); setPages(history[histIdx+1].pages); setActivePage(history[histIdx+1].activePage); } };
  
  const updateSection = (id, np) => {
    const n = np===null ? sections.filter(s=>s.id!==id) : sections.map(s=>s.id===id?{...s,props:np}:s);
    if(np===null) setSelectedId(null);
    const npages = {...pages, [activePage]: n}; 
    setPages(npages); pushHist(npages, activePage);
  };
  const addSection = type => { const sec={id:uid(),type,props:{...NEW_DEF[type]}}; const n=[...sections,sec]; setSelectedId(sec.id); const npages={...pages,[activePage]:n}; setPages(npages); pushHist(npages, activePage); };
  const reorderSection = (from, to) => {
    if(from===to || isNaN(from) || isNaN(to)) return;
    const n=[...sections]; const [rm]=n.splice(from,1); n.splice(to,0,rm);
    const npages={...pages,[activePage]:n}; setPages(npages); pushHist(npages, activePage);
  };
  const sel = sections.find(s=>s.id===selectedId)||null;
  const CW  = { desktop:"100%", tablet:"768px", mobile:"390px" };

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100vh",background:"#0a0a0c",fontFamily:"'Inter',-apple-system,sans-serif",overflow:"hidden",color:"#e2e8f0" }}>
      <style>{CSS}</style>

      {/* TOP BAR */}
      {!isFullScreen && (
        <div style={{ height:50,background:"#0a0a0c",borderBottom:"1px solid #1a1a22",display:"flex",alignItems:"center",padding:"0 14px",gap:10,flexShrink:0,zIndex:100 }}>
          <div style={{ display:"flex",alignItems:"center",gap:7,marginRight:4 }}>
            <div style={{ width:26,height:26,background:"linear-gradient(135deg,#2563eb,#7c3aed)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>🏫</div>
            <span style={{ fontWeight:800,fontSize:14,letterSpacing:"-.4px",color:"#e2e8f0" }}>SchoolCraft</span>
            <span style={{ background:"rgba(37,99,235,.15)",color:"#60a5fa",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:100 }}>BUILDER</span>
          </div>
          <div style={{ width:1,height:22,background:"#1a1a22" }} />
          <select value={activePage} onChange={e => { setActivePage(e.target.value); setSelectedId(null); }} style={{ background:"#161620",border:"1px solid #1a1a22",color:"#60a5fa",padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",outline:"none" }}>
            <option value="home">● Home Page</option>
            <option value="login">● Login Page</option>
          </select>
          <div style={{ flex:1 }} />
          <div style={{ display:"flex",background:"#161620",borderRadius:7,padding:3,gap:2,border:"1px solid #1a1a22" }}>
            {[["desktop","🖥","Desktop"],["tablet","⬜","Tablet"],["mobile","📱","Mobile"]].map(([mode,ic,lb])=>(
              <button key={mode} onClick={()=>setPreviewMode(mode)} title={lb}
                style={{ background:previewMode===mode?"#2d2d3e":"transparent",border:"none",color:previewMode===mode?"#60a5fa":"#334155",padding:"4px 10px",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:previewMode===mode?700:400 }}>{ic}</button>
            ))}
            <button onClick={()=>setIsFullScreen(true)} title="Full Screen" style={{ background:"transparent",border:"none",color:"#334155",padding:"4px 10px",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:400 }}>⛶</button>
          </div>
          <div style={{ width:1,height:22,background:"#1a1a22" }} />
          <button onClick={undo} disabled={histIdx===0} style={{ background:"transparent",border:"none",color:histIdx===0?"#1e2a3a":"#64748b",cursor:histIdx===0?"default":"pointer",fontSize:16,padding:"4px 7px",borderRadius:5 }}>↩</button>
          <button onClick={redo} disabled={histIdx===history.length-1} style={{ background:"transparent",border:"none",color:histIdx===history.length-1?"#1e2a3a":"#64748b",cursor:histIdx===history.length-1?"default":"pointer",fontSize:16,padding:"4px 7px",borderRadius:5 }}>↪</button>
          <div style={{ width:1,height:22,background:"#1a1a22" }} />
          <button style={{ background:"transparent",border:"1px solid #1a1a22",color:"#64748b",padding:"5px 12px",borderRadius:6,fontSize:12,cursor:"pointer" }}>💾 Save</button>
          <button onClick={()=>setModal("publish")} style={{ background:"linear-gradient(135deg,#2563eb,#7c3aed)",border:"none",color:"#fff",padding:"6px 16px",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 0 16px rgba(37,99,235,.4)" }}>🚀 Publish</button>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex:1,display:"flex",overflow:"hidden" }}>
        {!isFullScreen && <LeftPanel sections={sections} selectedId={selectedId} leftTab={leftTab} setLeftTab={setLeftTab}
          onAddSection={addSection} onSelectSection={setSelectedId}
          onUpdateSections={n=>{setSections(n);pushHist(n);}} />}

        {/* CANVAS */}
        <div data-canvas style={{ flex:1,overflow:"auto",background:isFullScreen||previewMode==="desktop"?"#fff":"#111116",display:"flex",flexDirection:"column",padding:isFullScreen||previewMode==="desktop"?0:20 }}
          onClick={()=>setSelectedId(null)}>
          {!isFullScreen && previewMode!=="desktop" && (
            <div style={{ display:"flex",justifyContent:"center",marginBottom:14,alignSelf:"stretch" }}>
              <div style={{ background:"#161620",border:"1px solid #1a1a22",borderRadius:6,padding:"5px 12px",display:"flex",gap:10,alignItems:"center",fontSize:11,color:"#334155" }}>
                <span style={{ color:"#2563eb" }}>💡</span>
                <span>Double-click any text to edit inline</span>
                <span style={{ color:"#1a1a22" }}>|</span>
                <span>Click section to select</span>
                <span style={{ color:"#1a1a22" }}>|</span>
                <span style={{ color:"#64748b" }}>{sections.length} sections · {previewMode}</span>
              </div>
            </div>
          )}
          <div onClick={e=>e.stopPropagation()}
            style={{ margin:"0 auto",width:isFullScreen?"100%":CW[previewMode],maxWidth:isFullScreen?"none":CW[previewMode],minWidth:previewMode==="mobile"?"390px":"280px",background:"#fff",borderRadius:isFullScreen||previewMode==="desktop"?0:"8px 8px 0 0",overflowX:"clip",overflowY:"visible",boxShadow:isFullScreen||previewMode==="desktop"?"none":"0 24px 64px rgba(0,0,0,.6),0 0 0 1px #1e1e2a",transition:"width .3s cubic-bezier(.4,0,.2,1)",minHeight:400 }}>
            {!isFullScreen && previewMode!=="desktop" && (
              <div style={{ background:"#1a1a22",height:34,display:"flex",alignItems:"center",padding:"0 12px",gap:6,borderBottom:"1px solid #1e1e2a" }}>
                <div style={{ display:"flex",gap:5 }}>
                  {["#f87171","#fbbf24","#34d399"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }} />)}
                </div>
                <div style={{ flex:1,background:"#111116",borderRadius:4,padding:"4px 10px",fontSize:11,color:"#475569",textAlign:"center",marginLeft:8 }}>dspublicschool.edu</div>
              </div>
            )}
            {sections.map((s,i)=>(
              <SectionWrap key={s.id} section={s} selected={selectedId===s.id} index={i}
                onSelect={setSelectedId} onUpdate={updateSection}
                onDelete={id=>updateSection(id,null)} reorderSection={reorderSection} />
            ))}
          </div>
        </div>

        {!isFullScreen && <RightPanel section={sel} onUpdate={updateSection} />}
      </div>

      {isFullScreen && (
        <button onClick={()=>{setIsFullScreen(false);setPreviewMode("desktop");}} style={{position:"fixed",bottom:24,right:24,background:"#0f172a",border:"1px solid #334155",color:"#fff",padding:"10px 18px",borderRadius:100,cursor:"pointer",boxShadow:"0 8px 24px rgba(0,0,0,.4)",zIndex:9999,fontWeight:600,fontSize:14}}>
          Exit Full Screen
        </button>
      )}

      {/* PUBLISH MODAL */}
      {modal&&(
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)" }}
          onClick={()=>{if(modal!=="published")setModal(null);}}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#0f0f13",border:"1px solid #1a1a22",borderRadius:16,padding:36,width:360,textAlign:"center",boxShadow:"0 32px 80px rgba(0,0,0,.6)" }}>
            {modal==="published"?<>
              <div style={{ fontSize:52,marginBottom:16 }}>🎉</div>
              <div style={{ color:"#e2e8f0",fontSize:22,fontWeight:900,marginBottom:8 }}>Site is Live!</div>
              <div style={{ color:"#475569",fontSize:13,marginBottom:22 }}>Your DS Public School website is published.</div>
              <div style={{ background:"#161620",border:"1px solid rgba(37,99,235,.3)",borderRadius:8,padding:"10px 14px",color:"#60a5fa",fontSize:13,fontWeight:600,marginBottom:22 }}>🌐 dspublicschool.edu</div>
              <button onClick={()=>setModal(null)} style={{ background:"linear-gradient(135deg,#2563eb,#7c3aed)",border:"none",color:"#fff",padding:"10px 28px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700 }}>Back to Editor</button>
            </>:<>
              <div style={{ fontSize:52,marginBottom:16 }}>🚀</div>
              <div style={{ color:"#e2e8f0",fontSize:22,fontWeight:900,marginBottom:8 }}>Ready to Publish?</div>
              <div style={{ color:"#475569",fontSize:13,marginBottom:22,lineHeight:1.6 }}>All {sections.length} sections will go live instantly.</div>
              <div style={{ background:"#161620",border:"1px solid #1a1a22",borderRadius:8,padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
                <span style={{ color:"#475569",fontSize:12 }}>URL</span>
                <span style={{ color:"#60a5fa",fontSize:12,fontWeight:600 }}>dspublicschool.edu</span>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <button onClick={()=>setModal(null)} style={{ flex:1,background:"#161620",border:"1px solid #1a1a22",color:"#94a3b8",padding:10,borderRadius:8,cursor:"pointer",fontSize:12 }}>Cancel</button>
                <button onClick={()=>setModal("published")} style={{ flex:2,background:"linear-gradient(135deg,#2563eb,#7c3aed)",border:"none",color:"#fff",padding:10,borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700,boxShadow:"0 0 20px rgba(37,99,235,.4)" }}>🚀 Publish Now</button>
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
