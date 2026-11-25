"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Wraps the app once. Honours the visitor's `prefers-reduced-motion` setting
 * and loads Motion's animation features lazily to keep client JS small.
 */
export function MotionProvider({ children }: WithChildren) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
