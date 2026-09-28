import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

function Progress({ className, value, indicatorClassName, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        /* The sheen along the top edge is what makes the bar read as a filling
         * tube rather than a flat rectangle, and one site wants it while the
         * other does not — so it is a colour variable that defaults to
         * transparent. The pseudo-element is always in the markup; on a site
         * that sets nothing it simply paints nothing. */
        className={cn(
          "bg-primary relative h-full w-full flex-1 rounded-[var(--progress-radius,0)] transition-all duration-[var(--progress-ease-ms,150ms)] ease-out",
          "before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:rounded-[var(--progress-radius,0)] before:bg-[var(--progress-sheen,transparent)] before:content-['']",
          indicatorClassName,
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
