import React from "react";
import { Link } from "react-router-dom";

interface Props {
	data: any;
	id: string;
}

function ProductItem({ data, id }: Props) {
	return (
		<div>
			<Link to={`/products/${id}`}>
				<img src={data.photoUrls.small} alt='' />
				<h2>Name: {data.name}</h2>
				<p>Category: {data.category}</p>
				<p>Quantity: {data.quantity}</p>
				<p>Price: {data.price}</p>
			</Link>
		</div>
	);
}

export default ProductItem;
