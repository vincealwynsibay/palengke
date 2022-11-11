import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Link, Routes } from "react-router-dom";
import { auth } from "./app/firebase";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Auth/Login";
import ProtectedRoutes from "./components/Auth/ProtectedRoute";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home.styled";
import Navbar from "./components/Navbar/Navbar.styled";
import OrdersList from "./components/Orders/OrdersList";
import ProductsList from "./components/Products/ProductsList.styled";
import ProductView from "./components/Products/ProductView";
import Search from "./components/Search/Search";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { useAuthContext } from "./hooks/useAuthContext";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import Wrapper from "./components/Layout/Wrapper";
import { seedProducts } from "./lib/seedProducts";
import Loading from "./components/Loading/Loading";

const themeState = {
	primary: "#eeeeee",
	neutral: "#ffffff",
	accent: "#4E944F",
	accentHover: "#83BD75",
	black: "#111111",
	lightGray: "#999999",
	gray: "#666666",
	darkGray: "#555555",
};

const Container = styled.div`
	background-color: ${(props) => props.theme.primary};
`;

function App() {
	const { isAuthReady } = useAuthContext();

	useEffect(() => {
		// seedProducts()
		// 	.then(() => console.log("done"))
		// 	.catch();
	}, []);

	return (
		<div>
			<ThemeProvider theme={themeState}>
				{isAuthReady ? (
					<BrowserRouter>
						<Navbar />
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
					<Loading />
				)}
			</ThemeProvider>
		</div>
	);
}

export default App;
