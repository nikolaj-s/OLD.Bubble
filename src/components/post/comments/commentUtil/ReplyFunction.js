import { replyToComment } from "../../../../util/commentsCommunication";


export const ReplyFunction = async (comments, replyTo, comment, commentId, post_id) => {

    const newComments = comments;

    const find = (element) => element._id === commentId;

    const index = newComments.findIndex(find);

    const reply = await replyToComment(commentId, `${replyTo} ${comment}`, post_id);

    newComments[index].replies.unshift(reply);

    document.getElementById('comment-input').value = "";

    return comments;

}