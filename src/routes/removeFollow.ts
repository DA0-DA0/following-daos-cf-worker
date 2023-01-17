import { secp256k1PublicKeyToBech32Address } from '../crypto'
import { AuthorizedRequest, Env, RequestWithWallet } from '../types'
import { pendingFollowKey, walletFollowKey } from '../utils'
import { getFollows } from './getFollows'

export const removeFollow = async (
  request: AuthorizedRequest,
  env: Env
): Promise<Response> => {
  // Derive wallet address from public key.
  const walletAddress = secp256k1PublicKeyToBech32Address(
    request.parsedBody.data.auth.publicKey,
    request.parsedBody.data.auth.chainBech32Prefix
  )

  // Remove from pending follows if exists.
  await env.FOLLOWS.delete(pendingFollowKey(walletAddress, request.daoAddress))

  // Remove from follows.
  await env.FOLLOWS.delete(walletFollowKey(walletAddress, request.daoAddress))

  // Return updated follows list.
  return getFollows(
    {
      ...request,
      walletAddress,
    } as unknown as RequestWithWallet,
    env
  )
}
