"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

// Reflex-style black hole: lensed twinkling stars, a dark event horizon,
// a thin photon ring, three turbulent violet accretion bands and a halo,
// tone-mapped onto the page background.
const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

const vec3 BG      = vec3(0.016, 0.0, 0.078);   // #040014
const vec3 HORIZON = vec3(0.047, 0.020, 0.188); // #0C0530
const vec3 STAR    = vec3(0.957, 0.941, 1.0);   // #F4F0FF
const vec3 RINGLO  = vec3(1.0);                 // #FFFFFF
const vec3 RINGHI  = vec3(0.863, 0.824, 1.0);   // #DCD2FF
const vec3 BAND1   = vec3(0.749, 0.694, 1.0);   // #BFB1FF
const vec3 BAND2   = vec3(0.541, 0.447, 1.0);   // #8A72FF
const vec3 BAND3   = vec3(0.486, 0.361, 1.0);   // #7C5CFF

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// simple value-noise fbm
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) { v += amp * noise(p); p *= 2.0; amp *= 0.5; }
  return v;
}

float starLayer(vec2 q, float density, float rate) {
  vec2 g = q * density;
  vec2 cell = floor(g);
  float h = hash21(cell);
  vec2 center = cell + 0.5 + 0.35 * vec2(hash21(cell + 1.3) - 0.5, hash21(cell + 7.1) - 0.5);
  float d = length(g - center);
  float star = smoothstep(0.08, 0.0, d) * step(0.78, h);
  float tw = 0.6 + 0.4 * sin(u_time * rate + h * 6.2831);
  return star * tw;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  // centre low so the console covers the lower half; nudge toward pointer
  p.y += 0.30;
  p -= u_mouse * 0.02;

  float r = length(p);
  float a = atan(p.y, p.x);

  // gravitational lensing of the star field
  vec2 q = p * (1.0 + 0.045 / (r * r + 0.002));

  vec3 col = BG;

  // stars (2 layers), hidden later by the horizon
  float stars = starLayer(q, 9.0, 2.3) + starLayer(q + 3.7, 15.0, 1.6) * 0.7;
  col += STAR * stars * 0.9;

  float R = 0.20;

  // halo
  col += BAND3 * exp(-max(r - R, 0.0) * 5.5) * 0.35;

  // accretion bands (gaussian rings, turbulent, side-brightened)
  float turb = mix(0.55, 1.0, fbm(vec2(a * 3.0 + u_time * 0.12, r * 9.0 - u_time * 0.05)));
  float side = 1.0 + 0.35 * cos(a - u_time * 0.3);
  col += BAND1 * exp(-pow((r - R * 1.18) / 0.018, 2.0)) * 0.9 * turb * side;
  col += BAND2 * exp(-pow((r - R * 1.34) / 0.03,  2.0)) * 0.6 * turb * side;
  col += BAND3 * exp(-pow((r - R * 1.55) / 0.05,  2.0)) * 0.35 * turb * side;

  // photon ring
  float ring = exp(-pow((r - R * 1.06) / 0.0055, 2.0)) * 1.6;
  col += mix(RINGLO, RINGHI, 0.5 + 0.5 * sin(a + u_time * 0.2)) * ring;

  // event horizon disc (hides stars behind it)
  float horizon = smoothstep(R, R - 0.01, r);
  col = mix(col, HORIZON, horizon);

  // tone map
  col = vec3(1.0) - exp(-col * 1.4);

  // keep it an arch: fade the top and the far field back to background
  float topFade = smoothstep(-0.05, 0.45, p.y + 0.30);
  float vig = smoothstep(1.1, 0.3, r);
  float mask = clamp(topFade, 0.0, 1.0) * vig;
  col = mix(BG, col, mask);

  // Alpha from brightness above BG plus the horizon, so the canvas
  // composites as an arch over the page glow (no hard rectangle).
  vec3 lift = max(col - BG, 0.0);
  float horizonA = smoothstep(R, R - 0.01, r);
  float alpha = clamp(max(max(lift.r, lift.g), lift.b) * 2.2 + horizonA, 0.0, 1.0);
  alpha *= mask;
  outColor = vec4(col * alpha, alpha); // premultiplied
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function BlackHole({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return; // no WebGL2 → CSS arc fallback stays visible

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied alpha

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const SCALE = 0.75;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * SCALE;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (tSeconds: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, tSeconds);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Reduced motion: draw a single still frame and stop.
    if (reduce) {
      draw(8.0);
      return () => {
        ro.disconnect();
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      };
    }

    const start = performance.now();
    let raf = 0;
    let running = false;

    const loop = (now: number) => {
      // ease the pointer
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when off-screen or the tab is hidden.
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting && !document.hidden ? play() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [reduce]);

  // pointer → lensing centre (eased in the loop)
  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const host = canvas?.closest("section");
    if (!host) return;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.current.tx = Math.max(
        -1,
        Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))
      );
      mouse.current.ty = Math.max(
        -1,
        Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))
      );
    };
    const onLeave = () => {
      mouse.current.tx = 0;
      mouse.current.ty = 0;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* bottom gradient blends the canvas into the page */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(180deg, transparent, var(--color-bg))",
        }}
      />
      {/* crisp horizon overlay, as Reflex does, to keep the centre clean at any DPR */}
      <div
        className="absolute left-1/2 top-[62%] h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "#0C0530",
          maskImage:
            "radial-gradient(78% 78% at 50% 50%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(78% 78% at 50% 50%, #000 80%, transparent 100%)",
        }}
      />
    </div>
  );
}
