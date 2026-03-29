import { NextResponse } from "next/server"

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function parseTags(input: unknown) {
  if (!input) return []

  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

export function requireString(value: unknown, fieldName: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required`)
  }

  return value.trim()
}
