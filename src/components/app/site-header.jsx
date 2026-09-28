import * as React from "react"
import { Home } from "lucide-react"

import { cn } from "../../lib/utils"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Separator } from "../ui/separator"

/**
 * The trail, with the rule that makes it survive a phone.
 *
 * A breadcrumb that wraps to a second line pushes the whole header down and
 * looks broken, so past two crumbs everything but the last two collapses and
 * the root is redrawn as a house icon — you can always still get home in one
 * tap, which is the only thing a trail has to guarantee. Getting that right is
 * about fifteen lines of index arithmetic, and it was fifteen lines in each
 * site, character for character, including the `i > 1` in the separator test
 * that stops a stray chevron appearing beside the house.
 *
 * Every crumb is a real href as well as an onClick, so a middle-click or a
 * copied link behaves, and only the last one is inert.
 */
export function Crumbs({ trail, onNavigate, pageClassName }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {trail.map((cr, i) => {
          const last = i === trail.length - 1
          const hideOnMobile = trail.length > 2 && i < trail.length - 2
          const nav = (e) => { e.preventDefault(); onNavigate(cr.path, e) }
          return (
            <React.Fragment key={cr.path}>
              {i > 0 && <BreadcrumbSeparator className={cn(hideOnMobile && i > 1 && "hidden md:block")} />}
              {i === 0 && hideOnMobile && (
                <BreadcrumbItem className="md:hidden">
                  <BreadcrumbLink href="#/" onClick={nav} aria-label={cr.label} data-testid="crumb-home"><Home className="size-4" /></BreadcrumbLink>
                </BreadcrumbItem>
              )}
              <BreadcrumbItem className={cn(hideOnMobile && "hidden md:inline-flex")}>
                {last ? (
                  <BreadcrumbPage className={cn("font-medium", pageClassName)}>{cr.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={"#" + cr.path} onClick={nav}>{cr.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/**
 * The bar across the top: sidebar toggle, trail, and whatever the site keeps
 * on the right.
 *
 * `trigger` is a slot rather than an import on purpose. It is the one thing in
 * here that renders a button, and the two sites disagree about buttons — see
 * ui-provider.jsx. Passing it in also keeps this shell usable by a site whose
 * sidebar is its own module, which matters more than it sounds: two copies of
 * sidebar.jsx are two different React contexts, and a trigger from one of them
 * inside a provider from the other does not toggle anything.
 */
export function SiteHeaderTemplate({ trail, onNavigate, trigger, className, crumbPageClassName, children }) {
  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur",
        className,
      )}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {trigger}
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        {trail ? <Crumbs trail={trail} onNavigate={onNavigate} pageClassName={crumbPageClassName} /> : null}
        <div className="ml-auto flex items-center gap-1.5">{children}</div>
      </div>
    </header>
  )
}
