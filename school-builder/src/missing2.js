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
