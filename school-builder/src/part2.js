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
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: scrolled ? "#2563eb" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>
            <ET value={p.logoLetter} onChange={v => onUpdate({ ...p, logoLetter: v })}
              style={{ fontSize: 22, fontWeight: 700, color: scrolled ? "#fff" : "#2563eb", fontFamily: "'Playfair Display',serif", transition: "color .3s" }} />
          </div>
          <ET value={p.schoolName} onChange={v => onUpdate({ ...p, schoolName: v })}
            style={{ fontSize: 22, fontWeight: 700, color: scrolled ? "#1e293b" : "#fff", fontFamily: "'Playfair Display',serif", transition: "color .3s" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {p.links.map((l, i) => (
            <a key={i} href="#" className="nav-link"
              style={{ color: scrolled ? "#475569" : "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", textDecoration: "none", fontFamily: "'Inter',sans-serif", animationDelay: `${i * 0.1}s`, animation: "fadeUp .5s ease both" }}>
              {l}
            </a>
          ))}
          <button style={{ background: scrolled ? "#2563eb" : "#fff", color: scrolled ? "#fff" : "#2563eb", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all .3s" }}>
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
