import { useState, useEffect } from "react";
import "./VlsiSociety.css";

/* ===== EDIT THESE ===== */
const FORM_LINK = ""; // paste your Google Form link here
const SEMINAR = { title: "Seminar title goes here", date: "Sat, 18 Oct, 11:00 AM", venue: "Seminar Hall", speaker: "Name, Company", entry: "Free for all branches" };
// Photo paths, e.g. "/photos/seminar.jpg" (put images in your project's public/photos folder). Leave "" for placeholders.
const SEMINAR_PHOTO = "";
const GALLERY = [
  { label: "Workshop", photo: "", c1: "#243b8a", c2: "#7a4bd1" },
  { label: "Seminar", photo: "", c1: "#0f6b4a", c2: "#2b7fd1" },
  { label: "FPGA lab", photo: "", c1: "#a8531d", c2: "#c23a5a" },
  { label: "Industry visit", photo: "", c1: "#5b2aa0", c2: "#1d6fa8" },
  { label: "Hackathon", photo: "", c1: "#8a2447", c2: "#e08a3c" },
  { label: "Team", photo: "", c1: "#157a6d", c2: "#5a3cb0" },
];
const TEAM = [
  { init: "AB", name: "Name", role: "President" },
  { init: "CD", name: "Name", role: "Vice president" },
  { init: "EF", name: "Name", role: "Workshops" },
  { init: "GH", name: "Name", role: "Projects" },
];
const SOCIETY_NAME = "VLSI Society";
const COLLEGE = "Your College Name";
/* ===== */

const TOOLS = ["Verilog", "SystemVerilog", "FPGA", "Cadence", "Synopsys", "OpenLane", "CMOS", "Timing closure"];
const GATES = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
  NAND: (a, b) => +!(a & b),
  NOR: (a, b) => +!(a | b),
};
const STAGES = [
  { t: "RTL", d: "Verilog, testbenches, simulation.", c: "var(--diff)" },
  { t: "Synthesis", d: "Turn code into gates and balance timing, area, power.", c: "var(--m1)" },
  { t: "Layout", d: "Floorplan, place and route, design rule checks.", c: "var(--cu)" },
  { t: "Tape-out", d: "Sign-off and send a design to a shuttle run.", c: "var(--poly)" },
];

const blank = "linear-gradient(transparent,transparent)";
const img = (p) => (p ? `url("${p}")` : blank);

export default function VlsiSociety() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [gate, setGate] = useState("AND");
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const move = (e) => setAngle((e.clientX / window.innerWidth) * 360);
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const y = GATES[gate](a, b);
  const joinProps = FORM_LINK
    ? { href: FORM_LINK, target: "_blank", rel: "noopener noreferrer" }
    : { href: "#", onClick: (e) => { e.preventDefault(); alert("Add your Google Form link in FORM_LINK at the top of the file."); } };

  return (
    <div className="app" style={{ "--seminar-photo": img(SEMINAR_PHOTO) }}>


      <nav>
        <div className="wrap">
          <a className="logo" href="#top">{SOCIETY_NAME}</a>
          <ul>
            <li><a href="#seminar">Seminar</a></li>
            <li><a href="#moments">Moments</a></li>
            <li><a href="#play">Playground</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
          <a className="btn" {...joinProps}>Join us</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="wrap">
          <div>
            <h1>Where silicon<span>gets its start.</span></h1>
            <p className="lede">The college society for people who want to design chips. Learn Verilog, build on FPGAs, and take a design from code to layout with us.</p>
            <div className="cta">
              <a className="btn" {...joinProps}>Join the society</a>
              <a className="btn ghost" href="#seminar">Next seminar</a>
            </div>
          </div>
          <div className="wafer" style={{ "--a": `${angle}deg` }} aria-hidden="true">
            <b>1 wafer<br />many dies</b>
          </div>
        </div>
      </header>

      <div className="mq" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }).flatMap((_, r) => TOOLS.map((t) => <span key={`${r}-${t}`}>{t}</span>))}
        </div>
      </div>

      <section className="sem" id="seminar">
        <div className="wrap">
          <span className="tag">Seminar</span>
          <h2>{SEMINAR.title}</h2>
          <ul className="facts">
            <li><b>Date</b>{SEMINAR.date}</li>
            <li><b>Venue</b>{SEMINAR.venue}</li>
            <li><b>Speaker</b>{SEMINAR.speaker}</li>
            <li><b>Entry</b>{SEMINAR.entry}</li>
          </ul>
          <a className="btn" {...joinProps}>Register for the seminar</a>
        </div>
      </section>

      <section id="moments">
        <div className="wrap">
          <h2 className="h">Moments from our events</h2>
          <p className="sub">Workshops, seminars and late-night debugging. Add your own photos at the top of this file.</p>
          <div className="gal">
            {GALLERY.map((g, i) => (
              <div key={g.label} className="ph" style={{ "--img": img(g.photo), "--c1": g.c1, "--c2": g.c2, "--r": `${i * 60}deg` }}>
                <i>{g.label}</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="play" id="play">
        <div className="wrap pg">
          <div>
            <h2 className="h">Try a logic gate</h2>
            <p className="sub">Every chip is built from tiny switches like this. Flip the inputs and pick a gate.</p>
            <div className="ctl">
              <button aria-pressed={!!a} onClick={() => setA(a ^ 1)}>A = {a}</button>
              <button aria-pressed={!!b} onClick={() => setB(b ^ 1)}>B = {b}</button>
            </div>
            <div className="ctl">
              {Object.keys(GATES).map((g) => (
                <button key={g} aria-pressed={g === gate} onClick={() => setGate(g)}>{g}</button>
              ))}
            </div>
            <div className="led">
              <i className={y ? "on" : ""} />
              <span>{a} {gate} {b} = {y}</span>
            </div>
          </div>
          <table aria-label="Truth table">
            <thead><tr><th>A</th><th>B</th><th>Y</th></tr></thead>
            <tbody>
              {[[0, 0], [0, 1], [1, 0], [1, 1]].map(([p, q]) => (
                <tr key={`${p}${q}`} className={p === a && q === b ? "hit" : ""}>
                  <td>{p}</td><td>{q}</td><td>{GATES[gate](p, q)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="roadmap">
        <div className="wrap ls">
          <div className="stack" aria-hidden="true">
            {STAGES.map((s) => <div key={s.t} className="layer" style={{ "--c": s.c }} />)}
          </div>
          <div>
            <h2 className="h">One chip, four stages</h2>
            <p className="sub">Our learning path follows a real design flow, top layer to bottom.</p>
            <div className="steps">
              {STAGES.map((s) => (
                <div key={s.t} style={{ "--c": s.c }}><h3>{s.t}</h3><p>{s.d}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="h">The team</h2>
          <p className="sub">Replace with your core team.</p>
          <div className="team">
            {TEAM.map((p) => (
              <div key={p.init} className="pp"><div>{p.init}</div><b>{p.name}</b><span>{p.role}</span></div>
            ))}
          </div>
        </div>
      </section>

      <div className="final">
        <div className="wrap">
          <h2>Tape out<br />with us.</h2>
          <a className="btn" {...joinProps}>Fill the Google Form</a>
        </div>
      </div>
      <footer>{SOCIETY_NAME}, {COLLEGE}</footer>
    </div>
  );
}

