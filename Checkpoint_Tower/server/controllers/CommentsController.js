import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
import { BadRequest } from "../utils/Errors.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getComments)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)


  }
  async deleteComment(req, res, next) {
    const comment = await commentsService.getCommentById(req.params.id)
    try {
      if (comment.creator.id == req.account.id) {
         const comment = await commentsService.deleteComment(req.params.id)
      res.send(comment)
      }
      next(BadRequest)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comment = await commentsService.getComments(req.params.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async createComment(req, res, next) {
    try {
      req.body.accountId = req.account.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}