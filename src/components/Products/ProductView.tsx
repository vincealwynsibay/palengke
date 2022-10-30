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
import styled from "styled-components";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 1rem;

	gap: 2rem;
	> * {
		flex-basis: 100%;
	}

	@media screen and (min-width: 48rem) {
		align-items: center;
		flex-direction: row;
		margin: 5rem 6.25rem;
	}
`;
const ProductDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
`;
const Name = styled.h2`
	text-transform: capitalize;
	margin: 0;
	font-size: 2.375rem;
`;
const Category = styled.p`
	margin: 0;
	color: #1dbe74;
	font-weight: 600;
	text-transform: uppercase;
	font-size: 1.5rem;
`;
const Price = styled.p`
	font-weight: 600;
	font-size: 1.5rem;
`;
const Quantity = styled.div`
	display: flex;
	border-radius: 3px;
	margin-bottom: 2rem;
`;
const QuantityValue = styled.div`
	width: 4rem;
	background: #f6f8fc;
	padding: 1rem;
	text-align: center;
`;
const QuantityButton = styled.button`
	cursor: pointer;
	border: none;
	background: #f6f8fc;
	padding: 1rem;
	color: #1dbe74;
	font-weight: 600;
	transition: background-color 0.3s ease-in-out;
	:hover {
		color: #1cb66e;
	}
`;
const Button = styled.button`
	cursor: pointer;
	border: none;
	padding: 1rem 2rem;
	font-size: 1rem;
	font-weight: 600;
	color: #fff;
	background-color: #1dbe74;
	border-radius: 3px;
	transition: background-color 0.2s ease-in-out transform 0.2s ease-in-out;
	:hover {
		background-color: #1cb66e;
		transform: translateY(-1px);
	}

	:active {
		transform: translateY(1px);
	}
`;

const Image = styled.img`
	aspect-ratio: 1/1;
	max-width: 100%;
	max-height: 65vh;
`;

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
				date_added: Date.now(),
			},
		];

		// add a product to the shopping cart
		await updateDoc(shoppingCartRef, {
			products,
		});
		setQuantity(1);
	};

	return (
		<Container>
			<div>
				<Image src={data.photoUrls.regular} alt='' />
			</div>

			<ProductDetails>
				<Category>{data.category}</Category>
				<Name>{data.name}</Name>
				<Price>${data.price}.00</Price>

				<Quantity className=''>
					<QuantityButton
						onClick={() => setQuantity((prevVal) => prevVal - 1)}
					>
						-
					</QuantityButton>
					<QuantityValue>{quantity}</QuantityValue>
					<QuantityButton
						onClick={() => setQuantity((prevVal) => prevVal + 1)}
					>
						+
					</QuantityButton>
				</Quantity>
				{user && (
					<div>
						<Button
							onClick={() => {
								addToShoppingCart(
									user.uid,
									product_id!,
									quantity
								);
								alert("Added to Shopping Cart");
							}}
						>
							Add to Shopping Cart
						</Button>
					</div>
				)}
			</ProductDetails>
		</Container>
	);
}

export default ProductView;
