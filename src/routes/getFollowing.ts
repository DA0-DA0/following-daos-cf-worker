import { Env, RequestWithInfo } from '../types'
import { getFollowsForWallet, respond } from '../utils'

export const getFollowing = async (
  request: RequestWithInfo,
  env: Env
): Promise<Response> =>
  respond(200, {
    following: await getFollowsForWallet(
      env,
      request.chainId,
      request.walletAddress,
      false
    ),
    pending: await getFollowsForWallet(
      env,
      request.chainId,
      request.walletAddress,
      true
    ),
  })
