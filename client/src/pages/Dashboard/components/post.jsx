import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Trash2, Clock, User as UserIcon, MessageSquare, Share2 } from "lucide-react";

export default function Post({ url, title, content, user, time }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [showFullContent, setShowFullContent] = useState(false);

	async function handleDelete() {
		try {
			setIsDeleting(true);
			await axios.post("http://localhost:3000/delete", { url, content }, { withCredentials: true });
		} catch (error) {
			console.error("Error deleting post:", error);
		} finally {
			setIsDeleting(false);
		}
	}

	const formattedContent = showFullContent ? content : content.slice(0, 150) + (content.length > 150 ? "..." : "");

	return (
		<article className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-2xl w-full">
			<div className="flex flex-col md:flex-row h-full">
				<div className="md:w-1/3 h-64 md:h-auto relative group">
					<img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={url} alt={title} loading="lazy" />
					<div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
				</div>

				<div className="flex flex-col justify-between p-6 md:w-2/3">
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<div className="flex items-center gap-1">
								<UserIcon className="w-4 h-4" />
								<span className="font-medium text-blue-600">{user}</span>
							</div>
							<span>•</span>
							<div className="flex items-center gap-1">
								<Clock className="w-4 h-4" />
								<time className="text-gray-500">{time}</time>
							</div>
						</div>

						<h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>

						<p className="text-gray-600 leading-relaxed">
							{formattedContent}
							{content.length > 150 && (
								<button onClick={() => setShowFullContent(!showFullContent)} className="text-blue-600 hover:text-blue-700 font-medium ml-2">
									{showFullContent ? "Show less" : "Read more"}
								</button>
							)}
						</p>
					</div>

					<div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
						<div className="flex items-center gap-4">
							<button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
								<MessageSquare className="w-4 h-4" />
								<span className="text-sm">Comment</span>
							</button>
							<button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
								<Share2 className="w-4 h-4" />
								<span className="text-sm">Share</span>
							</button>
						</div>

						<button
							onClick={handleDelete}
							disabled={isDeleting}
							className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							<Trash2 className="w-4 h-4" />
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}

Post.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
};
