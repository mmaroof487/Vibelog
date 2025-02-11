import { useState } from "react";
import Layout from "../components/Layout";
import Create from "../pages/Posts/Create";
import Index from "../pages/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [data, setData] = useState("");

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} data={data} />}>
					<Route index element={<Index />} />
					<Route path="/create" element={loggedIn ? <Create data={data} /> : <Login setLogged={setLoggedIn} setData={setData} />} />
					<Route path="/login" element={<Login setLogged={setLoggedIn} setData={setData} />} />
					<Route path="/register" element={<Register setLogged={setLoggedIn} setData={setData} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
