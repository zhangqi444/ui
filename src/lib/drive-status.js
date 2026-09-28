/* The seven states a Drive-backed site can be in, and the words for them.
 *
 * Every site that keeps its data in the user's own Google Drive goes through
 * the same sequence — not signed in, asking Google, uploading, mirrored, hour
 * expired, failed, unavailable — and each one had written its own ladder of
 * nested ternaries for the label, the icon and the disabled state, three times
 * over per site (desktop chip, phone icon, profile menu). Six of the seven
 * sentences were already word-for-word identical across two sites; they got
 * that way by being copied, which is exactly how they would have drifted.
 *
 * `local` is the one that is genuinely different, and it is worth saying why
 * rather than averaging it away. The learning site works offline first: with
 * no Drive her practice is still saved, on the device, so `local` there reads
 * "Saved on this device". The giving site cannot do anything until Google says
 * who you are, so the same state reads "Not signed in". Both are true; neither
 * is the default. Hence `labels` overrides rather than one blessed map.
 */

export const DRIVE_STATES = ["local", "connecting", "syncing", "live", "expired", "error", "unavailable"]

/** Connecting and syncing are the two states where a click would race the
 *  request that is already in flight, so every control is disabled in them. */
export function driveBusy(status) {
  return status === "connecting" || status === "syncing"
}

/** The short form, on the button in the top bar. */
export const DRIVE_CHIP_LABEL = {
  local: "Save to Drive",
  connecting: "Connecting…",
  syncing: "Syncing…",
  live: "Saved to Drive",
  expired: "Reconnect Drive",
  error: "Retry Drive",
  unavailable: "Drive unavailable",
}

/** The long form: the accessible name of the icon-only phone button, and the
 *  line under the account name in the profile menu. */
export const DRIVE_STATUS_LABEL = {
  local: "Saved on this device",
  connecting: "Connecting to Google…",
  syncing: "Syncing with Drive…",
  live: "Saved to Google Drive",
  expired: "Drive session expired — reconnect",
  error: "Drive sync failed",
  unavailable: "Drive unavailable here",
}

/** Merge a site's overrides over one of the maps above. Passing nothing gives
 *  the shared wording, which is the point — a site overrides the one or two
 *  states it genuinely reads differently, not all seven. */
export function driveLabels(base, overrides) {
  return overrides ? { ...base, ...overrides } : base
}
