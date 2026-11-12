// Shared motion tokens. Every animated component imports from here
// instead of hard-coding durations, easings or springs.

export const ease = [0.22, 1, 0.36, 1] as const; // expo-out

export const dur = { fast: 0.35, base: 0.6, slow: 0.9 } as const;

export const stagger = { words: 0.05, items: 0.06 } as const;

export const spring = { stiffness: 120, damping: 20, mass: 0.4 } as const;

export const viewportOnce = { once: true, margin: "-80px" } as const;
