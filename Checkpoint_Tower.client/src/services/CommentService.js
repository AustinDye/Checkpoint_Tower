import { AppState } from  "../AppState";
import { api } from "./AxiosService";

class CommentsService {
 async createComment(newComment) {
  const res = await api.post('api/comments', newComment)
  AppState.comments = [...AppState.comments, res.data]
 }
 async removeComment(comment) {
  await api.delete('api/comments/' + comment.id)
  const index = AppState.comments.findIndex(n => n.id == comment.id)
  AppState.comments.splice(index, 1)
 }
 async getAllComments(eventId) {
  const res = await api.get('api/events/' + eventId + '/comments')
  AppState.comments = res.data
  console.log(AppState.comments);
 }
}


export const commentsService = new CommentsService()