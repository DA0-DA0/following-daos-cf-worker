import { secp256k1PublicKeyToBech32Address } from '../crypto'
import { AuthorizedRequest, Env, RequestWithInfo } from '../types'
import { pendingFollowKey, walletFollowKey } from '../utils'
import { getFollows } from './getFollows'

export const addFollow = async (
  request: AuthorizedRequest,
  env: Env
): Promise<Response> => {
  // Derive wallet address from public key.
  const walletAddress = secp256k1PublicKeyToBech32Address(
    request.parsedBody.data.auth.publicKey,
    request.parsedBody.data.auth.chainBech32Prefix
  )

  // Remove from pending follows if exists.
  await env.FOLLOWS.delete(
    pendingFollowKey(
      request.parsedBody.data.auth.chainId,
      walletAddress,
      request.daoAddress
    )
  )

  // Add to follows.
  await env.FOLLOWS.put(
    walletFollowKey(
      request.parsedBody.data.auth.chainId,
      walletAddress,
      request.daoAddress
    ),
    new Date().toISOString()
  )

  // Return updated follows list.
  return getFollows(
    {
      ...request,
      walletAddress,
    } as unknown as RequestWithInfo,
    env
  )
}
