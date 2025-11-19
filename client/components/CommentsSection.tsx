import React, { useState } from 'react';
import { User, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

interface CommentsSectionProps {
  comments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const toggleComments = () => {
    setIsExpanding(true);
    setShowComments(!showComments);
    setTimeout(() => setIsExpanding(false), 300);
  };

  return (
    <div className="mb-8">
      <button 
        className="flex items-center space-x-2 text-xl font-semibold mb-4"
        onClick={toggleComments}
      >
        <span>Comments</span>
        {showComments ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanding ? 'opacity-100' : ''} ${showComments ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex items-center space-x-2 mb-6 bg-black p-4 rounded-lg">
          <User size={24} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">Post</button>
        </div>
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-4">
              <User size={40} className="text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">{comment.user} <span className="font-normal text-gray-500 text-sm">• {comment.timestamp}</span></p>
                <p className="mt-1 text-gray-700">{comment.text}</p>
                <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors"><ThumbsUp size={14} /> <span>Like</span></button>
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors"><ThumbsDown size={14} /> <span>Dislike</span></button>
                  <button className="hover:text-gray-700 transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
