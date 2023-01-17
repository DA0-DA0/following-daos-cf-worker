import { RequestWithDao, RequestWithWallet } from './types'
import { respondError } from './utils'

export const loadWalletFromParams = async (
  request: RequestWithWallet
): Promise<Response | void> => {
  const walletAddress = request.params?.walletAddress
  if (!walletAddress) {
    return respondError(400, 'Missing wallet address.')
  }

  // Add wallet address to request.
  request.walletAddress = walletAddress
}

export const loadDaoFromParams = async (
  request: RequestWithDao
): Promise<Response | void> => {
  const daoAddress = request.params?.daoAddress
  if (!daoAddress) {
    return respondError(400, 'Missing DAO address.')
  }

  // Add DAO address to request.
  request.daoAddress = daoAddress
}
