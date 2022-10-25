import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link, Routes } from "react-router-dom";
import { auth } from "./app/firebase";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/Auth/Login";
import ProtectedRoutes from "./components/Auth/ProtectedRoute";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import OrdersList from "./components/Orders/OrdersList";
import ProductsList from "./components/Products/ProductsList";
import ProductView from "./components/Products/ProductView";
import Search from "./components/Search/Search";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { useAuthContext } from "./hooks/useAuthContext";
import { seedProducts } from "./lib/seedProducts";
interface Props {}

function App({}: Props) {
	const { isAuthReady } = useAuthContext();

	return (
		<div>
			{isAuthReady ? (
				<BrowserRouter>
					<Navbar />
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
						<Route
							path='/shoppingCart'
							element={<ShoppingCart />}
						/>
						<Route path='/orders' element={<OrdersList />} />
					</Routes>
				</BrowserRouter>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}

export default App;
