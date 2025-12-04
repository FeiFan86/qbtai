declare module 'jsonwebtoken' {
  export interface JwtPayload {
    [key: string]: any
    iss?: string
    sub?: string
    aud?: string | string[]
    exp?: number
    nbf?: number
    iat?: number
    jti?: string
  }

  export interface SignOptions {
    algorithm?: string
    expiresIn?: string | number
    notBefore?: string | number
    audience?: string | string[]
    issuer?: string
    jwtid?: string
    subject?: string
    noTimestamp?: boolean
    header?: object
    keyid?: string
    mutatePayload?: boolean
  }

  export interface VerifyOptions {
    algorithms?: string[]
    audience?: string | string[]
    clockTimestamp?: number
    clockTolerance?: number
    issuer?: string | string[]
    ignoreExpiration?: boolean
    ignoreNotBefore?: boolean
    jwtid?: string
    maxAge?: string | number
    nonce?: string
    subject?: string
    complete?: boolean
  }

  export interface DecodeOptions {
    complete?: boolean
    json?: boolean
  }

  export function sign(payload: string | Buffer | object, secretOrPrivateKey: string | Buffer, options?: SignOptions): string
  export function verify(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): JwtPayload | string
  export function decode(token: string, options?: DecodeOptions): null | JwtPayload | string
}