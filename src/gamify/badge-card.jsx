import * as React from "react"

import { cn } from "../lib/utils"
import { Progress } from "../components/ui/progress"
import { Medallion } from "./medallion"

/* One badge in a list: the disc, the name, and either when it was earned or how far
 * there is to go. The two sites differed in exactly two places — one printed a unit
 * after the count and the other did not, and each sliced its own timestamps — so both
 * arrive as props rather than being decided here. */

/**
 * @param {object} b            badge: { id, name, desc, icon, need, have, pct, done, unit }
 * @param {React.ReactNode} icon  rendered inside the medallion when earned
 * @param {string} earnedLabel    already-formatted date, shown in place of the progress count
 */
export function BadgeCard({ b, icon = null, earnedLabel = "earned" }) {
  return (
    <li
      className={cn("flex items-start gap-3 rounded-lg border p-3", b.done ? "bg-card" : "bg-muted/20")}
      data-testid="badge" data-done={b.done ? "1" : "0"} data-id={b.id}
    >
      <Medallion b={b} size={48} icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className={cn("text-sm font-medium", !b.done && "text-muted-foreground")}>{b.name}</span>
          {b.done
            ? <span className="text-muted-foreground shrink-0 text-xs">{earnedLabel}</span>
            : <span className="text-muted-foreground shrink-0 text-xs tabular-nums">{Math.min(b.have, b.need)}/{b.need}{b.unit ? ` ${b.unit}` : ""}</span>}
        </div>
        <span className="text-muted-foreground text-xs">{b.desc}</span>
        {!b.done ? <Progress value={b.pct} className="mt-0.5 h-1" /> : null}
      </div>
    </li>
  )
}
