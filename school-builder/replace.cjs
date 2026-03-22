const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// NavbarSec
code = code.replace(
  'background: scrolled ? "rgba(255,255,255,.96)" : "transparent"',
  'background: p.bgColor || (scrolled ? "rgba(255,255,255,.96)" : "transparent")'
);
code = code.replace(
  'color: scrolled ? "#1e293b" : "#fff"',
  'color: p.textColor || (scrolled ? "#1e293b" : "#fff")'
);
code = code.replace(
  'color: scrolled ? "#475569" : "#fff"',
  'color: p.textColor || (scrolled ? "#475569" : "#fff")'
);

// HeroSec
code = code.replace(
  'background: "linear-gradient(135deg,#0f172a,#1e3a5f,#1e293b)"',
  'background: p.bgColor || "linear-gradient(135deg,#0f172a,#1e3a5f,#1e293b)"'
);
code = code.replace(
  /color: "#fff",(.*?fontFamily: "'Playfair Display',serif")/g,
  'color: p.textColor || "#fff",$1'
);

// AboutSec
code = code.replace(
  'background: "#fff" }',
  'background: p.bgColor || "#fff" }'
);
code = code.replace(
  'color: "#0f172a", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#0f172a", fontFamily: "\'Playfair Display\',serif"'
);

// ProgramsSec
code = code.replace(
  'background: "linear-gradient(135deg,#f8fafc,#eff6ff)" }',
  'background: p.bgColor || "linear-gradient(135deg,#f8fafc,#eff6ff)" }'
);
code = code.replace(
  'color: "#0f172a", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#0f172a", fontFamily: "\'Playfair Display\',serif"'
);

// AchievementsSec
code = code.replace(
  'background: "#fff", overflow: "hidden" }',
  'background: p.bgColor || "#fff", overflow: "hidden" }'
);
code = code.replace(
  'color: "#0f172a", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#0f172a", fontFamily: "\'Playfair Display\',serif"'
);

// AdmissionsSec
code = code.replace(
  'background: "#fff" }',
  'background: p.bgColor || "#fff" }'
);
code = code.replace(
  'color: "#0f172a", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#0f172a", fontFamily: "\'Playfair Display\',serif"'
);

// FacultySec
code = code.replace(
  'background: "linear-gradient(135deg,#0f172a,#1e3a5f,#312e81)"',
  'background: p.bgColor || "linear-gradient(135deg,#0f172a,#1e3a5f,#312e81)"'
);
code = code.replace(
  'color: "#fff", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#fff", fontFamily: "\'Playfair Display\',serif"'
);

// NewsEventsSec
code = code.replace(
  'background: "#fff" }',
  'background: p.bgColor || "#fff" }'
);
// This one has 2 h2s
code = code.replaceAll(
  'color: "#0f172a", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#0f172a", fontFamily: "\'Playfair Display\',serif"'
);

// GallerySec
code = code.replace(
  'background: "#fff" }',
  'background: p.bgColor || "#fff" }'
);
// h2 already caught by replaceAll

// ExtracurricularSec
code = code.replace(
  'background: "linear-gradient(135deg,#f8fafc,#fff,#eff6ff)" }',
  'background: p.bgColor || "linear-gradient(135deg,#f8fafc,#fff,#eff6ff)" }'
);

// TestimonialsSec
code = code.replace(
  'background: "linear-gradient(135deg,#1e3a5f,#0f172a,#312e81)"',
  'background: p.bgColor || "linear-gradient(135deg,#1e3a5f,#0f172a,#312e81)"'
);
code = code.replace(
  'color: "#fff", fontFamily: "\'Playfair Display\',serif"',
  'color: p.textColor || "#fff", fontFamily: "\'Playfair Display\',serif"'
);

// ContactSec
code = code.replace(
  'background: "linear-gradient(135deg,#f8fafc,#eff6ff)" }',
  'background: p.bgColor || "linear-gradient(135deg,#f8fafc,#eff6ff)" }'
);

// FooterSec
code = code.replace(
  'background: "linear-gradient(135deg,#0f172a,#1e3a5f,#0f172a)"',
  'background: p.bgColor || "linear-gradient(135deg,#0f172a,#1e3a5f,#0f172a)"'
);

// LoginSec
code = code.replace(
  'background: "#f8fafc"',
  'background: p.bgColor || "#f8fafc"'
);

fs.writeFileSync('src/App.jsx', code);
console.log("Replacements complete!");
