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
function PG({ label, children }) {
  return <div style={{ marginBottom:16 }}><div style={{ color:"#374151",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:7 }}>{label}</div><div style={{ display:"flex",flexDirection:"column",gap:6 }}>{children}</div></div>;
}
function TP({ label, value, onChange }) {
  return <div><div style={{ color:"#4b5563",fontSize:10,marginBottom:3 }}>{label}</div><input value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%",background:"#1a1a24",border:"1px solid #1e1e2a",color:"#e2e8f0",borderRadius:6,padding:"6px 8px",fontSize:11,outline:"none",boxSizing:"border-box" }} /></div>;
}
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
        {section.type==="navbar"&&<PG label="BRANDING"><TP label="School Name" value={p.schoolName} onChange={v=>u({...p,schoolName:v})} /><TP label="Logo Letter" value={p.logoLetter} onChange={v=>u({...p,logoLetter:v})} /><TP label="Login Button" value={p.loginText} onChange={v=>u({...p,loginText:v})} /></PG>}
        {section.type==="hero"&&<><PG label="CONTENT"><TP label="Headline" value={p.headline} onChange={v=>u({...p,headline:v})} /><TP label="Tagline" value={p.tagline} onChange={v=>u({...p,tagline:v})} /><TP label="Description" value={p.description} onChange={v=>u({...p,description:v})} /><TP label="Primary CTA" value={p.primaryCta} onChange={v=>u({...p,primaryCta:v})} /><TP label="Secondary CTA" value={p.secondaryCta} onChange={v=>u({...p,secondaryCta:v})} /></PG><PG label="BG IMAGE URL"><TP label="URL" value={p.bgImage} onChange={v=>u({...p,bgImage:v})} /></PG></>}
        {section.type==="about"&&<><PG label="CONTENT"><TP label="Heading" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Paragraph 1" value={p.para1} onChange={v=>u({...p,para1:v})} /><TP label="Paragraph 2" value={p.para2} onChange={v=>u({...p,para2:v})} /></PG><PG label="IMAGE URL"><TP label="URL" value={p.image} onChange={v=>u({...p,image:v})} /></PG></>}
        {["programs","achievements","gallery","extracurricular","testimonials","faculty"].includes(section.type)&&<><PG label="HEADING"><TP label="Title" value={p.heading} onChange={v=>u({...p,heading:v})} /><TP label="Subtext" value={p.subtext} onChange={v=>u({...p,subtext:v})} /></PG><div style={{ color:"#334155",fontSize:11,lineHeight:1.5 }}>💡 Double-click text on canvas to edit inline.</div></>}
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
export default function SchoolBuilder() {
  const [sections,    setSections]    = useState(INIT);
  const [selectedId,  setSelectedId]  = useState(null);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [leftTab,     setLeftTab]     = useState("components");
  const [history,     setHistory]     = useState([INIT]);
  const [histIdx,     setHistIdx]     = useState(0);
  const [modal,       setModal]       = useState(null);

  const pushHist = s => { const h = history.slice(0,histIdx+1).concat([s]); setHistory(h); setHistIdx(h.length-1); };
  const undo = () => { if (histIdx>0) { setHistIdx(histIdx-1); setSections(history[histIdx-1]); } };
  const redo = () => { if (histIdx<history.length-1) { setHistIdx(histIdx+1); setSections(history[histIdx+1]); } };
  const updateSection = (id, np) => {
    const n = np===null ? sections.filter(s=>s.id!==id) : sections.map(s=>s.id===id?{...s,props:np}:s);
    setSections(n); pushHist(n); if (np===null) setSelectedId(null);
  };
  const addSection = type => { const sec={id:uid(),type,props:{...NEW_DEF[type]}}; const n=[...sections,sec]; setSections(n); pushHist(n); setSelectedId(sec.id); };
  const moveSection = (id,dir) => {
    const idx=sections.findIndex(s=>s.id===id);
    if(dir==="up"&&idx===0||dir==="dn"&&idx===sections.length-1) return;
    const n=[...sections]; const o=dir==="up"?idx-1:idx+1; [n[idx],n[o]]=[n[o],n[idx]]; setSections(n); pushHist(n);
  };
  const sel = sections.find(s=>s.id===selectedId)||null;
  const CW  = { desktop:"100%", tablet:"768px", mobile:"390px" };

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100vh",background:"#0a0a0c",fontFamily:"'Inter',-apple-system,sans-serif",overflow:"hidden",color:"#e2e8f0" }}>
      <style>{CSS}</style>

      {/* TOP BAR */}
      <div style={{ height:50,background:"#0a0a0c",borderBottom:"1px solid #1a1a22",display:"flex",alignItems:"center",padding:"0 14px",gap:10,flexShrink:0,zIndex:100 }}>
        <div style={{ display:"flex",alignItems:"center",gap:7,marginRight:4 }}>
          <div style={{ width:26,height:26,background:"linear-gradient(135deg,#2563eb,#7c3aed)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>🏫</div>
          <span style={{ fontWeight:800,fontSize:14,letterSpacing:"-.4px",color:"#e2e8f0" }}>SchoolCraft</span>
          <span style={{ background:"rgba(37,99,235,.15)",color:"#60a5fa",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:100 }}>BUILDER</span>
        </div>
        <div style={{ width:1,height:22,background:"#1a1a22" }} />
        <button style={{ background:"#161620",border:"1px solid #1a1a22",color:"#94a3b8",padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
          <span style={{ color:"#2563eb" }}>●</span> Home <span style={{ opacity:.4,fontSize:10 }}>▼</span>
        </button>
        <div style={{ flex:1 }} />
        <div style={{ display:"flex",background:"#161620",borderRadius:7,padding:3,gap:2,border:"1px solid #1a1a22" }}>
          {[["desktop","🖥","Desktop"],["tablet","⬜","Tablet"],["mobile","📱","Mobile"]].map(([mode,ic,lb])=>(
            <button key={mode} onClick={()=>setPreviewMode(mode)} title={lb}
              style={{ background:previewMode===mode?"#2d2d3e":"transparent",border:"none",color:previewMode===mode?"#60a5fa":"#334155",padding:"4px 10px",borderRadius:5,cursor:"pointer",fontSize:12,fontWeight:previewMode===mode?700:400 }}>{ic}</button>
          ))}
        </div>
        <div style={{ width:1,height:22,background:"#1a1a22" }} />
        <button onClick={undo} disabled={histIdx===0} style={{ background:"transparent",border:"none",color:histIdx===0?"#1e2a3a":"#64748b",cursor:histIdx===0?"default":"pointer",fontSize:16,padding:"4px 7px",borderRadius:5 }}>↩</button>
        <button onClick={redo} disabled={histIdx===history.length-1} style={{ background:"transparent",border:"none",color:histIdx===history.length-1?"#1e2a3a":"#64748b",cursor:histIdx===history.length-1?"default":"pointer",fontSize:16,padding:"4px 7px",borderRadius:5 }}>↪</button>
        <div style={{ width:1,height:22,background:"#1a1a22" }} />
        <button style={{ background:"transparent",border:"1px solid #1a1a22",color:"#64748b",padding:"5px 12px",borderRadius:6,fontSize:12,cursor:"pointer" }}>💾 Save</button>
        <button onClick={()=>setModal("publish")} style={{ background:"linear-gradient(135deg,#2563eb,#7c3aed)",border:"none",color:"#fff",padding:"6px 16px",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 0 16px rgba(37,99,235,.4)" }}>🚀 Publish</button>
      </div>

      {/* MAIN */}
      <div style={{ flex:1,display:"flex",overflow:"hidden" }}>
        <LeftPanel sections={sections} selectedId={selectedId} leftTab={leftTab} setLeftTab={setLeftTab}
          onAddSection={addSection} onSelectSection={setSelectedId}
          onUpdateSections={n=>{setSections(n);pushHist(n);}} />

        {/* CANVAS */}
        <div data-canvas style={{ flex:1,overflow:"auto",background:"#111116",display:"flex",flexDirection:"column",alignItems:"center",padding:20 }}
          onClick={()=>setSelectedId(null)}>
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
          <div onClick={e=>e.stopPropagation()}
            style={{ width:CW[previewMode],maxWidth:CW[previewMode],minWidth:previewMode==="mobile"?"390px":"280px",background:"#fff",borderRadius:"8px 8px 0 0",overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.6),0 0 0 1px #1e1e2a",transition:"width .3s cubic-bezier(.4,0,.2,1)",minHeight:400 }}>
            <div style={{ background:"#1a1a22",height:34,display:"flex",alignItems:"center",padding:"0 12px",gap:6,borderBottom:"1px solid #1e1e2a" }}>
              <div style={{ display:"flex",gap:5 }}>
                {["#f87171","#fbbf24","#34d399"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c }} />)}
              </div>
              <div style={{ flex:1,background:"#111116",borderRadius:4,padding:"4px 10px",fontSize:11,color:"#475569",textAlign:"center",marginLeft:8 }}>dspublicschool.edu</div>
            </div>
            {sections.map((s,i)=>(
              <SectionWrap key={s.id} section={s} selected={selectedId===s.id}
                onSelect={setSelectedId} onUpdate={updateSection}
                onDelete={id=>updateSection(id,null)} onMove={moveSection}
                canUp={i>0} canDown={i<sections.length-1} />
            ))}
          </div>
        </div>

        <RightPanel section={sel} onUpdate={updateSection} />
      </div>

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
