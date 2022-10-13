import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
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
	const { isAuthReady } = useAuthContext();
	return (
		<div>
			{isAuthReady ? (
				<BrowserRouter>
					<Search />
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
