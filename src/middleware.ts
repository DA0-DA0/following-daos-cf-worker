import { RequestWithInfo } from './types'
import { respondError } from './utils'

export const loadWalletFromParams = async (
  request: RequestWithInfo
): Promise<Response | void> => {
  const walletAddress = request.params?.walletAddress
  if (!walletAddress) {
    return respondError(400, 'Missing wallet address.')
  }

  // Add wallet address to request.
  request.walletAddress = walletAddress
}

export const loadChainIdFromParams = async (
  request: RequestWithInfo
): Promise<Response | void> => {
  const chainId = request.params?.chainId
  if (!chainId) {
    return respondError(400, 'Missing chain ID.')
  }

  // Add chain ID to request.
  request.chainId = chainId
}

export const loadDaoFromParams = async (
  request: RequestWithInfo
): Promise<Response | void> => {
  const daoAddress = request.params?.daoAddress
  if (!daoAddress) {
    return respondError(400, 'Missing DAO address.')
  }

  // Add DAO address to request.
  request.daoAddress = daoAddress
}
