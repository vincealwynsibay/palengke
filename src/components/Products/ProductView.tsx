import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function ProductView({}: Props) {
	const [quantity, setQuantity] = useState(1);
	const { product_id } = useParams();
	const [value, loading, error] = useDocument(
		doc(db, "products", product_id!)
	);
	const { user } = useAuthContext();

	if (loading) {
		return <div>loading...</div>;
	}

	const data: any = value?.data();

	const addToShoppingCart = async (
		user_id: string,
		product_id: string,
		quantity: number
	) => {
		// get shopping cart ref
		const shoppingCartRef = doc(db, "shoppingCarts", user_id);
		const docSnap = await getDoc(shoppingCartRef);

		const products = [
			...docSnap.data()!.products,
			{
				product_id,
				name: data.name,
				image: data.photoUrls.small,
				price: data.price,
				quantity,
			},
		];

		// add a product to the shopping cart
		await updateDoc(shoppingCartRef, {
			products,
		});
		setQuantity(1);
	};

	return (
		<div>
			<img src={data.photoUrls.regular} alt='' />
			<h2>{data.name}</h2>
			<p>category: {data.category}</p>
			<p>quantity: {data.quantity}</p>

			<div className=''>
				<button onClick={() => setQuantity((prevVal) => prevVal - 1)}>
					-
				</button>
				<span>{quantity}</span>
				<button onClick={() => setQuantity((prevVal) => prevVal + 1)}>
					+
				</button>
			</div>
			<p>price: {data.price}</p>
			{user && (
				<div>
					<button
						onClick={() => {
							addToShoppingCart(user.uid, product_id!, quantity);
							alert("Added to Shopping Cart");
						}}
					>
						Add to Shopping Cart
					</button>
				</div>
			)}
		</div>
	);
}

export default ProductView;
