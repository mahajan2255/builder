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
