import { useState } from "react";
import { ImagePlus, Type, FileText, Send } from "lucide-react";

function App() {
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log({ url, title, content });
			setUrl("");
			setTitle("");
			setContent("");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="img" className="flex items-center text-sm font-medium text-gray-700">
								<ImagePlus className="w-4 h-4 mr-2" />
								Cover Image URL
							</label>
							<input
								type="url"
								id="img"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://example.com/image.jpg"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
								<Type className="w-4 h-4 mr-2" />
								Title
							</label>
							<input
								type="text"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter your post title"
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="content" className="flex items-center text-sm font-medium text-gray-700">
								<FileText className="w-4 h-4 mr-2" />
								Content
							</label>
							<textarea
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder="Write your post content here..."
								rows={6}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
								required
							/>
						</div>

						{url && (
							<div className="rounded-lg overflow-hidden shadow-md">
								<img
									src={url}
									alt="Preview"
									className="w-full h-48 object-cover"
									onError={(e) => {
										e.target.src = "https://images.unsplash.com/photo-1560457079-9a6532ccb118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80";
									}}
								/>
							</div>
						)}

						<button
							type="submit"
							disabled={isSubmitting}
							className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white
                ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
							<Send className={`w-5 h-5 mr-2 ${isSubmitting ? "animate-pulse" : ""}`} />
							{isSubmitting ? "Publishing..." : "Publish Post"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
