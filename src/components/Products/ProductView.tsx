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
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import Wrapper from "../Layout/Wrapper";
import Loading from "../Loading/Loading";

interface Props {}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 1rem;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	background-color: ${(props) => props.theme.neutral};
	border-radius: 20px;
	gap: 2rem;
	padding: 1rem;
	> * {
		flex-basis: 100%;
	}

	@media screen and (min-width: 48rem) {
		align-items: center;
		flex-direction: row;
		margin: 5rem 6.25rem;
		padding: 0;
	}
`;

const ProductDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const Name = styled.h2`
	text-transform: capitalize;
	margin: 0;
	font-size: 3rem;
`;
const Category = styled.p`
	margin: 0;
	font-weight: 600;
	font-size: 1.3rem;
	color: ${(props) => props.theme.gray};
	margin: 0;
`;
const Price = styled.p`
	font-weight: 700;
	margin: 0;
	font-size: 2.5rem;
	color: ${(props) => props.theme.accent};
`;
const Quantity = styled.div`
	display: flex;
	border-radius: 3px;
	margin: 2rem 0;

	> p {
		margin-left: 1rem;
	}
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
	color: ${(props) => props.theme.accent};
	font-weight: 600;
	transition: background-color 0.3s ease-in-out;
	:hover {
		color: ${(props) => props.theme.accentHover};
	}
`;
const Button = styled.button`
	cursor: pointer;
	border: none;
	padding: 1rem 2rem;
	font-size: 1rem;
	font-weight: 600;
	color: #fff;
	background-color: ${(props) => props.theme.accent};
	border-radius: 30px;
	transition: background-color 0.2s ease-in-out transform 0.2s ease-in-out;
	:hover {
		background-color: ${(props) => props.theme.accentHover};
		transform: translateY(-1px);
	}

	:active {
		transform: translateY(1px);
	}
`;

const Image = styled.img`
	max-width: 100%;
	border-radius: 20px 20px 0 0;
	max-height: 32rem;
	@media (min-width: 48rem) {
		border-radius: 20px 0 0 20px;
	}
`;

function ProductView({}: Props) {
	const [quantity, setQuantity] = useState(1);
	const { product_id } = useParams();
	const [value, loading, error] = useDocument(
		doc(db, "products", product_id!)
	);
	const { user } = useAuthContext();

	if (loading) {
		return <Loading />;
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
					<p>{data.quantity} left</p>
				</Quantity>

				{user ? (
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
				) : (
					<Link to='/login'>
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
					</Link>
				)}
			</ProductDetails>
		</Container>
	);
}

export default ProductView;
