import * as React from "react"

import { cn } from "../../lib/utils"

/* The surface is four CSS variables rather than four class names, because the
 * two sites genuinely disagree about it: one draws a card as a soft rectangle
 * (rounded-xl, a hairline border, a blurred shadow) and the other as a solid
 * object (rounded-2xl, a two-pixel border, a hard offset shadow in the border's
 * own colour). Neither is the default, and a package that picked one would be
 * restyling the other site the day it adopted this.
 *
 * A site that sets none of them gets the shadcn card it had before.
 */
function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 py-6",
        "rounded-[var(--card-radius,var(--radius-xl))] border-[length:var(--card-border,1px)] shadow-[var(--card-shadow,0_1px_2px_0_rgb(0_0_0/0.05))]",
        className,
      )}
      {...props}
    />
  )
}

/**
 * The action sits beside the title on a wide card and under it on a narrow one.
 *
 * That is a fix rather than a preference. The second grid track was `auto` —
 * max-content — so a header with a wide action gave the action whatever it
 * asked for and left the title the rest: on a 390px phone a "Start Verbal
 * Reasoning" button took half the card and broke the title across two lines
 * with its description running down a column four words wide. `min-w-0` on the
 * action does not fix it, because the track can then shrink but still takes
 * what it wants first.
 *
 * Keyed on `@container/main` — the content column — rather than a media query,
 * because what has run out is the card's room and not the window's: the same
 * card is narrow beside an open sidebar and wide without one. That is a
 * dependency on the consumer, and a soft one: AppShell in this package opens
 * that container, and a site without it simply gets the stacked layout
 * everywhere rather than a broken one. No CardAction in either site is
 * authored before its CardTitle, so stacking puts it under the text every time;
 * if one ever is, it will appear above the title and look like a header that
 * lost its heading.
 */
function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min items-start gap-1.5 px-6 @md/main:has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-[var(--card-title-weight,600)] tracking-[var(--card-title-tracking,normal)]", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-1 self-start justify-self-start @md/main:col-start-2 @md/main:row-span-2 @md/main:row-start-1 @md/main:justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
