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

// Tuned against reflex-template.framer.ai (offline preview renders).
// All lengths are in units of canvas height. The ring is a flattened
// ellipse (a tunnel seen at an angle). The page's own star layer shows
// through, so the shader draws no stars of its own.
const float CY      = 0.5143;  // ring centre, from the top of the canvas
const float R       = 0.2286;  // photon ring (horizontal radius)
const float SQUASH  = 1.45;    // vertical flattening
const vec3  HORIZON = vec3(0.043, 0.016, 0.149); // #0B0426

vec3 hex(float r, float g, float b) { return vec3(r, g, b) / 255.0; }

float band(float r, float k, float w) {
  float d = (r - R * k) / w;
  return exp(-d * d);
}

void main() {
  float H = u_res.y;
  vec2 uv = gl_FragCoord.xy / H;
  vec2 c = vec2(0.5 * u_res.x / H, 1.0 - CY);
  vec2 p = uv - c - u_mouse * 0.01;

  float r = length(vec2(p.x, p.y * SQUASH));
  float a = atan(p.y * SQUASH, p.x);
  float up = clamp(sin(a), 0.0, 1.0);
  float topB = 0.75 + 0.25 * up;
  float t = u_time;
  float turb = 0.8 + 0.2 * (0.5 * sin(a * 5.0 + t * 0.4 + r * 28.0)
                          + 0.3 * sin(a * 9.0 - t * 0.25)
                          + 0.2 * sin(a * 3.0 + t * 0.15));
  float tb = topB * turb;

  vec3 col = vec3(0.0);
  // faint inner tunnel rings
  col += hex(91.0, 63.0, 224.0)  * band(r, 0.82, 0.0029) * 0.22 * tb;
  col += hex(106.0, 76.0, 255.0) * band(r, 0.90, 0.0029) * 0.30 * tb;
  // main lavender ring + violet bands, with a dark gap between them
  col += hex(232.0, 224.0, 255.0) * band(r, 1.00, 0.0057) * 1.60 * tb;
  col += hex(156.0, 134.0, 255.0) * band(r, 1.07, 0.0086) * 0.70 * tb;
  col += hex(91.0, 63.0, 224.0)  * band(r, 1.26, 0.0200) * 1.10 * tb;
  col += hex(124.0, 92.0, 255.0) * band(r, 1.42, 0.0143) * 0.35 * tb;
  // soft halo outside the ring
  float outside = step(R, r);
  col += hex(82.0, 51.0, 224.0) * exp(-max(r - R, 0.0) / 0.0786) * 0.50 * topB * outside;
  // faint glow just inside the ring
  col += hex(58.0, 30.0, 154.0) * exp(-max(R - r, 0.0) / 0.0429) * 0.18 * topB * (1.0 - outside);
  // thin photon ring highlight
  col += hex(244.0, 240.0, 255.0) * band(r, 1.00, 0.0026) * 0.90 * (0.55 + 0.45 * up);

  // event horizon: dark interior that still keeps a little of the inner rings
  float hz = smoothstep(R * 0.97 + 0.003, R * 0.97 - 0.003, r);
  col = col * (1.0 - hz) + HORIZON * hz + col * hz * 0.35;

  col = vec3(1.0) - exp(-col * 1.25);

  // fade into the page at the canvas edges (no hard cut-off)
  float fromTop = (u_res.y - gl_FragCoord.y) / H;
  float fromSide = min(gl_FragCoord.x, u_res.x - gl_FragCoord.x) / H;
  float m = pow(clamp(fromTop / 0.243, 0.0, 1.0), 1.5)
          * pow(clamp(fromSide / 0.314, 0.0, 1.0), 1.5);

  float alpha = clamp(max(hz, max(max(col.r, col.g), col.b) * 1.5), 0.0, 1.0) * m;
  outColor = vec4(col * m, alpha); // premultiplied
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

// The shader loop is only worth running on real GPU hardware. On software
// renderers (SwiftShader / llvmpipe, which is also what PageSpeed and many
// low-end devices use) it blocks the main thread for tens of seconds, so we
// bail out to the CSS arc fallback.
const SOFTWARE_RE = /SwiftShader|llvmpipe|Software|Basic Render|ANGLE \(Software/i;

function deviceAllowsWebGL(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    hardwareConcurrency?: number;
  };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  return true;
}

function onIdle(cb: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const handle = w.requestIdleCallback(cb);
    return () => w.cancelIdleCallback?.(handle);
  }
  const t = window.setTimeout(cb, 200);
  return () => window.clearTimeout(t);
}

export function BlackHole({
  className = "",
  onReady,
}: {
  className?: string;
  onReady?: () => void;
}) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    if (!deviceAllowsWebGL()) return; // Save-Data / low-core → CSS arc
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Defer all GL work until the page has loaded and the main thread is idle,
    // so it never competes with hydration or LCP.
    const begin = () => {
      if (disposed) return;
      cleanup = setupGL();
    };
    let cancelIdle = () => {};
    const startWhenReady = () => {
      cancelIdle = onIdle(begin);
    };
    if (document.readyState === "complete") {
      startWhenReady();
    } else {
      window.addEventListener("load", startWhenReady, { once: true });
    }

    function setupGL(): (() => void) | undefined {
    const cv = canvas as HTMLCanvasElement;
    const gl = cv.getContext("webgl2", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return; // no WebGL2 (or major perf caveat) → CSS arc fallback

    // Refuse software renderers outright.
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (dbg) {
      const renderer = String(
        gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || ""
      );
      if (SOFTWARE_RE.test(renderer)) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return;
      }
    }

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
      const w = Math.max(1, Math.floor(cv.clientWidth * dpr));
      const h = Math.max(1, Math.floor(cv.clientHeight * dpr));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
      }
      gl.viewport(0, 0, cv.width, cv.height);
    };

    let signalled = false;
    const draw = (tSeconds: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, tSeconds);
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!signalled) {
        signalled = true;
        readyRef.current?.(); // first good frame → Hero can hide the CSS arc
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();

    const destroyGL = () => {
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs!);
      gl.deleteShader(fs!);
      gl.deleteBuffer(buf);
    };

    // Reduced motion: draw a single still frame and stop.
    if (reduce) {
      draw(8.0);
      return destroyGL;
    }

    const start = performance.now();
    let raf = 0;
    let running = false;
    let last = 0;
    const FRAME_MS = 1000 / 30; // cap at 30fps

    // Frame-budget guard: sample the first 20 frames; if the average is over
    // 24ms (software/low-end), freeze on a still frame and stop the loop.
    let probed = 0;
    let probeSum = 0;
    let probePrev = 0;
    let giveUp = false;

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);

      // budget probe
      if (!giveUp && probed < 20) {
        if (probePrev) {
          probeSum += now - probePrev;
          probed += 1;
          if (probed === 20 && probeSum / 20 > 24) {
            giveUp = true;
            draw(8.0); // leave one good frame
            stop();
            return;
          }
        }
        probePrev = now;
      }

      // 30fps throttle
      if (now - last < FRAME_MS) return;
      last = now;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      draw((now - start) / 1000);
    };
    const play = () => {
      if (running || giveUp) return;
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
    io.observe(cv);
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      destroyGL();
    };
    } // end setupGL

    return () => {
      disposed = true;
      cancelIdle();
      window.removeEventListener("load", startWhenReady);
      cleanup?.();
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
