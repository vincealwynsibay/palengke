import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface Props {
	data: any;
	id: string;
}

const Container = styled.div`
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ProductDetails = styled.div`
	text-align: center;
	margin: 1rem 0;
`;

const Image = styled.img`
	width: 100%;
	aspect-ratio: 16/9;
`;

const Name = styled.h2`
	font-size: 1.3rem;
	margin: 0;
	font-weight: 500;
`;
const Price = styled.p`
	font-size: 1.5rem;
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
				<Price>${data.price}</Price>
			</ProductDetails>
		</Container>
	);
}

export default ProductItem;
