import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AccountController extends BaseController { 
  constructor() { 
    super('account')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('/tickets', this.getAccountTickets)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

   async getAccountTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getAccountTickets(req.userInfo)
      logger.log('hello from the accounts controller',req.userInfo)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  
}
