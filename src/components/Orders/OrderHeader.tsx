import React from "react";
import styled from "styled-components";

interface Props {}

const Header = styled.div`
	display: grid;
	font-size: 0.8rem;
	grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
	text-transform: uppercase;
	padding: 2rem;

	@media (min-width: 48rem) {
		gap: 1rem;
		font-size: 1rem;
		grid-template-columns: minmax(50px, 2fr) repeat(
				auto-fit,
				minmax(50px, 1fr)
			);
	}
`;

function OrderHeader({}: Props) {
	return (
		<Header>
			<p>Product</p>
			<p>Quantity</p>
			<p>Unit Price </p>
			<p>Total Price</p>
		</Header>
	);
}

export default OrderHeader;
