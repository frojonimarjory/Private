"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type BentoSize = "large" | "wide" | "tall" | "small";

const sizeClasses: Record<BentoSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  small: "",
};

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[220px]">
      {children}
    </div>
  );
}

export function BentoCell({
  size = "small",
  index = 0,
  children,
}: {
  size?: BentoSize;
  index?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative overflow-hidden bg-muted ${sizeClasses[size]}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Assign bento sizes to a list of works for a magazine-style layout.
 * Designed to fill a 4-column grid without gaps.
 */
export function assignBentoSizes(count: number): BentoSize[] {
  // 4-col grid with dense auto-flow.
  // Cells: large=4, tall=2, wide=2, small=1
  const patterns: Record<number, BentoSize[]> = {
    // 8 items = 16 cells = 4 rows: large(4)+small(1)+small(1)+small(1)+small(1) + wide(2)+small(1)+small(1)+wide(2)
    8: ["large", "small", "small", "small", "small", "wide", "small", "small"],
  };
  // Default repeating pattern for any count
  const fallback: BentoSize[] = [
    "large", "tall", "small", "small",
    "wide", "small", "small",
    "wide", "small", "small", "wide",
  ];
  const pattern = patterns[count] ?? fallback;
  return Array.from({ length: count }, (_, i) => pattern[i % pattern.length]);
}
