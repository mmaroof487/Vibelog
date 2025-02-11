import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./components/post";

export default function Dashboard() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		update();
	}, []);

	async function update() {
		setIsLoading(true);
		setError("");
		try {
			const response = await axios.get("http://localhost:3000/");
			setData(response.data);
		} catch (error) {
			setError("Failed to fetch posts. Please try again." + error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="p-8 flex flex-wrap w-full ">
			{error && <p className="text-red-600 text-center w-full">{error}</p>}
			{isLoading && <p className="text-center w-full">Loading...</p>}
			<div className="grid grid-cols-2 gap-6">
				{data.map((val, index) => (
					<Post key={index} url={val.url} title={val.title} content={val.content} user={val.user} time={val.time} />
				))}
			</div>
		</div>
	);
}
