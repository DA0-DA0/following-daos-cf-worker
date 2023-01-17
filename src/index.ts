import { createCors } from 'itty-cors'
import { Router } from 'itty-router'

import { Env } from './types'
import { authMiddleware } from './auth'
import { handleNonce } from './routes/nonce'
import { respondError } from './utils'
import { loadDaoFromParams, loadWalletFromParams } from './middleware'
import { getFollows } from './routes/getFollows'
import { addFollow } from './routes/addFollow'
import { removeFollow } from './routes/removeFollow'
import { addPendingFollow } from './routes/addPendingFollow'

// Create CORS handlers.
const { preflight, corsify } = createCors({
  methods: ['GET', 'POST'],
  origins: ['*'],
  maxAge: 3600,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

const router = Router()

// Handle CORS preflight.
router.all('*', preflight)

//! Unauthenticated routes.

// Get nonce for publicKey.
router.get('/nonce/:publicKey', handleNonce)

// Get follows and pending follows.
router.get('/follows/:walletAddress', loadWalletFromParams, getFollows)

// Indexer webhook to add new DAOs to a wallet's pending follow list.
router.get(
  '/webhook/:walletAddress/:daoAddress',
  loadWalletFromParams,
  loadDaoFromParams,
  addPendingFollow
)

//! Authenticated routes.

// Add DAO to follow list, removing from pending if exists.
router.post('/follow/:daoAddress', authMiddleware, loadDaoFromParams, addFollow)

// Remove DAO from follow list, removing from pending if exists.
router.post(
  '/unfollow/:daoAddress',
  authMiddleware,
  loadDaoFromParams,
  removeFollow
)

//! 404
router.all('*', () => respondError(404, 'Not found'))

//! Entrypoint.
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router
      .handle(request, env)
      .catch((err) => {
        console.error('Error handling request', request.url, err)
        return respondError(
          500,
          `Internal server error. ${
            err instanceof Error ? err.message : `${JSON.stringify(err)}`
          }`
        )
      })
      .then(corsify)
  },
}
