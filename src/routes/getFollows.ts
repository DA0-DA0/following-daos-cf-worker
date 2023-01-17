import { Env, RequestWithWallet } from '../types'
import { getFollowsForWallet, respond } from '../utils'

export const getFollows = async (
  request: RequestWithWallet,
  env: Env
): Promise<Response> =>
  respond(200, {
    follows: await getFollowsForWallet(env, request.walletAddress, false),
    pending: await getFollowsForWallet(env, request.walletAddress, true),
  })
