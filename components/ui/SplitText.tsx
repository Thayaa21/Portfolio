"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease, stagger, viewportOnce } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "span" | "p";

/**
 * Reveals a string word by word: each word sits in an overflow-hidden
 * inline-block and slides up from 100% while un-blurring and fading in.
 * The full text stays in the DOM (one visually-hidden copy) for screen
 * readers; the animated words are aria-hidden.
 */
export function SplitText({
  text,
  highlight,
  as = "h2",
  className = "",
  delayChildren = 0,
}: {
  text: string;
  /** Optional trailing phrase rendered with the gradient text style. */
  highlight?: string;
  as?: Tag;
  className?: string;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const Tag = as;

  const words = text.split(" ").filter(Boolean);
  const highlightWords = highlight ? highlight.split(" ").filter(Boolean) : [];
  const fullText = highlight ? `${text} ${highlight}` : text;

  if (reduce) {
    return (
      <Tag className={className}>
        {text}
        {highlight ? (
          <>
            {" "}
            <span className="grad-text">{highlight}</span>
          </>
        ) : null}
      </Tag>
    );
  }

  const wordVariants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
    show: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease },
    },
  };

  const renderWord = (word: string, key: string, highlighted: boolean) => (
    <span
      key={key}
      className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
    >
      <motion.span
        variants={wordVariants}
        className={`inline-block ${highlighted ? "grad-text" : ""}`}
      >
        {word}
      </motion.span>
      <span className="inline-block">&nbsp;</span>
    </span>
  );

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ staggerChildren: stagger.words, delayChildren }}
      aria-label={fullText}
    >
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={`w-${i}`}>{renderWord(w, `w-${i}`, false)}</Fragment>
        ))}
        {highlightWords.map((w, i) => (
          <Fragment key={`h-${i}`}>{renderWord(w, `h-${i}`, true)}</Fragment>
        ))}
      </span>
    </MotionTag>
  );
}

/**
 * Fades and rises a block of content in, intended to run just after a
 * heading's SplitText. Plays once.
 */
export function FadeUp({
  children,
  className = "",
  delay = 0.1,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}
