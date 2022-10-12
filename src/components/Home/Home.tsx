import React from "react";
import ProductsList from "../Products/ProductsList";

interface Props {}

function Home({}: Props) {
	return (
		<div>
			<ProductsList />
		</div>
	);
}

export default Home;
