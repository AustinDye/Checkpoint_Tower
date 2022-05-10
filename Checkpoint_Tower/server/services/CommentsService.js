import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class  CommentsService {
  async deleteComment(commentId) {
    const targetEvent = await dbContext.Comments.findById(commentId)
    if(!targetEvent) {
      throw new BadRequest('Couldnt find comment')
    }
    await targetEvent.remove()
  }
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }
  async getComments(eventId) {
    return await dbContext.Comments.find({eventId}).populate('event').populate('creator')
  }

  async getCommentById(id) {
    return await dbContext.Comments.findById(id).populate('event').populate('creator')
  }

}
export const commentsService = new CommentsService()