import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function Index(prop) {
	return (
		<main className="w-full bg-white min-h-screen  text-white font-semibold">
			<Navbar loggedIn={prop.loggedIn} setLoggedIn={prop.setLoggedIn} data={prop.data} />
			<Outlet />
		</main>
	);
}
