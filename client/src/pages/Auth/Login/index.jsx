import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";

export default function Login({ setLogged, setData }) {
	const [username, setUsername] = useState("maroof");
	const [password, setPassword] = useState("sanchi");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.getElementById("username")?.focus();
	}, []);

	async function handleLogin(e) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!username || !password) {
			setError("Please fill in all fields");
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post("http://localhost:3000/login", { username, password });

			if (response.status === 200) {
				navigate("/");
				setData(response.data.user.username);
				setLogged(true);
			} else {
				setError(response.data.message || "Registration failed");
			}
		} catch (error) {
			setError(error.response?.data?.message || "An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-white">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
					<p className="text-gray-500 mt-2">Please sign in to your account</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-6">
					<div className="space-y-4">
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
								Username
							</label>
							<div className="relative">
								<User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
								<input
									id="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
									placeholder="Enter your username"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
								<input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
									placeholder="Enter your password"
								/>
							</div>
						</div>
					</div>

					{error && (
						<div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
							<AlertCircle className="h-5 w-5" />
							<span className="text-sm">{error}</span>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? (
							<>
								<Loader2 className="h-5 w-5 animate-spin" />
								Signing in...
							</>
						) : (
							"Sign in"
						)}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-gray-500">
					Dont have an account?{" "}
					<a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

Login.propTypes = {
	setData: PropTypes.func.isRequired,
	setLogged: PropTypes.func.isRequired,
};
