"use client";

type Mode = "pipeline" | "cluster" | "graph";

export function ProjectVisual({ mode }: { mode: Mode }) {
  return (
    <div
      aria-hidden="true"
      className="glass relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[22px]"
      style={{ background: "var(--section-glow), var(--color-surface)" }}
    >
      {mode === "pipeline" && <Pipeline />}
      {mode === "cluster" && <Cluster />}
      {mode === "graph" && <Graph />}
      <VisualStyles />
    </div>
  );
}

const NODE = "#DCD2FF";
const EDGE = "rgba(220,210,255,0.25)";

function Pipeline() {
  const labels = ["Request", "IR", "Validate", "Review"];
  const xs = [48, 142, 236, 330];
  const cy = 90;
  return (
    <svg viewBox="0 0 378 180" className="h-auto w-[86%]">
      {xs.slice(0, -1).map((x, i) => (
        <line
          key={i}
          x1={x + 14}
          y1={cy}
          x2={xs[i + 1] - 14}
          y2={cy}
          stroke={EDGE}
          strokeWidth="1.5"
        />
      ))}
      {/* travelling pulse */}
      <circle r="3.5" fill={NODE} className="pv-pulse">
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          path="M48,90 L330,90"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      </circle>
      {xs.map((x, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={cy}
            r="13"
            fill="rgba(124,92,255,0.14)"
            stroke={NODE}
            strokeWidth="1.5"
            className="pv-node"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
          <text
            x={x}
            y={cy + 34}
            textAnchor="middle"
            fontSize="11"
            fill="rgba(244,240,255,0.7)"
            fontFamily="monospace"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Cluster() {
  const cols = 6;
  const rows = 4;
  const gap = 40;
  const ox = 44;
  const oy = 34;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const delay = ((col + r) % 6) * 0.35;
      dots.push(
        <circle
          key={`${r}-${col}`}
          cx={ox + col * gap}
          cy={oy + r * gap}
          r="6"
          fill={NODE}
          className="pv-twinkle"
          style={{ animationDelay: `${delay}s` }}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 288 180" className="h-auto w-[82%]">
      {dots}
    </svg>
  );
}

function Graph() {
  const nodes = [
    [60, 50],
    [140, 36],
    [224, 60],
    [300, 44],
    [40, 120],
    [120, 110],
    [196, 130],
    [280, 118],
    [96, 72],
    [170, 92],
    [250, 90],
    [320, 96],
  ];
  const edges = [
    [0, 8],
    [8, 1],
    [1, 9],
    [9, 2],
    [2, 10],
    [10, 3],
    [4, 5],
    [5, 6],
    [6, 7],
    [8, 5],
    [9, 6],
    [10, 11],
    [3, 11],
    [0, 4],
  ];
  return (
    <svg viewBox="0 0 360 180" className="h-auto w-[88%]">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={EDGE}
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 6.5 : 4.5}
          fill={NODE}
          className="pv-drift"
          style={{ animationDelay: `${(i % 5) * 0.4}s` }}
        />
      ))}
    </svg>
  );
}

function VisualStyles() {
  return (
    <style>{`
      .pv-node { animation: pvNode 2.4s ease-in-out infinite; }
      @keyframes pvNode { 0%,100%{ opacity:.55 } 50%{ opacity:1 } }
      .pv-twinkle { animation: pvTwinkle 2.8s ease-in-out infinite; opacity:.25; }
      @keyframes pvTwinkle { 0%,100%{ opacity:.2 } 50%{ opacity:.95 } }
      .pv-drift { animation: pvDrift 4s ease-in-out infinite; }
      @keyframes pvDrift { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-4px) } }
      @media (prefers-reduced-motion: reduce) {
        .pv-node,.pv-twinkle,.pv-drift { animation: none; }
        .pv-pulse { display:none; }
        .pv-twinkle { opacity:.6; }
      }
    `}</style>
  );
}
