/* Reading a list of badges. The badges themselves are a site's own business — what counts
 * as an achievement in a learning app is not what counts in a volunteering one — but
 * "which is she closest to" and "how many has she got" are the same questions everywhere.
 *
 * A badge is `{ id, name, desc, icon, group, need, have, pct, done, at, unit }`. */

/** The badge she is closest to finishing: most progress first, then the cheapest.
 *  Falls back to the first unearned one when nothing has been started. */
export function nextBadge(list) {
  const open = list.filter((b) => !b.done && b.have > 0)
  open.sort((a, b) => b.pct - a.pct || a.need - b.need)
  return open[0] || list.find((b) => !b.done) || null
}

export function badgeCounts(list) {
  return { earned: list.filter((b) => b.done).length, total: list.length }
}

/** Badges earned within the last `days`, newest first — the "just earned" row. */
export function recentBadges(list, days = 3, now = Date.now()) {
  const cutoff = now - days * 86400000
  return list.filter((b) => b.done && b.at && Date.parse(b.at) >= cutoff).sort((a, b) => b.at.localeCompare(a.at))
}
