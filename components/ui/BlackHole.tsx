"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

// Reflex-style (Gargantua) black hole: dark horizon, lensed arcs, flat disk;
// a thin photon ring, three turbulent violet accretion bands and a halo,
// tone-mapped onto the page background.
const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

// Gargantua-style black hole, tuned side by side against
// reflex-template.framer.ai. Geometry is in "reference px" (Reflex's
// layout), scaled to this canvas. Disk line = canvas row at CY from the top.
const float CY = 0.5143;

vec3 C(float r, float g, float b) { return vec3(r, g, b) / 255.0; }
float G(float v, float w) { float d = v / w; return exp(-d * d); }

void main() {
  float H = u_res.y;
  float s = (H / 700.0) * 0.85;                 // canvas px per reference px
  vec2 c = vec2(0.5 * u_res.x, H * (1.0 - CY));
  vec2 q = (gl_FragCoord.xy - c) / s - u_mouse * 8.0;
  float x = q.x, y = q.y;
  float ya = max(y, 0.0);
  float above = step(0.0, y);
  float t = u_time;

  // lensed arcs flare outward where they meet the disk
  float flare = 1.0 + 0.38 * exp(-ya / 16.0);
  float d  = length(vec2(x / flare, y));
  float d0 = length(q);
  float dop   = 1.0 + 0.12 * tanh(x / 250.0);
  float flick = 0.93 + 0.07 * sin(t * 0.8 + x * 0.01);
  float k = above * dop * flick;

  vec3 col = vec3(0.0);
  col += C(241.0, 236.0, 255.0) * G(d - 150.0, 4.0) * 1.30 * k;
  col += C(185.0, 166.0, 255.0) * G(d - 154.0, 7.0) * 0.45 * k;
  col += C(143.0, 107.0, 255.0) * G(d - 176.0, 6.0) * 0.95 * k;
  col += C(106.0,  69.0, 240.0) * G(d - 194.0, 14.0) * 0.50 * k;
  col += C(106.0,  69.0, 240.0) * exp(-max(d - 150.0, 0.0) / 60.0) * 0.55 * above * step(176.0, d);
  col += C( 42.0,  22.0, 112.0) * 0.08 * above * step(118.0, d0) * step(d, 150.0);

  // bright wings at the base of the arcs
  col += C(233.0, 226.0, 255.0) * exp(-ya / 20.0) * G(abs(x) - 205.0, 85.0) * 0.85 * above * dop;

  // accretion disk: thin core, thick lumpy haze, lavender inner haze
  float lump = 0.75 + 0.25 * (0.6 * sin(x * 0.045 + t * 0.6) + 0.4 * sin(x * 0.11 - t * 0.42));
  col += vec3(1.0) * G(y, 2.0) * exp(-pow(abs(x) / 330.0, 1.6)) * 0.45 * dop;
  col += C(118.0, 80.0, 255.0) * G(y - 16.0, 28.0) * exp(-pow(abs(x) / 440.0, 1.4)) * lump * 1.5 * dop;
  col += C(201.0, 187.0, 255.0) * G(y - 9.6, 15.4) * G(abs(x) - 205.0, 153.0) * 0.55 * dop;

  // underside ring (shows through the glass console)
  col += C(143.0, 107.0, 255.0) * G(length(vec2(x, y + 80.0)) - 110.0, 12.0) * 0.22 * (1.0 - above);

  col = vec3(1.0) - exp(-col * 1.3);
  float alpha = clamp(max(col.r, max(col.g, col.b)) * 1.5, 0.0, 1.0);

  // event horizon (opaque) with a faint rim
  float hole = above * (1.0 - smoothstep(117.0, 119.5, d0));
  col = mix(col, C(6.0, 2.0, 15.0), hole);
  alpha = mix(alpha, 1.0, hole);
  col += C(59.0, 42.0, 138.0) * G(d0 - 115.0, 2.5) * 0.35 * above;

  // fade into the page at the canvas edges
  float fromTop  = (u_res.y - gl_FragCoord.y) / H;
  float fromBot  = gl_FragCoord.y / H;
  float fromSide = min(gl_FragCoord.x, u_res.x - gl_FragCoord.x) / H;
  float m = pow(clamp(fromTop / 0.243, 0.0, 1.0), 1.5)
          * pow(clamp(fromBot / 0.15, 0.0, 1.0), 1.5)
          * pow(clamp(fromSide / 0.25, 0.0, 1.0), 1.5);

  outColor = vec4(col * m, alpha * m); // premultiplied
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
    </div>
  );
}
