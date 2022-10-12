import React, { useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductView from "./components/Products/ProductView";
import { seedProducts } from "./lib/seedProducts";
interface Props {}

function App({}: Props) {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/products/:product_id'
						element={<ProductView />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
