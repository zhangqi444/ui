# @zhangqi444/ui

The UI primitives shared by [learning](https://github.com/zhangqi444/learning),
[volunteer](https://github.com/zhangqi444/volunteer) and
[the-little-me](https://github.com/zhangqi444/the-little-me).

Source only — no build step. The consuming site's Vite and Tailwind already
compile JSX and scan for class names, so shipping a bundle here would mean
compiling twice and would hide the class strings from Tailwind's scanner.

```js
import { Button } from "@zhangqi444/ui/ui/button"
import { cn } from "@zhangqi444/ui/lib/utils"
```

Tailwind must be told to scan this package, or the classes these components
name will have no CSS generated for them:

```css
@source "../node_modules/@zhangqi444/ui/src";
```

## What is in here, and why only this

Sixteen of these were byte-identical in `learning` and `volunteer` — untouched
shadcn output that nobody had reason to change. That is the evidence for calling
them generic, rather than a judgement about what *ought* to be shared.

`button` is here for a different reason: `sidebar` imports it, so a package with
one and not the other does not work. It is seeded from `learning`, whose version
differs from `volunteer`'s in ways that are *already* CSS variables — the press
shadow is `0 var(--lift) 0 0 var(--primary-press)`, so a site that wants a flat
button sets `--lift: 0px` rather than forking the file.

## Before volunteer or the-little-me adopt this

Two of `learning`'s button choices are **not** variables yet and would be
imposed on the others as-is:

- `rounded-lg` vs volunteer's `rounded-md`
- `font-semibold` vs volunteer's `font-medium`

Tokenise those (`--btn-radius`, `--btn-weight`) before the second site adopts.
Until then this package encodes one site's taste, which is fine while one site
uses it and a bug the moment two do.

## Deliberately not here

`badge`, `card`, `dialog` and `progress` differ between the sites today. Those
differences are skin, not behaviour, but they have not been reduced to variables
yet, so the sites keep their own copies until they have been.
