import { Env } from '../types'
import { pendingFollowKey, walletFollowKey } from './keys'

export const getFollowsForWallet = async (
  { FOLLOWS }: Env,
  walletAddress: string,
  pending: boolean
) => {
  const follows: string[] = []
  let cursor: string | undefined
  while (true) {
    const response = await FOLLOWS.list({
      prefix: pending
        ? pendingFollowKey(walletAddress, '')
        : walletFollowKey(walletAddress, ''),
      cursor,
    })

    follows.push(...response.keys.map((k) => k.name.split(':')[2]))

    if (response.list_complete) {
      break
    }

    cursor = response.cursor
  }

  return follows
}
