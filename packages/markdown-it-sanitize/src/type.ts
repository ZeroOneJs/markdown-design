import type { Config } from 'dompurify'

export interface SanitizeOptions extends Config {
  RETURN_DOM_FRAGMENT?: false
  RETURN_DOM?: false
  RETURN_TRUSTED_TYPE?: false
}
