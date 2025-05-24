import { randomBytes } from 'node:crypto'

export class HashProvider {
  hash() {
    return randomBytes(16).toString("hex");
  }
}