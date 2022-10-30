import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface Props {
	data: any;
	id: string;
}

const Container = styled.div`
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	transition: box-shadow 0.2 ease-in-out;
	:hover {
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}
`;

const ProductDetails = styled.div`
	text-align: center;
	margin: 2rem 0;
`;

const Image = styled.img`
	width: 100%;
	aspect-ratio: 16/9;
`;

const Name = styled.h2`
	font-size: 1.3rem;
	margin: 0 0 1rem 0;
	font-weight: 600;
`;
const Price = styled.p`
	font-size: 1.3rem;
	color: #1dbe74;

	font-weight: 500;
	margin: 0;
`;

function ProductItem({ data, id }: Props) {
	return (
		<Container>
			<Link to={`/products/${id}`}>
				<Image src={data.photoUrls.small} alt='' />
			</Link>
			<ProductDetails>
				<Name>
					{data.name[0].toUpperCase()}
					{data.name.substring(1).toLowerCase()}
				</Name>
				<Price>${data.price.toFixed(2)}</Price>
			</ProductDetails>
		</Container>
	);
}

export default ProductItem;
