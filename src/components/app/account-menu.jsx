import * as React from "react"

import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

/**
 * Who is signed in: the picture, the name, and one line under it.
 *
 * This block is drawn twice in every profile menu there has ever been — once
 * in the sidebar row that opens the menu, and again at the top of the menu it
 * opens, so the panel still says whose account it is once it covers the row
 * that said so. Both sites had both copies written out longhand, which is four
 * places for the avatar radius to disagree in.
 *
 * `sub` is the site's to decide. When Google has signed someone in it is
 * usually their email; when it has not, it is whatever that site means by not
 * being connected, and the two sites mean genuinely different things by it —
 * see DRIVE_STATUS_LABEL in lib/drive-status.js.
 */
export function AccountIdentity({ name, sub, picture, initial, className }) {
  const letter = initial || String(name || "?").slice(0, 1).toUpperCase()
  return (
    <>
      <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
        {picture ? <AvatarImage src={picture} alt="" referrerPolicy="no-referrer" /> : null}
        <AvatarFallback className="rounded-lg bg-primary/15 text-primary font-semibold">{letter}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{name}</span>
        {sub ? <span className="text-muted-foreground truncate text-xs">{sub}</span> : null}
      </div>
    </>
  )
}

/**
 * The account menu: a trigger you supply, and a panel that opens beside it on
 * a desktop and below it on a phone.
 *
 * Everything above the separator is fixed, because it is the same question on
 * every site — whose account is this. Everything below it is `children`, and
 * that is not a shortcut. One site's menu is a single row to its Drive
 * settings page, deliberately, after a version with four rows let one tap
 * disconnect a child's work with nothing asked; the other has Sync now, Open
 * file in Drive and Sign out. A template that shipped either set would quietly
 * impose it on the other site the first time someone adopted it.
 *
 * `trigger` is a slot for the same reason the top bar's is: it is a sidebar
 * button, and a sidebar imported twice is two React contexts.
 */
export function AccountMenu({ name, sub, picture, initial, isMobile, trigger, className, children, ...props }) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg", className)}
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AccountIdentity name={name} sub={sub} picture={picture} initial={initial} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
