/* The level ladder, without the rungs. Every site that rewards effort computes a level
 * the same way — find the highest threshold reached, then measure the distance to the
 * next one — but each tunes its own thresholds and titles to its own kind of work, so
 * the table is an argument rather than a constant. */

/**
 * @param {number} points  lifetime effort points; spending never lowers it
 * @param {Array<{n:number,title:string,at:number}>} levels  ascending by `at`
 */
export function levelOf(points, levels) {
  let i = 0
  for (let k = 0; k < levels.length; k++) if (points >= levels[k].at) i = k
  const cur = levels[i], next = levels[i + 1] || null
  const span = next ? next.at - cur.at : 1
  return { ...cur, next, into: points - cur.at, span, pct: next ? Math.min(100, Math.round(((points - cur.at) / span) * 100)) : 100 }
}
