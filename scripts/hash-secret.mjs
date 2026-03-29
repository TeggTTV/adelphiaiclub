#!/usr/bin/env node
import crypto from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(crypto.scrypt)
const SCRYPT_KEY_LENGTH = 64
const SCRYPT_SALT_BYTES = 16

async function main() {
  const secret = process.argv[2]

  if (!secret) {
    console.error("Usage: node scripts/hash-secret.mjs <secret>")
    process.exit(1)
  }

  const salt = crypto.randomBytes(SCRYPT_SALT_BYTES).toString("hex")
  const derived = await scryptAsync(secret, salt, SCRYPT_KEY_LENGTH)

  console.log(`${salt}:${Buffer.from(derived).toString("hex")}`)
}

main().catch((error) => {
  console.error("Failed to hash secret:", error)
  process.exit(1)
})
