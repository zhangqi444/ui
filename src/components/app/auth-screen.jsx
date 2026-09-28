import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"
import { useUi } from "./ui-provider"

/** Google's mark, at Google's colours. Identical in both sites down to the
 *  byte, because it is not ours to restyle: the brand guidelines fix the four
 *  path fills, and a sign-in button that draws it in the site's own palette is
 *  a sign-in button that looks like a phishing page. */
export function GoogleMark({ className, size = 18 }) {
  /* The width/height attributes are a floor, not a guarantee. Both sites'
   * buttons carry `[&_svg:not([class*='size-'])]:size-4`, which wins over an
   * attribute, so a mark handed to a button with no `size-` class in its
   * className renders at 16px whatever this says. Pass one to mean it. */
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/** The one button on the page. The mark becomes a spinner while Google has the
 *  window, so the control says what it is doing in the place the eye already
 *  is; the wording stays with the site, because the two do not stop at the
 *  same points ("Loading Google Sign-In…" only exists where the script has to
 *  be up before the button can mean anything). */
export function GoogleButton({ busy, className, markClassName, children, ...props }) {
  const { Button } = useUi()
  return (
    <Button size="lg" className={cn("w-full gap-3", className)} disabled={busy || props.disabled} {...props}>
      {busy ? <Loader2 className="animate-spin" /> : <GoogleMark className={markClassName} />}
      {children}
    </Button>
  )
}

/** Full-height, centred, one column no wider than a paragraph. `panelClassName`
 *  is where the two sites part company — one puts the column on a card over a
 *  gradient, the other stands it on the page background — so the shell takes
 *  the shape and leaves the surface alone. */
export function AuthScreen({ as: As = "div", className, panelClassName, children, ...props }) {
  return (
    <As className={cn("bg-background flex min-h-svh flex-col items-center justify-center p-6", className)} {...props}>
      <div className={cn("flex w-full max-w-md flex-col gap-6", panelClassName)}>{children}</div>
    </As>
  )
}

/** The wordmark row: what the site is, and anything it wants sitting opposite —
 *  a theme toggle, or, on the learning site, a cat that waits at the door and
 *  is promised nothing. */
export function AuthBrand({ icon, name, className, children }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {icon}
      <span className="text-lg font-semibold tracking-tight">{name}</span>
      {children ? <div className="ml-auto flex items-center">{children}</div> : null}
    </div>
  )
}

/**
 * The reassurance list under the headline. This is the part of a sign-in page
 * that earns the click — where the data goes, how little is being asked for,
 * what happens on the next device — and it is a list of an icon and a sentence
 * on every site that has one.
 *
 * `items` is `[{ icon, text }]`. The text may be a node, so a site can put the
 * weight where it wants it without the shell knowing what it says.
 */
export function AuthPoints({ items, className, itemClassName }) {
  return (
    <ul className={cn("flex flex-col gap-2.5 text-sm", className)}>
      {items.map((it, i) => (
        <li key={i} className={cn("flex items-start gap-2.5", itemClassName)}>
          {it.icon}
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  )
}
