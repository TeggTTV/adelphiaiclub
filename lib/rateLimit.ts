// Simple in-memory sliding-window rate limiter.
// NOTE: This is per-process and not suitable for multi-instance production.
// For production use, replace with a centralized store (Redis, Upstash, etc.).

type WindowRecord = number[]

const store = new Map<string, WindowRecord>()

function now() {
  return Date.now()
}

/**
 * Check and record an event for the given key.
 * @param key unique key (e.g., ip:contact or email:contact)
 * @param limit max events allowed within windowMs
 * @param windowMs sliding window size in ms
 * @returns remaining count and boolean whether allowed
 */
export function checkRateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const ts = now()
  const windowStart = ts - windowMs
  const arr = store.get(key) || []
  // drop old timestamps
  let i = 0
  while (i < arr.length && arr[i] <= windowStart) i++
  const remainingArr = arr.slice(i)

  if (remainingArr.length >= limit) {
    // still update store to keep sliding window trimmed
    store.set(key, remainingArr)
    return { allowed: false, remaining: 0, retryAfterMs: remainingArr[0] + windowMs - ts }
  }

  // record this event
  remainingArr.push(ts)
  store.set(key, remainingArr)
  return { allowed: true, remaining: Math.max(0, limit - remainingArr.length), retryAfterMs: 0 }
}

/**
 * Utility to build an IP-based key from request headers.
 */
export function ipKey(ip: string | null | undefined, suffix = "") {
  const clean = (ip || "unknown").split(",")[0].trim()
  return `${clean}${suffix ? `:${suffix}` : ""}`
}
