import { useState } from "react";
import { CiImageOn } from "react-icons/ci"

type CommentFormProps = {
    onSubmit: (comment: string) => void;
    isLoading?: boolean;
}
const CommentForm: React.FC<CommentFormProps> = ({onSubmit, isLoading}) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content);
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input input-lg">
                <input 
                    placeholder="your comment.."
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                 <button 
                    type="submit" 
                    className="btn btn-primary btn-sm"
                    disabled={isLoading}
                >
                    {isLoading ? 'Posting...' : 'Post Comment'}
                </button>
                {/* <button 
                    title="addCommentImage"
                    type="button" className="btn btn-icon btn-sm">
                    <CiImageOn className="size-5" />
                </button> */}
            </div>
        </form>
    )
}
export default CommentForm
