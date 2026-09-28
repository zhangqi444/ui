import * as React from "react"
import { Cloud, CloudOff, Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"
import { DRIVE_CHIP_LABEL, DRIVE_STATUS_LABEL, driveBusy, driveLabels } from "../../lib/drive-status"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useUi } from "./ui-provider"

/** Cloud, struck-through cloud, or a spinner — with the hue carrying the state
 *  as well as the shape, because on a phone this icon is the whole control and
 *  there is no label beside it to read. */
export function DriveStatusIcon({ status, className }) {
  if (driveBusy(status)) return <Loader2 className={cn("animate-spin", className)} />
  if (status === "error") return <CloudOff className={cn("text-destructive", className)} />
  return <Cloud className={cn(status === "live" && "text-success", status === "expired" && "text-warning", className)} />
}

/**
 * The Drive state, as the top bar shows it: a labelled button from `sm` up and
 * the same button icon-only below that, so the state is never simply missing
 * on a phone.
 *
 * What this will not do is decide what the click means. One site opens its
 * Drive settings page when connected; the other signs out. That difference is
 * not an oversight to be unified — a chip reading "Saved to Drive" is a status
 * light, and on the site a child uses, one tap on it silently stopping the
 * mirroring with nothing asked and nothing said is the wrong behaviour. So
 * `onAct` and `tooltip` come from the site, and the shared part is the ladder:
 * which icon, which word, which variant, and when the control is dead because
 * a request is already in flight.
 */
export function DriveChip({ status, onAct, tooltip, labels, statusLabels, disabled, className, ...props }) {
  const { Button } = useUi()
  if (!status) return null

  const busy = driveBusy(status)
  const off = disabled == null ? busy : disabled
  const chip = driveLabels(DRIVE_CHIP_LABEL, labels)
  const long = driveLabels(DRIVE_STATUS_LABEL, statusLabels)
  const icon = <DriveStatusIcon status={status} />

  const wide = (
    <Button
      variant={status === "live" ? "secondary" : "outline"}
      size="sm"
      className={cn("hidden gap-2 sm:inline-flex", className)}
      disabled={off}
      onClick={onAct}
      {...props}
    >
      {icon}
      {chip[status]}
    </Button>
  )

  return (
    <>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>{wide}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        wide
      )}
      <Button
        variant="ghost"
        size="icon"
        className="size-8 sm:hidden"
        aria-label={long[status]}
        disabled={off}
        onClick={onAct}
      >
        {icon}
      </Button>
    </>
  )
}
