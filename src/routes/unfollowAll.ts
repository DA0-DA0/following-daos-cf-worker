import { secp256k1PublicKeyToBech32Address } from '../crypto'
import { AuthorizedRequest, Env } from '../types'
import { getFollowsForWallet, respond, walletFollowKey } from '../utils'

export const unfollowAll = async (
  request: AuthorizedRequest,
  env: Env
): Promise<Response> => {
  // Derive wallet address from public key.
  const walletAddress = secp256k1PublicKeyToBech32Address(
    request.parsedBody.data.auth.publicKey,
    request.parsedBody.data.auth.chainBech32Prefix
  )

  const follows = await getFollowsForWallet(
    env,
    request.chainId,
    request.walletAddress,
    false
  )

  // Remove from follows.
  await Promise.all(
    follows.map((dao) =>
      env.FOLLOWS.delete(
        walletFollowKey(
          request.parsedBody.data.auth.chainId,
          walletAddress,
          dao
        )
      )
    )
  )

  // Return updated follows list.
  return respond(200, {
    success: true,
  })
}
