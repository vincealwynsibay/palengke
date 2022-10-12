import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductsList from "./components/Products/ProductsList";
import ProductView from "./components/Products/ProductView";
import Search from "./components/Search/Search";
import { seedProducts } from "./lib/seedProducts";
interface Props {}

function App({}: Props) {
	return (
		<div>
			<BrowserRouter>
				<Search />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/products/:product_id'
						element={<ProductView />}
					/>
					<Route path='/products/search' element={<ProductsList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
