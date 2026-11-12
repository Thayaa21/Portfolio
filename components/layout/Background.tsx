export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base colour */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* star / noise layer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 0.5px, transparent 0.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* large violet glow behind the hero */}
      <div
        className="absolute left-1/2 top-[-10%] h-[700px] w-[1100px] max-w-[140vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(45% 55% at 50% 40%, rgba(138,114,255,0.22), transparent 70%)",
        }}
      />
    </div>
  );
}
