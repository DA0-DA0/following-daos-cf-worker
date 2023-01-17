import { Env } from '../types'
import { pendingFollowKey, walletFollowKey } from './keys'

export const getFollowsForWallet = async (
  { FOLLOWS }: Env,
  chainId: string,
  walletAddress: string,
  pending: boolean
) => {
  const follows: string[] = []
  let cursor: string | undefined
  while (true) {
    const response = await FOLLOWS.list({
      prefix: pending
        ? pendingFollowKey(chainId, walletAddress, '')
        : walletFollowKey(chainId, walletAddress, ''),
      cursor,
    })

    follows.push(...response.keys.map((k) => k.name.split(':')[3]))

    if (response.list_complete) {
      break
    }

    cursor = response.cursor
  }

  return follows
}
