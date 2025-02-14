import { useState } from "react"
import CommentForm from "../../../components/CommentForm"
import { Comment } from "../../../types/Comment"
import CommentCard from "./CommentCard"
import useAuth from "../../../hooks/useAuth"

type CommentSectionProps = {
    comments: Comment[],
    onSubmit: (comment: string) => void,
    onDelete: (commentId: number) => void,
    onEdit: (commentId: number, comment: string) => void
}

const CommentSection: React.FC<CommentSectionProps> = ({comments, onSubmit, onDelete, onEdit}) => {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState('');
    const [localComments, setLocalComments] = useState(comments);
    const {currentUser } = useAuth();
    
    const handleEdit = (commentId: number, content: string) => {
        setEditingCommentId(commentId);
        setEditedContent(content);
    };

    const handleSaveEdit = (commentId: number) => {
        onEdit(commentId, editedContent);
        setEditingCommentId(null);
        setEditedContent('');
    };

    const handleSubmit = (content: string) => {
        // Optimistic update
        setLocalComments(prev => [...prev, {
            id: Date.now(), // Temporary ID
            content,
            createdAt: new Date().toISOString(),
            author: currentUser!, // You'll need to inject this
            isOptimistic: true
        }]);
        
        // Then call API
        onSubmit(content);
    };
    return (
        <div className="h-[calc(100vh-300px)] flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {localComments.length > 0 ? (
                    localComments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            onDelete={onDelete}
                            onEdit={handleEdit}
                            isEditing={editingCommentId === comment.id}
                            editedContent={editedContent}
                            onContentChange={setEditedContent}
                            onSaveEdit={handleSaveEdit}
                            onCancelEdit={() => setEditingCommentId(null)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <img src="/images/illustrations/22.svg" alt="No Comments" className="max-w-[300px] h-auto mb-4" />
                        <h2 className="text-xl font-semibold">No Comments Yet</h2>
                        <p className="text-gray-600">Be the first to add a comment on this task.</p>
                    </div>
                )}
            </div>
            <div className="border-t p-4">
                <CommentForm 
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default CommentSection
