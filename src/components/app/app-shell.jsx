import * as React from "react"

import { cn } from "../../lib/utils"
import { SidebarInset as DefaultInset, SidebarProvider as DefaultProvider } from "../ui/sidebar"

/**
 * Sidebar, top bar, and the column the pages are drawn in.
 *
 * The two sites had this identical down to the nesting: provider, sidebar,
 * inset, header, and then three wrapper divs whose job is easy to lose —
 * `flex-1` twice so a short page still pushes the footer of the inset to the
 * bottom, `@container/main` so a page can size to the content column rather
 * than the window (which is not the same thing once a sidebar is open), and
 * only then the padding. Copy that stack slightly wrong and nothing looks
 * broken until a page is shorter than the viewport.
 *
 * The only real difference between them was the sidebar's width, so that is a
 * prop, and the two sizes stay where they were.
 *
 * `provider` and `inset` can be swapped for a site's own sidebar module. That
 * is not politeness: SidebarProvider publishes its open/closed state through a
 * React context, and a second copy of sidebar.jsx creates a second context, so
 * a provider from this package wrapped around a sidebar from the site's own
 * copy renders a toggle that toggles nothing and a sidebar that never opens.
 * Until a site has moved its sidebar over, it passes its own pair here.
 */
export function AppShell({
  sidebar,
  header,
  sidebarWidth = "calc(var(--spacing) * 64)",
  headerHeight = "calc(var(--spacing) * 12)",
  provider: Provider = DefaultProvider,
  inset: Inset = DefaultInset,
  className,
  contentClassName,
  style,
  children,
}) {
  return (
    <Provider style={{ "--sidebar-width": sidebarWidth, "--header-height": headerHeight, ...style }}>
      {sidebar}
      <Inset className={className}>
        {header}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className={cn("flex flex-1 flex-col p-4 md:p-6", contentClassName)}>{children}</div>
          </div>
        </div>
      </Inset>
    </Provider>
  )
}
