import { secp256k1PublicKeyToBech32Address } from '../crypto'
import { AuthorizedRequest, Env, RequestWithInfo } from '../types'
import { pendingFollowKey, respondError, walletFollowKey } from '../utils'
import { getFollowing } from './getFollowing'

export const follow = async (
  request: AuthorizedRequest<{ daos: string[] }>,
  env: Env
): Promise<Response> => {
  if (
    !request.parsedBody.data.daos ||
    !Array.isArray(request.parsedBody.data.daos) ||
    request.parsedBody.data.daos.length === 0 ||
    request.parsedBody.data.daos.some((dao) => typeof dao !== 'string' || !dao)
  ) {
    return respondError(400, 'Invalid request body')
  }

  // Derive wallet address from public key.
  const walletAddress = secp256k1PublicKeyToBech32Address(
    request.parsedBody.data.auth.publicKey,
    request.parsedBody.data.auth.chainBech32Prefix
  )

  // Remove from pending follows if exist.
  await Promise.all(
    request.parsedBody.data.daos.map((dao) =>
      env.FOLLOWS.delete(
        pendingFollowKey(
          request.parsedBody.data.auth.chainId,
          walletAddress,
          dao
        )
      )
    )
  )

  // Add to follows.
  await Promise.all(
    request.parsedBody.data.daos.map((dao) =>
      env.FOLLOWS.put(
        walletFollowKey(
          request.parsedBody.data.auth.chainId,
          walletAddress,
          dao
        ),
        new Date().toISOString()
      )
    )
  )

  // Return updated follows list.
  return getFollowing(
    {
      ...request,
      walletAddress,
    } as unknown as RequestWithInfo,
    env
  )
}
