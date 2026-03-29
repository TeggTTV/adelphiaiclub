import crypto from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(crypto.scrypt)

const SCRYPT_KEY_LENGTH = 64
const SCRYPT_SALT_BYTES = 16

export function randomToken(size = 48) {
  return crypto.randomBytes(size).toString("base64url")
}

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex")
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(SCRYPT_SALT_BYTES).toString("hex")
  const derived = (await scryptAsync(password, salt, SCRYPT_KEY_LENGTH)) as Buffer
  return `${salt}:${derived.toString("hex")}`
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, originalHex] = storedHash.split(":")
  if (!salt || !originalHex) return false

  const derived = (await scryptAsync(password, salt, SCRYPT_KEY_LENGTH)) as Buffer
  const original = Buffer.from(originalHex, "hex")

  if (derived.length !== original.length) return false

  return crypto.timingSafeEqual(derived, original)
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function getSigningSecret() {
  return (
    process.env.SESSION_SIGNING_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-insecure-signing-secret-change-me"
  )
}

export function signValue(payload: string) {
  const signature = crypto.createHmac("sha256", getSigningSecret()).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

export function verifySignedValue(value: string) {
  const lastDot = value.lastIndexOf(".")
  if (lastDot < 0) return null

  const payload = value.slice(0, lastDot)
  const providedSignature = value.slice(lastDot + 1)
  const expectedSignature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("base64url")

  const provided = Buffer.from(providedSignature)
  const expected = Buffer.from(expectedSignature)

  if (provided.length !== expected.length) return null
  if (!crypto.timingSafeEqual(provided, expected)) return null

  return payload
}

export function splitCsv(value: string | null | undefined) {
  if (!value) return []

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}
