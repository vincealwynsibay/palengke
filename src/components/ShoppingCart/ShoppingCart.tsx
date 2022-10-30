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
import { useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import ShoppingCartHeader from "./ShoppingCartHeader";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {}
const Container = styled.div`
	width: 90%;
	margin: 0 auto;
`;
const ShoppingItemsContainer = styled.div`
	display: grid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	padding: 2rem;
`;

const TotalAndCheckoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;
const TotalPrice = styled.p`
	text-align: left;
`;
const Button = styled.button`
	cursor: pointer;
	background: #1dbe74;
	border: none;
	padding: 1rem 2rem;
	color: #fff;
	border-radius: 3px;
	text-transform: uppercase;
	font-weight: 600;
	text-align: right;

	transition: background-color 0.2s ease-in-out transform 0.2s ease-in-out;
	:hover {
		background-color: #1cb66e;
		transform: translateY(-1px);
	}

	:active {
		transform: translateY(1px);
	}
`;

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
				date_added: Date.now(),
			});
		});
		// clear shopping cart
		await updateDoc(doc(db, "shoppingCarts", user.uid), {
			products: [],
		});

		alert(`You checked out the Products. Thank you for shopping with us!`);
	};

	return (
		<Container>
			<ShoppingItemsContainer>
				<ShoppingCartHeader />
				<div>
					{products &&
						products.map((product: any) => {
							return (
								<ShoppingCartItem
									product={product}
									key={
										product.product_id + product.date_added
									}
								/>
							);
						})}
				</div>
			</ShoppingItemsContainer>

			<TotalAndCheckoutContainer>
				<div>
					<TotalPrice>
						Total: $
						{products &&
							products
								.reduce(
									(acc: any, curr: any) =>
										acc + curr.price * curr.quantity,
									0
								)
								.toFixed(2)}
					</TotalPrice>
					<Button onClick={() => checkOut()}>Check out</Button>
				</div>
			</TotalAndCheckoutContainer>
		</Container>
	);
}

export default ShoppingCart;
