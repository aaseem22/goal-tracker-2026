import { useState } from "react";

const QUARTERS = [
  { id: "Q1", label: "Q1 2026", range: "Mar 4 – Jun 30" },
  { id: "Q2", label: "Q2 2026", range: "Jul 1 – Sep 30" },
  { id: "Q3", label: "Q3 2026", range: "Oct 1 – Nov 30" },
];

const CATEGORY_META = {
  career:    { emoji: "💼", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  academics: { emoji: "📚", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  project:   { emoji: "⚙️",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  health:    { emoji: "💪", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
};

const STATUS_META = {
  green:  { label: "On Track",    color: "#10b981", bg: "rgba(16,185,129,0.15)",  icon: "✓" },
  yellow: { label: "In Progress", color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  icon: "◐" },
  red:    { label: "Off Track",   color: "#ef4444", bg: "rgba(239,68,68,0.15)",   icon: "✗" },
};

const inputSx = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e8e8f0",
  borderRadius: 8,
  padding: "9px 12px",
  fontFamily: "'DM Mono', monospace",
  fontSize: 13,
  outline: "none",
  width: "100%",
};

const makeId = () => Math.random().toString(36).slice(2, 9);

const BLANK_FORM = {
  quest: "", identity: "", category: "career", status: "yellow",
  wish: "", outcome: "", obstacles: "", plan: "",
  milestones: ["", "", ""],
};

const INITIAL_GOALS = {
  Q1: [
    { id: makeId(), quest: "Placement Prep", identity: "I am a top-tier AI Engineer", category: "career", status: "yellow", progress: 15,
      wish: "Get placed at Morgan Stanley / top-tier firm (12–18 LPA)", outcome: "Offer letter in hand by Nov 2026",
      obstacles: ["Gaps in DSA", "No strong portfolio yet", "Hectic sem schedule"],
      plan: "Daily LC, RISKLENS project, cloud cert by Aug",
      milestones: [
        { text: "Complete LeetCode 150 (50 done)", done: false },
        { text: "Finish RISKLENS AI App v1", done: false },
        { text: "Register for Azure AI / GCP ML Cert", done: false },
        { text: "Research Morgan Stanley hiring criteria", done: false },
      ]},
    { id: makeId(), quest: "Sem 2 Topper", identity: "I am the sharpest mind in my batch", category: "academics", status: "yellow", progress: 20,
      wish: "Finish #1 in class in Sem 2", outcome: "Highest CGPA in batch, finals in May 2026",
      obstacles: ["Gym + projects eating time", "Ramzan fatigue lingering", "Broad syllabus"],
      plan: "3 focused study hours daily, weekend revision blocks",
      milestones: [
        { text: "Map full syllabus for all subjects", done: false },
        { text: "Complete subject notes by Apr 15", done: false },
        { text: "Mock tests for all subjects (Apr)", done: false },
        { text: "Finals — aim for 90%+ in each subject", done: false },
      ]},
    { id: makeId(), quest: "RISKLENS AI App", identity: "I am a builder who ships real products", category: "project", status: "green", progress: 25,
      wish: "Launch a production-ready RISKLENS AI app", outcome: "Live demo + GitHub repo + case study on portfolio",
      obstacles: ["Scope creep", "Backend complexity", "Time with sem workload"],
      plan: "Weekly sprint goals, use voice notes to document progress",
      milestones: [
        { text: "Complete architecture + tech stack decision", done: false },
        { text: "Build core risk analysis module", done: false },
        { text: "Integrate LLM / RAG pipeline", done: false },
        { text: "Deploy MVP with demo video", done: false },
      ]},
    { id: makeId(), quest: "Physique Foundation", identity: "I am someone who prioritizes health and longevity", category: "health", status: "yellow", progress: 30,
      wish: "Recover from Ramzan and rebuild gym base", outcome: "Back to 56 kg+, consistent 5-day gym routine",
      obstacles: ["Busy schedule", "Calorie surplus hard to maintain", "Fatigue"],
      plan: "Meal prep Sundays, calorie-dense foods, gym at fixed time",
      milestones: [
        { text: "Set daily calorie target (2800+ kcal)", done: false },
        { text: "Back to 5-day gym split consistently", done: false },
        { text: "Reach 56 kg body weight", done: false },
        { text: "Track meals in app (Cronometer/MyFitnessPal)", done: false },
      ]},
  ],
  Q2: [
    { id: makeId(), quest: "Placement Ready", identity: "I am a top-tier AI Engineer", category: "career", status: "yellow", progress: 0,
      wish: "Be 100% ready before placements open in July", outcome: "Strong resume, 2+ AI projects live, cert earned",
      obstacles: ["Summer distractions", "Interview anxiety", "Imposter syndrome"],
      plan: "Mock interviews weekly, LinkedIn active, portfolio live",
      milestones: [
        { text: "Earn Azure AI Engineer / GCP ML Cert", done: false },
        { text: "Build 2nd Agentic AI / RAG / MCP project", done: false },
        { text: "Portfolio website LIVE (Anti-Gravity)", done: false },
        { text: "Resume reviewed + finalized", done: false },
      ]},
    { id: makeId(), quest: "Portfolio Website", identity: "I am a developer who presents himself professionally", category: "project", status: "yellow", progress: 0,
      wish: "Launch aesthetic portfolio using Anti-Gravity", outcome: "Live site with all projects, cert, GitHub, contact",
      obstacles: ["Design perfectionism", "Time", "Content gathering"],
      plan: "Design sprint in May, code in June, deploy by Jun 30",
      milestones: [
        { text: "Finalize design direction + wireframes", done: false },
        { text: "Build Anti-Gravity powered site", done: false },
        { text: "Add all projects + case studies", done: false },
        { text: "Deploy + share with network", done: false },
      ]},
    { id: makeId(), quest: "Physique Build", identity: "I am someone who prioritizes health and longevity", category: "health", status: "yellow", progress: 0,
      wish: "Gain quality muscle mass, reach 59–60 kg", outcome: "Visible progress, consistent nutrition, energy up",
      obstacles: ["Placement stress", "Irregular food access on campus"],
      plan: "Structured split, progressive overload tracking, meal plan",
      milestones: [
        { text: "Reach 58 kg with good body comp", done: false },
        { text: "Stick to progressive overload 12 weeks", done: false },
        { text: "No missed gym weeks", done: false },
        { text: "Monthly body comp check", done: false },
      ]},
  ],
  Q3: [
    { id: makeId(), quest: "GET THE OFFER 🎯", identity: "I am a top-tier AI Engineer at a world-class firm", category: "career", status: "yellow", progress: 0,
      wish: "Secure placement at Morgan Stanley or equivalent (12–18 LPA)", outcome: "Signed offer letter before Nov 22, 2026",
      obstacles: ["Competition", "Interview nerves", "Multiple rejection cycles"],
      plan: "Apply broadly, prep daily, treat each rejection as feedback",
      milestones: [
        { text: "Apply to 20+ target companies", done: false },
        { text: "Clear 3+ technical rounds", done: false },
        { text: "HR negotiations completed", done: false },
        { text: "OFFER SIGNED ✅", done: false },
      ]},
    { id: makeId(), quest: "Physique Goal — Birthday 🎂", identity: "I am someone who prioritizes health and longevity", category: "health", status: "yellow", progress: 0,
      wish: "Achieve aesthetic physique by Nov 22 (24th birthday)", outcome: "60–62 kg, visible muscle definition, confident",
      obstacles: ["Placement stress may disrupt sleep/diet", "Motivation dips"],
      plan: "Non-negotiable gym sessions, track everything, birthday vision board",
      milestones: [
        { text: "Reach 60 kg milestone", done: false },
        { text: "Maintain <15% body fat", done: false },
        { text: "Gym never < 4x/week even during placements", done: false },
        { text: "Birthday physique check — CELEBRATE 🎉", done: false },
      ]},
  ],
};

// ─── Modal wrapper ───────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)" }}>
      <div style={{ background:"#111118", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, width:"min(96vw,640px)", maxHeight:"92vh", overflowY:"auto", padding:"26px 28px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"#fff" }}>{title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#666", fontSize:22, cursor:"pointer", lineHeight:1, padding:"0 4px" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Label ───────────────────────────────────────────────────────────────────
function Label({ text, color="#5a5a7a" }) {
  return <div style={{ fontSize:10, letterSpacing:2, color, marginBottom:6 }}>{text}</div>;
}

// ─── GoalForm ─────────────────────────────────────────────────────────────────
function GoalForm({ initial = BLANK_FORM, onSave, onCancel }) {
  const normalize = (g) => ({
    ...g,
    obstacles: Array.isArray(g.obstacles) ? g.obstacles.join(", ") : (g.obstacles || ""),
    milestones: (g.milestones || []).map(m => (typeof m === "string" ? m : m.text)),
  });

  const [f, setF] = useState(() => normalize({ ...BLANK_FORM, ...initial }));

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const setMs = (i, v) => setF(p => { const ms = [...p.milestones]; ms[i] = v; return { ...p, milestones: ms }; });
  const addMs = () => setF(p => ({ ...p, milestones: [...p.milestones, ""] }));
  const delMs = (i) => setF(p => ({ ...p, milestones: p.milestones.filter((_, idx) => idx !== i) }));

  const save = () => {
    if (!f.quest.trim()) { alert("Quest name is required."); return; }
    const milestones = f.milestones.filter(m => m.trim()).map(m => ({ text: m.trim(), done: false }));
    if (!milestones.length) { alert("Add at least one milestone."); return; }
    // Preserve done state if editing
    const existingMs = Array.isArray(initial.milestones) ? initial.milestones : [];
    const mergedMs = milestones.map((m, i) => ({ ...m, done: existingMs[i]?.done || false }));
    onSave({
      id: initial.id || makeId(),
      quest: f.quest.trim(),
      identity: f.identity.trim(),
      category: f.category,
      status: f.status,
      wish: f.wish.trim(),
      outcome: f.outcome.trim(),
      obstacles: f.obstacles.split(",").map(s => s.trim()).filter(Boolean),
      plan: f.plan.trim(),
      milestones: mergedMs,
      progress: Math.round((mergedMs.filter(m => m.done).length / mergedMs.length) * 100),
    });
  };

  const woop = [
    { key:"wish",      label:"W — WISH",                            color:"#3b82f6", ph:"What do you wish for?" },
    { key:"outcome",   label:"O — OUTCOME",                         color:"#8b5cf6", ph:"Best outcome if you achieve it?" },
    { key:"obstacles", label:"O — OBSTACLES  (comma-separated)",    color:"#ef4444", ph:"e.g. Lack of time, Procrastination" },
    { key:"plan",      label:"P — PLAN",                            color:"#10b981", ph:"How will you overcome those obstacles?" },
  ];

  return (
    <div>
      {/* Name + Category */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
        <div>
          <Label text="QUEST NAME *" />
          <input style={inputSx} value={f.quest} onChange={e => set("quest", e.target.value)} placeholder="e.g. RISKLENS AI App" />
        </div>
        <div>
          <Label text="CATEGORY" />
          <select style={{ ...inputSx, cursor:"pointer" }} value={f.category} onChange={e => set("category", e.target.value)}>
            {Object.entries(CATEGORY_META).map(([k, v]) => <option key={k} value={k}>{v.emoji} {k}</option>)}
          </select>
        </div>
      </div>

      {/* Identity */}
      <div style={{ marginBottom:14 }}>
        <Label text='IDENTITY  (I am…)' />
        <input style={inputSx} value={f.identity} onChange={e => set("identity", e.target.value)} placeholder='"I am a builder who ships real products"' />
      </div>

      {/* WOOP */}
      <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", margin:"18px 0 12px", borderBottom:"1px solid rgba(255,255,255,0.05)", paddingBottom:8 }}>WOOP METHOD</div>
      {woop.map(w => (
        <div key={w.key} style={{ marginBottom:12 }}>
          <Label text={w.label} color={w.color} />
          <textarea style={{ ...inputSx, resize:"vertical" }} rows={2} value={f[w.key]} onChange={e => set(w.key, e.target.value)} placeholder={w.ph} />
        </div>
      ))}

      {/* Milestones */}
      <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", margin:"18px 0 12px", borderBottom:"1px solid rgba(255,255,255,0.05)", paddingBottom:8 }}>MILESTONES *</div>
      {f.milestones.map((m, i) => (
        <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#4a4a6a", minWidth:20 }}>{i+1}.</span>
          <input style={{ ...inputSx, flex:1 }} value={m} onChange={e => setMs(i, e.target.value)} placeholder={`Milestone ${i+1}`} />
          {f.milestones.length > 1 && (
            <button onClick={() => delMs(i)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:12, flexShrink:0 }}>✕</button>
          )}
        </div>
      ))}
      <button onClick={addMs} style={{ background:"rgba(255,255,255,0.03)", border:"1px dashed rgba(255,255,255,0.1)", color:"#6a6a8a", borderRadius:8, padding:"8px 14px", cursor:"pointer", fontSize:12, width:"100%", marginBottom:4, fontFamily:"'DM Mono',monospace" }}>
        + Add Milestone
      </button>

      {/* Actions */}
      <div style={{ display:"flex", gap:10, marginTop:22, justifyContent:"flex-end" }}>
        <button onClick={onCancel} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.08)", color:"#6a6a8a", borderRadius:8, padding:"9px 20px", cursor:"pointer", fontSize:13, fontFamily:"'DM Mono',monospace" }}>Cancel</button>
        <button onClick={save} style={{ background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", border:"none", color:"#fff", borderRadius:8, padding:"9px 24px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Syne',sans-serif", letterSpacing:0.5 }}>
          Save Quest
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function GoalTracker() {
  const [activeQ, setActiveQ]           = useState("Q1");
  const [goals, setGoals]               = useState(INITIAL_GOALS);
  const [expanded, setExpanded]         = useState(null);
  const [showReview, setShowReview]     = useState(false);
  const [weeklyNotes, setWeeklyNotes]   = useState({ career:"", academics:"", health:"" });
  const [weeklyPri, setWeeklyPri]       = useState("");
  const [daily, setDaily]               = useState("");
  const [modal, setModal]               = useState(null); // null | {mode:"add"} | {mode:"edit", goal}
  const [confirmDel, setConfirmDel]     = useState(null); // goalId

  const today = new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  const muQ = (fn) => setGoals(p => ({ ...p, [activeQ]: fn(p[activeQ]) }));

  const toggleMs = (gid, idx) => muQ(list => list.map(g => {
    if (g.id !== gid) return g;
    const ms = g.milestones.map((m, i) => i === idx ? { ...m, done: !m.done } : m);
    return { ...g, milestones: ms, progress: Math.round((ms.filter(m=>m.done).length / ms.length) * 100) };
  }));

  const setStatus = (gid, s) => muQ(list => list.map(g => g.id === gid ? { ...g, status: s } : g));

  const saveGoal = (goal) => {
    if (modal.mode === "add") muQ(list => [...list, goal]);
    else muQ(list => list.map(g => g.id === goal.id ? goal : g));
    setModal(null);
    setExpanded(null);
  };

  const deleteGoal = (gid) => {
    muQ(list => list.filter(g => g.id !== gid));
    setConfirmDel(null);
    if (expanded === gid) setExpanded(null);
  };

  const list = goals[activeQ] || [];
  const overall = list.length ? Math.round(list.reduce((a,g)=>a+g.progress,0)/list.length) : 0;

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0f", color:"#e8e8f0", fontFamily:"'DM Mono','Courier New',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0a0a0f}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px}
        .card{transition:transform .2s ease}.card:hover{transform:translateY(-1px)}
        .qtab{transition:all .2s;cursor:pointer}.qtab:hover{background:rgba(255,255,255,.05)!important}
        .sbtn{transition:all .15s;cursor:pointer;border:none;font-family:'DM Mono',monospace}.sbtn:hover{opacity:.8}
        .mrow{transition:background .15s;cursor:pointer}.mrow:hover{background:rgba(255,255,255,.05)!important}
        .pfill{transition:width .5s ease}
        .icnbtn{background:none;border:none;cursor:pointer;transition:opacity .15s;font-family:'DM Mono',monospace}.icnbtn:hover{opacity:.65}
        textarea,input,select{font-family:'DM Mono',monospace}
        textarea:focus,input:focus,select:focus{border-color:rgba(255,255,255,.22)!important;outline:none}
        select option{background:#111118;color:#e8e8f0}
        .addgoalbtn{transition:all .2s}.addgoalbtn:hover{border-color:rgba(139,92,246,.5)!important;color:#9b7ff0!important;background:rgba(139,92,246,.06)!important}
      `}</style>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(180deg,#0f0f1a,#0a0a0f)", borderBottom:"1px solid rgba(255,255,255,.06)", padding:"26px clamp(16px, 4vw, 56px) 22px" }}>
        <div style={{ width:"100%" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:4, color:"#5a5a7a", marginBottom:8 }}>QUARTERLY QUEST TRACKER</div>
              <div style={{ fontSize:26, fontFamily:"'Syne',sans-serif", fontWeight:800, letterSpacing:-1, color:"#fff" }}>2026 GOAL OS</div>
              <div style={{ fontSize:11, color:"#5a5a7a", marginTop:5 }}>{today}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", marginBottom:8 }}>IDENTITY</div>
              <div style={{ fontSize:12, color:"#a0a0c0", lineHeight:1.9, fontStyle:"italic" }}>
                I am a top AI Engineer.<br/>I am a builder who ships.<br/>I am someone who prioritizes health.
              </div>
            </div>
          </div>
          {/* Quarter tabs */}
          <div style={{ display:"flex", gap:8, marginTop:26 }}>
            {QUARTERS.map(q => (
              <div key={q.id} className="qtab" onClick={()=>setActiveQ(q.id)} style={{
                padding:"8px 18px", borderRadius:8, border:"1px solid",
                borderColor: activeQ===q.id ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.06)",
                background: activeQ===q.id ? "rgba(255,255,255,.07)" : "transparent",
                fontSize:12, letterSpacing:1, color: activeQ===q.id ? "#fff" : "#5a5a7a",
              }}>
                <span style={{ fontWeight:600 }}>{q.id}</span>
                <span style={{ marginLeft:8, fontSize:10, color: activeQ===q.id ? "#8a8ab0" : "#3a3a5a" }}>{q.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div style={{ width:"100%", padding:"22px clamp(16px, 4vw, 56px) 40px" }}>

        {/* Overall progress */}
        <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:12, padding:"18px 22px", marginBottom:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a" }}>{activeQ} OVERALL PROGRESS · {list.length} QUEST{list.length!==1?"S":""}</div>
            <div style={{ fontSize:22, fontFamily:"'Syne',sans-serif", fontWeight:800, color: overall>50?"#10b981":overall>20?"#f59e0b":"#e8e8f0" }}>{overall}%</div>
          </div>
          <div style={{ background:"rgba(255,255,255,.05)", borderRadius:4, height:6, overflow:"hidden" }}>
            <div className="pfill" style={{ height:"100%", width:`${overall}%`, background:"linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius:4 }}/>
          </div>
        </div>

        {/* Strategies pill bar */}
        <div style={{ background:"rgba(139,92,246,.07)", border:"1px solid rgba(139,92,246,.15)", borderRadius:12, padding:"11px 18px", marginBottom:18, display:"flex", gap:18, flexWrap:"wrap" }}>
          {["✍️ Written","👁️ Review Weekly","📊 Monitor Progress","🧠 WOOP Method","🪪 Identity-Tied"].map((s,i)=>(
            <div key={i} style={{ fontSize:11, color:"#8b6ff0" }}>{s}</div>
          ))}
        </div>

        {/* Daily manifesto */}
        <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:12, padding:"14px 18px", marginBottom:18 }}>
          <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", marginBottom:8 }}>DAILY MORNING MANIFESTO — "What are our priorities today?"</div>
          <textarea rows={2} style={{ ...inputSx, resize:"vertical" }} placeholder="Write today's 3 priorities here..." value={daily} onChange={e=>setDaily(e.target.value)}/>
        </div>

        {/* ── Goal cards ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap:12 }}>
          {list.map(goal => {
            const cat = CATEGORY_META[goal.category];
            const st  = STATUS_META[goal.status];
            const isExp = expanded === goal.id;
            const done = goal.milestones.filter(m=>m.done).length;

            return (
              <div key={goal.id} className="card" style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, overflow:"hidden" }}>

                {/* Card top */}
                <div style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, flexWrap:"wrap" }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6, flexWrap:"wrap" }}>
                        <span style={{ fontSize:10, letterSpacing:2, color:cat.color, background:cat.bg, padding:"3px 10px", borderRadius:20, whiteSpace:"nowrap" }}>
                          {cat.emoji} {goal.category.toUpperCase()}
                        </span>
                        <span style={{ fontSize:10, letterSpacing:1, color:st.color, background:st.bg, padding:"3px 10px", borderRadius:20, whiteSpace:"nowrap" }}>
                          {st.icon} {st.label}
                        </span>
                      </div>
                      <div style={{ fontSize:16, fontFamily:"'Syne',sans-serif", fontWeight:700, color:"#fff", marginBottom:3 }}>{goal.quest}</div>
                      <div style={{ fontSize:11, color:"#6a6a8a", fontStyle:"italic", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>"{goal.identity}"</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:22, fontWeight:700, color:goal.progress>60?"#10b981":"#e8e8f0", fontFamily:"'Syne',sans-serif" }}>{goal.progress}%</div>
                      <div style={{ fontSize:10, color:"#5a5a7a" }}>{done}/{goal.milestones.length} done</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ background:"rgba(255,255,255,.05)", borderRadius:4, height:4, marginTop:12, overflow:"hidden" }}>
                    <div className="pfill" style={{ height:"100%", width:`${goal.progress}%`, background:cat.color, borderRadius:4 }}/>
                  </div>

                  {/* Action row */}
                  <div style={{ display:"flex", gap:6, marginTop:12, alignItems:"center", flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, color:"#4a4a6a", letterSpacing:2, marginRight:2, whiteSpace:"nowrap" }}>STATUS:</span>
                    {["green","yellow","red"].map(s=>(
                      <button key={s} className="sbtn" onClick={()=>setStatus(goal.id,s)} style={{
                        padding:"4px 10px", borderRadius:20, fontSize:10, letterSpacing:1,
                        background: goal.status===s ? STATUS_META[s].bg : "transparent",
                        color: goal.status===s ? STATUS_META[s].color : "#4a4a6a",
                        border:`1px solid ${goal.status===s ? STATUS_META[s].color : "rgba(255,255,255,.06)"}`,
                      }}>{STATUS_META[s].label}</button>
                    ))}
                    <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
                      <button className="icnbtn" title="Edit quest" onClick={()=>setModal({mode:"edit",goal})}
                        style={{ color:"#7a7aaa", padding:"5px 9px", border:"1px solid rgba(255,255,255,.07)", borderRadius:8, fontSize:13 }}>✏️</button>
                      <button className="icnbtn" title="Delete quest" onClick={()=>setConfirmDel(goal.id)}
                        style={{ color:"#aa5a5a", padding:"5px 9px", border:"1px solid rgba(255,255,255,.07)", borderRadius:8, fontSize:13 }}>🗑️</button>
                      <button className="icnbtn" onClick={()=>setExpanded(isExp?null:goal.id)}
                        style={{ fontSize:11, color:"#6a6a8a", padding:"5px 12px", border:"1px solid rgba(255,255,255,.07)", borderRadius:20 }}>
                        {isExp?"▲ Collapse":"▼ WOOP + Milestones"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded panel */}
                {isExp && (
                  <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", padding:"18px 20px", background:"rgba(0,0,0,.2)" }}>
                    {/* WOOP grid */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
                      {[
                        { label:"W — WISH",      value:goal.wish,     color:"#3b82f6" },
                        { label:"O — OUTCOME",   value:goal.outcome,  color:"#8b5cf6" },
                        { label:"O — OBSTACLES", value:Array.isArray(goal.obstacles)?goal.obstacles.join(" · "):goal.obstacles, color:"#ef4444" },
                        { label:"P — PLAN",      value:goal.plan,     color:"#10b981" },
                      ].map((item,i)=>(
                        <div key={i} style={{ background:"rgba(255,255,255,.03)", borderLeft:`3px solid ${item.color}`, border:"1px solid rgba(255,255,255,.05)", borderRadius:8, padding:"10px 12px" }}>
                          <div style={{ fontSize:9, letterSpacing:2, color:item.color, marginBottom:5 }}>{item.label}</div>
                          <div style={{ fontSize:12, color:"#b0b0c8", lineHeight:1.65 }}>{item.value||<span style={{color:"#3a3a5a"}}>—</span>}</div>
                        </div>
                      ))}
                    </div>

                    {/* Milestones */}
                    <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", marginBottom:8 }}>MILESTONES — click to toggle</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      {goal.milestones.map((m,idx)=>(
                        <div key={idx} className="mrow" onClick={()=>toggleMs(goal.id,idx)} style={{
                          display:"flex", alignItems:"center", gap:10, padding:"9px 10px",
                          borderRadius:8, border:"1px solid rgba(255,255,255,.04)",
                          background: m.done?"rgba(16,185,129,.06)":"transparent",
                        }}>
                          <div style={{
                            width:17, height:17, borderRadius:5, flexShrink:0, transition:"all .2s",
                            border:`1.5px solid ${m.done?"#10b981":"rgba(255,255,255,.15)"}`,
                            background:m.done?"#10b981":"transparent",
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }}>
                            {m.done&&<span style={{color:"#fff",fontSize:10}}>✓</span>}
                          </div>
                          <span style={{ fontSize:13, color:m.done?"#6a9a7a":"#c0c0d8", textDecoration:m.done?"line-through":"none" }}>{m.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add new quest */}
          <button className="addgoalbtn" onClick={()=>setModal({mode:"add"})} style={{
            background:"rgba(255,255,255,.02)", border:"1.5px dashed rgba(255,255,255,.1)",
            borderRadius:14, color:"#5a5a7a", padding:"18px", cursor:"pointer",
            fontSize:13, width:"100%", fontFamily:"'DM Mono',monospace",
            gridColumn:"1 / -1",
          }}>
            + Add New Quest to {activeQ}
          </button>
        </div>

        {/* Weekly Review */}
        <div style={{ marginTop:22, background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }} onClick={()=>setShowReview(!showReview)}>
            <div>
              <div style={{ fontSize:10, letterSpacing:3, color:"#5a5a7a", marginBottom:4 }}>WEEKLY RESET</div>
              <div style={{ fontSize:13, fontFamily:"'Syne',sans-serif", fontWeight:600, color:"#c0c0d8" }}>"What were my quarterly quests and how are they going?"</div>
            </div>
            <span style={{ fontSize:16, color:"#5a5a7a" }}>{showReview?"▲":"▼"}</span>
          </div>
          {showReview&&(
            <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", padding:"18px 20px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                {[["career","💼 Career"],["academics","📚 Academics"],["health","💪 Health"]].map(([k,label])=>(
                  <div key={k} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:10, padding:"12px" }}>
                    <div style={{ fontSize:11, color:"#8a8ab0", marginBottom:8 }}>{label}</div>
                    <textarea rows={3} style={{ ...inputSx, resize:"vertical" }} placeholder="Progress? On track?" value={weeklyNotes[k]} onChange={e=>setWeeklyNotes(p=>({...p,[k]:e.target.value}))}/>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:10, color:"#5a5a7a", marginBottom:8, letterSpacing:2 }}>THIS WEEK'S 3 MAIN PRIORITIES</div>
              <textarea rows={3} style={{ ...inputSx, resize:"vertical" }} placeholder={"1.\n2.\n3."} value={weeklyPri} onChange={e=>setWeeklyPri(e.target.value)}/>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop:20, borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:18, display:"flex", gap:14, flexWrap:"wrap" }}>
          <div style={{ fontSize:10, letterSpacing:3, color:"#3a3a5a", width:"100%" }}>ALI ABDAAL'S 5 EVIDENCE-BASED STRATEGIES — BAKED IN ✓</div>
          {[["01","Write goals down","✓ System IS the list"],["02","Review weekly (RAS)","✓ Weekly Reset"],["03","Monitor progress","✓ % + milestones"],["04","WOOP Method","✓ Per quest"],["05","Identity-tied","✓ Every card"]].map(([n,t,note])=>(
            <div key={n} style={{ fontSize:11, color:"#4a4a6a" }}>
              <span style={{color:"#3a3a5a"}}>#{n} </span>
              <span style={{color:"#6a6a8a"}}>{t} </span>
              <span style={{color:"#3a3a5a"}}>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Add / Edit Modal ─────────────────────────────────────── */}
      {modal&&(
        <Modal title={modal.mode==="add"?`New Quest — ${activeQ}`:"Edit Quest"} onClose={()=>setModal(null)}>
          <GoalForm
            initial={modal.mode==="edit" ? modal.goal : BLANK_FORM}
            onSave={saveGoal}
            onCancel={()=>setModal(null)}
          />
        </Modal>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────────── */}
      {confirmDel&&(
        <Modal title="Delete Quest?" onClose={()=>setConfirmDel(null)}>
          <div style={{ fontSize:13, color:"#a0a0c0", marginBottom:24, lineHeight:1.8 }}>
            Are you sure you want to delete<br/>
            <strong style={{color:"#fff"}}>"{list.find(g=>g.id===confirmDel)?.quest}"</strong>?<br/>
            <span style={{color:"#6a4a4a"}}>This cannot be undone.</span>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
            <button onClick={()=>setConfirmDel(null)} style={{ background:"transparent", border:"1px solid rgba(255,255,255,.08)", color:"#6a6a8a", borderRadius:8, padding:"9px 20px", cursor:"pointer", fontSize:13, fontFamily:"'DM Mono',monospace" }}>Cancel</button>
            <button onClick={()=>deleteGoal(confirmDel)} style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", color:"#ef4444", borderRadius:8, padding:"9px 22px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Syne',sans-serif" }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}