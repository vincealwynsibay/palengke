import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../app/firebase";

interface Props {
	product: any;
}

function ShoppingCartItem({ product }: Props) {
	console.log("nice");

	return (
		<div>
			<h3>name: {product.name}</h3>
			<p>quantity: {product.quantity}</p>
			<p>price: {product.price}</p>
		</div>
	);
}

export default ShoppingCartItem;
