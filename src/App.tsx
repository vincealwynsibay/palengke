import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link, Routes } from "react-router-dom";
import { auth } from "./app/firebase";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import ProductsList from "./components/Products/ProductsList";
import ProductView from "./components/Products/ProductView";
import Search from "./components/Search/Search";
import { useAuthContext } from "./hooks/useAuthContext";
import { seedProducts } from "./lib/seedProducts";
interface Props {}

function App({}: Props) {
	const { isAuthReady, user } = useAuthContext();

	const logout = () => {
		signOut(auth);
	};
	return (
		<div>
			{isAuthReady ? (
				<BrowserRouter>
					<Search />
					{user && <p>{user.email}</p>}
					{user && <a onClick={logout}>logout</a>}
					{!user && <Link to='/register'>Register</Link>}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/products/:product_id'
							element={<ProductView />}
						/>
						<Route
							path='/products/search'
							element={<ProductsList />}
						/>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</BrowserRouter>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default App;
