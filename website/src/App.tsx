import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, Wrench, Copy, Check, GitBranch, ArrowRight, Server, Download } from 'lucide-react';
import './App.css';

const INSTALL_CMD = `iwr -useb https://raw.githubusercontent.com/ragavi-632007/fixbot-terminal/main/install.ps1 | iex`;
const GITHUB_URL = "https://github.com/ragavi-632007/fixbot-terminal";

function CopyBox({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="install-box">
      <span className="install-label">{label}</span>
      <code className="install-code">{text}</code>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? <><Check size={15} color="#10B981" /> Copied</> : <><Copy size={15} /> Copy</>}
      </button>
    </div>
  );
}

function App() {
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setTerminalStep(1), 2200);
    const t2 = setTimeout(() => setTerminalStep(2), 2800);
    const t3 = setTimeout(() => setTerminalStep(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="App">
      <div className="container">

        {/* ── Navbar ── */}
        <nav className="navbar">
          <div className="logo">
            <Terminal size={26} color="#818CF8" />
            Fixbot
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#install">Install</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <GitBranch size={17} /> GitHub
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-badge">✦ v4.0 — Now Available</div>
          <h1>
            Autonomous Support Agent<br />for <span className="text-gradient">Windows</span>
          </h1>
          <p>
            Fixbot diagnoses your system, fixes locked files, manages storage, and
            resolves issues in real-time using Google Gemini AI — all from your terminal.
          </p>
          <div className="hero-cta">
            <a href="#install" className="btn btn-primary">
              <Download size={18} /> Install Now
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-secondary">
              View Source <ArrowRight size={18} />
            </a>
          </div>

          {/* ── Animated Terminal ── */}
          <div className="terminal-wrapper">
            <div className="terminal-header">
              <div className="mac-btns">
                <div className="mac-btn close" />
                <div className="mac-btn minimize" />
                <div className="mac-btn maximize" />
              </div>
              <div className="terminal-title">Windows PowerShell — fixbot</div>
            </div>
            <div className="terminal-body">
              <div>
                <span className="prompt">PS C:\Users\You&gt;</span>
                <span className="typing-animation">scan</span>
              </div>
              {terminalStep >= 1 && (
                <div className="terminal-output">
                  <div style={{ color: '#818CF8', marginBottom: '1rem' }}>◉ Analyzing System Subsystems...</div>
                  {terminalStep >= 2 && (
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      <div className="diag-row"><span>[NETWORK]</span><span className="ok">OK (Ping: 12ms)</span></div>
                      <div className="diag-row"><span>[STORAGE]</span><span className="critical">CRITICAL (C: 98% Used)</span></div>
                      <div className="diag-row"><span>[MEMORY]</span><span className="warn">WARN (RAM: 85% Used)</span></div>
                      <div className="diag-row"><span>[DEV-ENV]</span><span className="ok">OK (Python 3.11, Node 20)</span></div>
                    </div>
                  )}
                  {terminalStep >= 3 && (
                    <div style={{ marginTop: '1.5rem', color: '#60A5FA', lineHeight: '1.8' }}>
                      {'>'} Recommendation: Expand C: by taking 30 GB from D:<br />
                      {'>'} Launch automated partition wizard? [Y/n]:
                      <span className="cursor-blink"> █</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="features">
          <h2 className="section-title">What Fixbot Can Do</h2>
          <div className="features-grid">
            {[
              { icon: <Wrench size={22} />, title: 'Automated Repair', desc: 'Interactive disk wizard, locked-file purger via MoveFileExW, and DNS/Wi-Fi restorer.' },
              { icon: <Zap size={22} />, title: 'Deep Diagnostics', desc: 'CPU/GPU loads, network latency audits, gateway pings, and crash log tracking.' },
              { icon: <Shield size={22} />, title: 'Permission Gate', desc: 'Visual plan card shows exactly what will run before any system change is made.' },
              { icon: <GitBranch size={22} />, title: 'GitPilot Built-in', desc: 'AI Git assistant — stage files, generate commit logs, resolve merge conflicts.' },
              { icon: <Server size={22} />, title: 'Env Self-Healer', desc: 'Detects broken Python venvs and pip conflicts, and rebuilds them automatically.' },
              { icon: <Terminal size={22} />, title: 'Browser Tab Scraper', desc: 'List and close RAM-heavy browser tabs directly from the terminal via debug APIs.' },
            ].map(f => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Install ── */}
        <section id="install" className="install-section">
          <h2 className="section-title">Install in One Command</h2>
          <p className="install-sub">
            Paste this in <strong>PowerShell</strong> (run as Administrator). Fixbot will download, set up, and be ready to use.
          </p>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>Run the installer</h4>
                <CopyBox text={INSTALL_CMD} label="PowerShell" />
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Restart your terminal</h4>
                <p className="step-desc">Close and reopen CMD or PowerShell so the new PATH takes effect.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Launch Fixbot</h4>
                <CopyBox text="fixbot" label="CMD / PowerShell" />
              </div>
            </div>
          </div>

          <div className="prereqs">
            <span>Prerequisites:</span>
            <span className="tag">Windows 10 / 11</span>
            <span className="tag">Python 3.9+</span>
            <span className="tag">Git</span>
            <span className="tag">Free Gemini API Key</span>
          </div>
        </section>

        <footer>
          <p>© {new Date().getFullYear()} Fixbot Open-Source Contributors · MIT License</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
