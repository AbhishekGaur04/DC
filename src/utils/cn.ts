// src/utils/cn.ts
/**
 * Simple class name merging utility.
 * Works like `clsx` but without external deps.
 * Filters out falsy values and joins the rest with spaces.
 */
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
