"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const gridSizeClasses = {
  small: "",
  medium: "md:col-span-1 md:row-span-2",
  large: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
};

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(200px,auto)]">
      {children}
    </div>
  );
}

export function BentoCell({
  size = "small",
  index = 0,
  children,
  className = "",
}: {
  size?: keyof typeof gridSizeClasses;
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 ${gridSizeClasses[size]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
