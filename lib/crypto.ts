import crypto from "crypto"

const ENCRYPTION_KEY_BYTES = 32

function resolveEncryptionKey() {
  const configured = process.env.DATA_ENCRYPTION_KEY
  if (!configured) {
    return null
  }

  try {
    const asBase64 = Buffer.from(configured, "base64")
    if (asBase64.length === ENCRYPTION_KEY_BYTES) {
      return asBase64
    }
  } catch {
    // Fallback to deriving from raw string.
  }

  return crypto.createHash("sha256").update(configured).digest()
}

export function encryptForStorage(plaintext: string) {
  const key = resolveEncryptionKey()
  if (!key || !plaintext) {
    return null
  }

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `v1.${iv.toString("base64url")}.${authTag.toString("base64url")}.${encrypted.toString("base64url")}`
}

export function decryptFromStorage(ciphertext: string | null | undefined) {
  const key = resolveEncryptionKey()
  if (!key || !ciphertext) {
    return null
  }

  const [version, ivRaw, authTagRaw, encryptedRaw] = ciphertext.split(".")
  if (version !== "v1" || !ivRaw || !authTagRaw || !encryptedRaw) {
    return null
  }

  try {
    const iv = Buffer.from(ivRaw, "base64url")
    const authTag = Buffer.from(authTagRaw, "base64url")
    const encrypted = Buffer.from(encryptedRaw, "base64url")

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
    return decrypted.toString("utf8")
  } catch {
    return null
  }
}
