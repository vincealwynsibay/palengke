import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import styled from "styled-components";
interface Props {
	data: any;
	id: string;
}

const Container = styled.div`
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	transition: box-shadow 0.2 ease-in-out;
	border-radius: 20px;
	:hover {
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}
`;

const ProductDetails = styled.div`
	margin: 1rem 0;
	padding: 0 1rem;
`;

const Image = styled.img`
	width: 100%;
	border-radius: 20px 20px 0 0;
	aspect-ratio: 16/9;
`;

const Category = styled.p`
	color: ${(props) => props.theme.gray};
	font-size: 1rem;
	margin: 0;
`;

const Name = styled.h2`
	font-size: 1.2rem;
	margin: 0 0 1rem 0;
	font-weight: 700;
	color: ${(props) => props.theme.black};
`;
const Price = styled.p`
	font-size: 1.4rem;
	color: ${(props) => props.theme.accent};
	font-weight: 700;
	text-decoration: underline;
	margin: 0;
`;

const ButtonLink = styled(Link)`
	padding: 0.8rem 1.5rem;
	background-color: ${(props) => props.theme.accent};
	color: #fff;
	border-radius: 3px;
	display: flex;
	align-items: center;
	gap: 1rem;
	justify-content: center;
	border-radius: 20px;
	margin: 1rem;
	:hover {
		background-color: ${(props) => props.theme.accentHover};
	}
`;

const ShoppingCartIcon = styled(AiOutlineShoppingCart)`
	color: ${(props) => props.theme.neutral};
	transform: scale(1.5);
	transition: background-color 0.2s ease-in-out;
`;

function ProductItem({ data, id }: Props) {
	return (
		<Container>
			<Link to={`/products/${id}`}>
				<Image src={data.photoUrls.small} alt='' />
			</Link>
			<ProductDetails>
				<Category>{data.category}</Category>
				<Name>
					{data.name[0].toUpperCase()}
					{data.name.substring(1).toLowerCase()}
				</Name>
				<Price>${data.price.toFixed(2)}</Price>
			</ProductDetails>
			<ButtonLink to={`/products/${id}`}>
				<ShoppingCartIcon />
				Add
			</ButtonLink>
		</Container>
	);
}

export default ProductItem;
