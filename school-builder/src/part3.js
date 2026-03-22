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
const RENDERERS = { navbar: NavbarSec, hero: HeroSec, about: AboutSec, programs: ProgramsSec, achievements: AchievementsSec, admissions: AdmissionsSec, faculty: FacultySec, newevents: NewsEventsSec, gallery: GallerySec, extracurricular: ExtracurricularSec, testimonials: TestimonialsSec, contact: ContactSec, footer: FooterSec };

/* ─── SECTION WRAPPER ───────────────────────────────────────────── */
function SectionWrap({ section, selected, onSelect, onUpdate, onDelete, onMove, canUp, canDown }) {
  const [hov, setHov] = useState(false);
  const Comp = RENDERERS[section.type];
  if (!Comp) return null;
  return (
    <div onClick={e => { e.stopPropagation(); onSelect(section.id); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", outline: selected ? "2px solid #2563eb" : hov ? "2px solid rgba(37,99,235,.35)" : "none", outlineOffset: -2, transition: "outline .1s" }}>
      {(selected || hov) && (
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 50, display: "flex", gap: 4 }}>
          {canUp   && <TB icon={<ChevronUp size={14}/>}  onClick={e => { e.stopPropagation(); onMove(section.id, "up"); }} />}
          {canDown && <TB icon={<ChevronDown size={14}/>} onClick={e => { e.stopPropagation(); onMove(section.id, "dn"); }} />}
          <TB icon={<X size={14}/>} onClick={e => { e.stopPropagation(); onDelete(section.id); }} danger />
        </div>
      )}
      {selected && <div style={{ position: "absolute", top: 10, left: 10, zIndex: 50, background: "#2563eb", color: "#fff", padding: "2px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700 }}>{META[section.type]?.label}</div>}
      <Comp props={section.props} onUpdate={np => onUpdate(section.id, np)} />
    </div>
  );
}
function TB({ icon, onClick, danger }) {
  return (
    <button onClick={onClick} style={{ background: "rgba(0,0,0,.75)", backdropFilter: "blur(4px)", border: "none", color: danger ? "#f87171" : "#e2e8f0", width: 28, height: 28, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
  );
}

