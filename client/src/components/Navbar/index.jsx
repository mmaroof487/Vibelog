import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BookOpenText, PenSquare, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar({ loggedIn, setLoggedIn, data }) {
	const navigate = useNavigate();

	function logout() {
		navigate("/");
		setLoggedIn(false);
	}

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-blue-500 shadow-sm">
			<div className="container mx-auto flex h-16 items-center px-4">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
							<BookOpenText className="h-6 w-6 text-white" />
							<span className="hidden font-bold sm:inline-block text-white">Vibelog</span>
						</Link>
						{loggedIn && data && <span className="mx-8 text-sm text-teal-200 hidden sm:inline-block">Welcome! {data}. Whats on your mind?</span>}
					</div>

					<div className="flex items-center space-x-4">
						{loggedIn ? (
							<>
								<Link to="/create" className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-white hover:bg-cyan-500 rounded-lg transition-colors">
									<PenSquare className="h-4 w-4" />
									<span>Create Post</span>
								</Link>
								<Link to="/create" className="sm:hidden p-2 text-white bg-cyan-400 hover:bg-cyan-500 rounded-lg transition-colors" title="Create Post">
									<PenSquare className="h-4 w-4" />
								</Link>

								<button onClick={logout} className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
									<LogOut className="h-4 w-4" />
									<span>Logout</span>
								</button>
								<button onClick={logout} className="sm:hidden p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" title="Logout">
									<LogOut className="h-4 w-4" />
								</button>
							</>
						) : (
							<>
								<Link to="/login" className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
									<LogIn className="h-4 w-4" />
									<span>Login</span>
								</Link>
								<Link to="/login" className="sm:hidden p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" title="Login">
									<LogIn className="h-4 w-4" />
								</Link>

								<Link to="/register" className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-400 transition-colors">
									<UserPlus className="h-4 w-4" />
									<span>Register</span>
								</Link>
								<Link to="/register" className="sm:hidden p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-400 transition-colors" title="Register">
									<UserPlus className="h-4 w-4" />
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

Navbar.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	setLoggedIn: PropTypes.func.isRequired,
	data: PropTypes.string,
};
