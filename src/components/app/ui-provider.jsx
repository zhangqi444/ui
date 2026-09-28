import * as React from "react"

import { Button as DefaultButton } from "../ui/button"

/* Which concrete primitives the templates in this folder should render.
 *
 * The templates are shells: they own structure, state ladders and keyboard and
 * screen-reader behaviour, and they know nothing about what a site calls
 * itself or what goes in its menus. But a shell still has to render *some*
 * button, and the two sites do not agree on what a button is. The learning
 * site's is a sticker — rounded-lg, font-semibold, border-2, and a hard offset
 * shadow in its own hue that shortens when pressed, built out of six CSS
 * variables (--lift, --lift-press and four --*-press hues). The giving site
 * defines none of those six and uses plain shadcn: rounded-md, font-medium,
 * shadow-xs, no press.
 *
 * So a template that imported ./button directly would not be a template. It
 * would be the learning site's button, quietly restyling every control in the
 * other site's chrome and blanking four shadows to `0 0 0 0` because the
 * variables behind them do not exist there. Injecting it instead keeps the one
 * thing the sites genuinely share — the structure — and leaves the one thing
 * they have deliberately decided differently where it belongs, which is with
 * each site.
 *
 * The default is the package's own button, so a site that agrees with it wraps
 * nothing and passes nothing.
 */
const UiContext = React.createContext({ Button: DefaultButton })

export function UiProvider({ value, children }) {
  /* Memoised on the fields rather than the object, so a caller writing the
     natural `value={{ Button: MyButton }}` inline does not hand every consumer
     a new context object on every render. */
  const Button = (value && value.Button) || DefaultButton
  const merged = React.useMemo(() => ({ Button }), [Button])
  return <UiContext.Provider value={merged}>{children}</UiContext.Provider>
}

export function useUi() {
  return React.useContext(UiContext)
}
