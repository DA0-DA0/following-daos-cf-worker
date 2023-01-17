export const walletFollowKey = (walletAddress: string, daoAddress: string) =>
  `FOLLOW:${walletAddress}:${daoAddress}`

export const pendingFollowKey = (walletAddress: string, daoAddress: string) =>
  `PENDING_FOLLOW:${walletAddress}:${daoAddress}`
