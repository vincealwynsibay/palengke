import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	useCollection,
	useDocument,
	useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {}

function ShoppingCart({}: Props) {
	const { user } = useAuthContext();
	const [products, setProducts] = useState<any>(null);

	if (!user) {
		return null;
	}

	const [shoppingCart, shoppingCartLoading, shoppingCartError] = useDocument(
		doc(db, "shoppingCarts", user.uid)
	);

	useEffect(() => {
		if (shoppingCart) {
			setProducts(shoppingCart.data()!.products);
		}
	}, [shoppingCart, shoppingCartLoading]);

	const checkOut = async () => {
		// add products in shopping cart to orders document
		products.forEach((product: any) => {
			addDoc(collection(db, "orders"), {
				product,
				buyer_id: user.uid,
			});
		});
		// clear shopping cart
		await updateDoc(doc(db, "shoppingCarts", user.uid), {
			products: [],
		});

		alert(`You checked out the Products. Thank you for shopping with us!`);
	};

	return (
		<div>
			<div>
				{products &&
					products.map((product: any) => {
						return (
							<ShoppingCartItem
								product={product}
								key={product.product_id}
							/>
						);
					})}
			</div>

			<p>
				Total:{" "}
				{products &&
					products.reduce(
						(acc: any, curr: any) =>
							acc + curr.price * curr.quantity,
						0
					)}
			</p>
			<button onClick={() => checkOut()}>Check out</button>
		</div>
	);
}

export default ShoppingCart;
