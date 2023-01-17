export interface Env {
  NONCES: KVNamespace
  FOLLOWS: KVNamespace

  // Secrets.
  INDEXER_WEBHOOK_SECRET: string
}

export interface Auth {
  type: string
  nonce: number
  chainId: string
  chainFeeDenom: string
  chainBech32Prefix: string
  publicKey: string
}

export type RequestBody<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data extends Record<string, unknown> = Record<string, any>
> = {
  data: {
    auth: Auth
  } & Data
  signature: string
}

export interface RequestWithWallet extends Request {
  walletAddress: string
}

export interface RequestWithDao extends Request {
  daoAddress: string
}

export interface AuthorizedRequest<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data extends Record<string, any> = Record<string, any>
> extends RequestWithDao {
  parsedBody: RequestBody<Data>
}
