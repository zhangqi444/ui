import * as React from "react"
import { Lock } from "lucide-react"

import { cn } from "../lib/utils"

/* The disc a badge lives on: filled and coloured once earned, dashed and locked before.
 * Identical in learning and volunteer apart from where the lines wrapped. */

/**
 * @param {{done:boolean}} b     the badge
 * @param {number} size          diameter in px
 * @param {React.ReactNode} icon what to show when earned; a lock is shown when not
 */
export function Medallion({ b, size = 56, icon = null, className }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        b.done ? "border-primary/40 bg-primary/10 text-primary" : "border-dashed border-muted-foreground/25 bg-muted/40 text-muted-foreground/50",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {b.done ? icon : <Lock className="size-4" />}
    </div>
  )
}
