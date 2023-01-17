import { Env, RequestWithInfo } from '../types'
import {
  pendingFollowKey,
  respond,
  respondError,
  walletFollowKey,
} from '../utils'

export const addPendingFollow = async (
  request: RequestWithInfo,
  { FOLLOWS, INDEXER_WEBHOOK_SECRET }: Env
): Promise<Response> => {
  if (request.headers.get('x-api-key') !== INDEXER_WEBHOOK_SECRET) {
    return respondError(401, 'Invalid API key')
  }

  // If already following or pending, do nothing.
  if (
    (await FOLLOWS.get(
      walletFollowKey(
        request.chainId,
        request.walletAddress,
        request.daoAddress
      )
    )) ||
    (await FOLLOWS.get(
      pendingFollowKey(
        request.chainId,
        request.walletAddress,
        request.daoAddress
      )
    ))
  ) {
    return respond(200, {
      status: 'exists',
    })
  }

  // Add to pending follows.
  await FOLLOWS.put(
    pendingFollowKey(
      request.chainId,
      request.walletAddress,
      request.daoAddress
    ),
    new Date().toISOString()
  )

  return respond(200, {
    status: 'success',
  })
}
