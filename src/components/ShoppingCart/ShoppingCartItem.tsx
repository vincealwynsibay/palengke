import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../app/firebase";
import { BiTrash } from "react-icons/bi";
import { useAuthContext } from "../../hooks/useAuthContext";
interface Props {
	product: any;
}

const CartItem = styled.div`
	display: grid;
	font-size: 0.8rem;

	grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

	padding: 1rem 0;

	:hover {
		background: #f8fbfa;
	}
	@media (min-width: 48rem) {
		font-size: 1rem;
		gap: 1rem;
		grid-template-columns: minmax(50px, 2fr) repeat(
				auto-fit,
				minmax(50px, 1fr)
			);
	}
`;

const Product = styled.div`
	display: flex;
	gap: 1rem;
`;

const Image = styled.img`
	display: none;

	@media (min-width: 48rem) {
		display: initial;
		width: clamp(3rem, 50%, 6rem);
		height: auto;
		aspect-ratio: 16/9;
	}
`;

const Quantity = styled.div`
	display: flex;
	align-items: center;

	> input {
		width: 90%;
		padding: 1rem 0.5rem;
	}
`;

const Button = styled.button`
	all: unset;
	cursor: pointer;
`;

const DeleteIcon = styled(BiTrash)`
	transform: scale(1.5);
	color: #bb2d3b;

	:hover {
		color: #a12a37;
	}
`;

function ShoppingCartItem({ product }: Props) {
	const [quantity, setQuantity] = useState(product.quantity);
	const { user } = useAuthContext();

	useEffect(() => {
		const updateQuantity = async () => {
			// get shopping cart ref
			const shoppingCartRef = doc(db, "shoppingCarts", user.uid);

			const docSnap = await getDoc(shoppingCartRef);

			const products = [
				docSnap.data()!.products.map((p: any) => {
					if (
						p.product_id === product.product_id &&
						p.quantity === product.quantity
					) {
						return {
							...p,
							quantity:
								typeof quantity === "number"
									? quantity
									: parseInt(quantity),
						};
					} else {
						return p;
					}
				}),
			];

			console.log(products[0]);

			// add a product to the shopping cart
			await updateDoc(shoppingCartRef, {
				products: products[0],
			});
		};

		const call = async () => {
			if (quantity !== "" || quantity.match(/[a-z]/i))
				await updateQuantity();
		};

		call();
	}, [quantity, setQuantity]);

	const deleteItem = async () => {
		// get shopping cart ref
		const shoppingCartRef = doc(db, "shoppingCarts", user.uid);
		const docSnap = await getDoc(shoppingCartRef);

		const products = [
			docSnap.data()!.products.filter((p: any) => {
				if (
					p.product_id !== product.product_id &&
					p.quantity !== product.quantity
				) {
					return p;
				}
			}),
		];

		//  add a product to the shopping cart
		await updateDoc(shoppingCartRef, {
			products: products[0],
		});
	};

	return (
		<CartItem>
			<Product>
				<Image src={product.image} alt='' />
				<p>
					{product.name[0].toUpperCase() + product.name.substring(1)}
				</p>
			</Product>

			<Quantity>
				<input
					type='number'
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
			</Quantity>

			<p> ${product.price}.00</p>
			<p> ${product.price * product.quantity}.00</p>

			<Button onClick={() => deleteItem()}>
				<DeleteIcon />
			</Button>
		</CartItem>
	);
}

export default ShoppingCartItem;
