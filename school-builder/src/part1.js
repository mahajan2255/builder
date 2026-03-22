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
::-webkit-scrollbar-thumb{background:#1e1e2a;border-radius:3px;}

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
  const cls = vis ? \`anim-\${type}\` : "";
  return (
    <div ref={ref} className={\`\${cls} \${className}\`}
      style={{ opacity: vis ? undefined : 0, animationDelay: \`\${delay}s\`, ...style }}>
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
};
