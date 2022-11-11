import React from "react";
import styled from "styled-components";

interface Props {
	product: any;
}

const Item = styled.div`
	display: grid;
	font-size: 0.8rem;
	grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

	padding: 1rem 0;

	:hover {
		background-color: ${(props) => props.theme.accentHover};
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
	text-transform: capitalize;
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

function OrderItem({ product }: Props) {
	return (
		<Item>
			<Product>
				<Image src={product.image} alt='' />

				<p>{product.name}</p>
			</Product>
			<p>${product.quantity.toFixed(2)}</p>
			<p>${product.price.toFixed(2)}</p>
			<p>${product.price * product.quantity.toFixed(2)}</p>
		</Item>
	);
}

export default OrderItem;
