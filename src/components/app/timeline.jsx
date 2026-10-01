import * as React from "react"

import { cn } from "../../lib/utils"

/* The rail a path is drawn on.
 *
 * Both sites tell the same shape of story: a line down the left, a dot for each
 * thing that happened, the thing itself beside it. Learning marks lessons
 * finished; volunteering marks hours given, badges earned and what is still to
 * come. Only the markers differ, so only the markers are the caller's business —
 * the line, its position and the gap it leaves at either end live here, because
 * a rail that is half a pixel off in one app and not the other is the kind of
 * difference nobody can see and everybody can feel. */

/** Dot diameter in px. The line is centred on it, so both come from this one number. */
export const DOT = 18

export function Timeline({ children, className, ...props }) {
  return (
    <div className={cn("relative flex flex-col gap-5", className)} {...props}>
      {/* Inset top and bottom so the line starts and ends inside the first and last dot
          rather than trailing off past them. */}
      <span aria-hidden className="bg-border absolute top-3 bottom-3 w-px" style={{ left: DOT / 2 }} />
      {children}
    </div>
  )
}

/**
 * One marker on the rail.
 * @param {"solid"|"open"|"dashed"} variant  filled (a milestone), outlined (something done), dashed (still to come)
 * @param {string} [color]                   outline colour for `open`, e.g. the organization's own
 */
export function TimelineDot({ variant = "open", color, className, children }) {
  return (
    <span
      className={cn(
        "box-border flex size-full items-center justify-center rounded-full border-2",
        variant === "solid" && "border-primary bg-primary text-primary-foreground",
        variant === "dashed" && "border-muted-foreground/40 border-dashed bg-background text-muted-foreground",
        variant === "open" && "border-border bg-background",
        className,
      )}
      style={variant === "open" && color ? { borderColor: color } : undefined}
    >
      {children}
    </span>
  )
}

/** A row on the rail: its dot, then whatever the row is about. */
export function TimelineRow({ dot, children, className, ...props }) {
  return (
    <div className={cn("relative flex items-start gap-3", className)} {...props}>
      <span className="z-10 mt-0.5 flex shrink-0 items-center justify-center" style={{ width: DOT, height: DOT }}>
        {dot ?? <TimelineDot />}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
