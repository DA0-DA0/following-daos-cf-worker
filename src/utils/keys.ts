export const walletFollowKey = (
  chainId: string,
  walletAddress: string,
  daoAddress: string
) => `FOLLOW:${chainId}:${walletAddress}:${daoAddress}`

export const pendingFollowKey = (
  chainId: string,
  walletAddress: string,
  daoAddress: string
) => `PENDING_FOLLOW:${chainId}:${walletAddress}:${daoAddress}`
