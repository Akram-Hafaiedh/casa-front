import moment from "moment";
import { getInitials } from "../../../helpers/format";
import { Comment } from "../../../types/Comment";

type CommentCardProps = {
    comment: Comment,
    onDelete: (commentId: number) => void,
    onEdit: (commentId: number, comment: string) => void
    isEditing: boolean;
    editedContent: string;
    onContentChange: (content: string) => void;
    onSaveEdit: (commentId: number) => void;
    onCancelEdit: () => void;
}
const CommentCard: React.FC <CommentCardProps>= ({
    comment,
    onDelete,
    onEdit,
    isEditing,
    editedContent,
    onContentChange,
    onSaveEdit,
    onCancelEdit
}) => {
    return (
        <div className="flex items-start gap-2.5">
            {comment.author.logo ? (
                <img 
                    className="rounded-full w-9 h-9 lg:w-[50px] lg:h-[50px] mt-1" 
                    alt={comment.author.full_name} 
                    src={comment.author.logo} 
                />
            ) : (
                <div 
                    className="flex items-center justify-center rounded-full bg-gray-300 w-9 h-9 lg:w-[50px] lg:h-[50px] mt-1"
                    aria-label={comment.author.full_name}
                >
                    {comment.author.full_name && getInitials(comment.author.full_name)}
                </div>
            )}
            <div className="grid gap-2.5 grow">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <span className="text-md font-medium text-gray-900">
                            {comment.author.full_name}
                        </span>
                        <span className="text-sm text-gray-700">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    {!isEditing && (
                        <div className="flex gap-2">
                            <button
                                title="edit comment"
                                type="button"
                                className="text-blue-600 hover:underline text-sm"
                                onClick={() => onEdit(comment.id, comment.content)}
                            >
                                Edit
                            </button>
                            <button
                                title="delete comment"
                                type="button"
                                className="text-red-600 hover:underline text-sm"
                                onClick={() => onDelete(comment.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <div className="space-y-2">
                        <textarea
                            title="Edit content"
                            value={editedContent}
                            onChange={(e) => onContentChange(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={3}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => onSaveEdit(comment.id)}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={onCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-800">
                        {comment.content}
                    </p>
                )}
            </div>
        </div>
    )
}
export default CommentCard
