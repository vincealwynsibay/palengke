import React from "react";

interface Props {
	data: any;
}

function OrderItem({ data }: Props) {
	return (
		<div>
			<h3>name: {data.product.name}</h3>
			<p>quantity: {data.product.quantity}</p>
			<p>price: {data.product.price}</p>
		</div>
	);
}

export default OrderItem;
