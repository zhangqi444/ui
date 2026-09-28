# @zhangqi444/ui

The UI shared by [learning](https://github.com/zhangqi444/learning) and
[giving](https://github.com/zhangqi444/giving), in two layers:

- **`ui/*`** — shadcn primitives. A button, a table, a tooltip.
- **`app/*`** — the chrome those primitives get assembled into. A sign-in
  screen, a top bar, an account menu, the shell a page is drawn in.
- **`gamify/*`** — the parts of a reward system that do not depend on what is
  being rewarded: levels, badge progress, the disc a badge sits on.

Source only — no build step. The consuming site's Vite and Tailwind already
compile JSX and scan for class names, so shipping a bundle here would mean
compiling twice and would hide the class strings from Tailwind's scanner.

```js
import { Button } from "@zhangqi444/ui/ui/button"
import { SiteHeaderTemplate } from "@zhangqi444/ui/app/site-header"
import { cn } from "@zhangqi444/ui/lib/utils"
```

Tailwind must be told to scan this package, or the classes these components
name will have no CSS generated for them, and the site renders as unstyled
HTML while every test still passes:

```css
@source "../node_modules/@zhangqi444/ui/src";
```

Both sites run a `check_css.cjs` at the end of `npm run build` that fails if
the package's classes are missing from the stylesheet. Copy it when a third
site adopts this; the failure it catches is invisible to everything else.

## Gamification

`levels`, `badges`, `medallion` and `badge-card` are the parts of a reward system that
do not depend on what is being rewarded.

```js
import { levelOf } from "@zhangqi444/ui/gamify/levels"
import { nextBadge, badgeCounts, recentBadges } from "@zhangqi444/ui/gamify/badges"
import { BadgeCard } from "@zhangqi444/ui/gamify/badge-card"
```

What each site keeps is the part that is about it: its own `LEVELS` table, because a
volunteering hour and a practice question are not worth the same, and its own list of
badges, because an achievement in one is not an achievement in the other. `levelOf` takes
the table as an argument for that reason, and the badge helpers take the list.

`BadgeCard` and `Medallion` take their icon as a node rather than a name, so neither site
has to agree with the other about which lucide icon means "streak". `BadgeCard` also takes
an `earnedLabel` string instead of calling a date formatter — the two sites format dates
differently, which is the whole of the difference between their two copies.

## `ui/*` — what is in here, and why only this

Nineteen of these were byte-identical in both sites — untouched shadcn output
that nobody had reason to change. That is the evidence for calling them
generic, rather than a judgement about what *ought* to be shared.

`button` is here for a different reason: `sidebar` imports it, so a package
with one and not the other does not work. It is seeded from `learning`.

## `app/*` — templates, not components

These own **structure, state ladders and accessibility**. They own no copy, no
navigation, no menu items and no decision about what a click means. Everything
a site would disagree about is a slot.

That rule was not a preference, it was forced. The two account menus look the
same and do different things: one is a single row to a Drive settings page,
deliberately, after a version with four rows let one tap disconnect a child's
work with nothing asked and nothing said; the other has Sync now, Open file in
Drive and Sign out. A template that shipped either set would have imposed it on
the other site the moment it was adopted. So `AccountMenu` draws the panel and
the identity block, and takes the items as `children`.

| export | shares | leaves to the site |
| --- | --- | --- |
| `app/ui-provider` | which concrete `Button` the templates render | the button itself |
| `app/auth-screen` | `AuthScreen`, `AuthBrand`, `AuthPoints`, `GoogleButton`, `GoogleMark` | brand, copy, the label ladder |
| `app/drive-chip` | icon + label ladder, desktop and phone forms, disabled-while-busy | what a click does, tooltip copy |
| `app/account-menu` | `AccountIdentity`, the panel, side/align, the identity header | every menu item |
| `app/site-header` | sticky bar, `Crumbs` and its phone collapsing | the trail, the trigger, the actions |
| `app/app-shell` | provider → sidebar → inset → header → the three content wrappers | sidebar, header, width |
| `lib/drive-status` | the seven Drive states and six of their seven sentences | `local`, which genuinely differs |

### Two things are slots for a reason, not for taste

**The button.** `learning`'s is a sticker: `rounded-lg`, `font-semibold`,
`border-2`, and a hard offset shadow that shortens when pressed, built from six
CSS variables (`--lift`, `--lift-press`, and four `--*-press` hues). `giving`
defines **none of those six** and uses plain shadcn. A template that imported
`./button` directly would not be a template — it would be one site's button,
restyling the other site's chrome and blanking four shadows to `0 0 0 0`
because the variables behind them do not exist there. Hence `UiProvider`:

```jsx
const UI = { Button }              // module-level, so the context value is stable
<UiProvider value={UI}><App /></UiProvider>
```

A site that agrees with the package button wraps nothing and passes nothing.

**The sidebar.** `SidebarProvider` publishes open/closed through a React
context. A second copy of `sidebar.jsx` is a *second context*, so a provider
from this package wrapped around a sidebar from the site's own copy gives you
a trigger that toggles nothing. Until a site has moved its sidebar over,
`AppShell` takes `provider` and `inset`, and `SiteHeaderTemplate` and
`AccountMenu` take their sidebar-flavoured bits as slots.

## The standard these were held to

`giving`'s sign-in page, top bar, account menu and app shell were rewritten
onto these templates and **all fourteen screenshots came back byte-identical** —
sign-in, dashboard, the sidebar trigger and the open account menu, at desktop,
phone and dark — with all 156 of its checks still passing. A template that
cannot do that is not a template yet; it is a redesign wearing one's clothes.

## Deliberately not here

`dialog`, and `giving`'s `button` and `sidebar`. Those differ between the sites
today, and the differences are skin rather than behaviour, but they have not
been reduced to variables yet. The sites keep their own copies until they have
been — see the button note above for what happens when they do not.

`app-sidebar`, the navigation itself, is not here and should not be: 221 lines
in one site and 108 in the other, because they are different applications.
