import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "./Avatar.styled";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

interface Props {}

const Links = styled.div`
	display: none;

	@media screen and (min-width: 48rem) {
		display: flex;
		gap: 2rem;
	}
`;

const ShoppingCartIcon = styled(AiOutlineShoppingCart)`
	transform: scale(1.5);
	transition: background-color 0.2s ease-in-out;
	:hover {
		color: #1cb66e;
	}
`;

function NavLinks({}: Props) {
	const { user } = useAuthContext();
	return (
		<Links>
			{user ? (
				<>
					<Link to='/shoppingCart'>
						<ShoppingCartIcon />
					</Link>
					<Avatar />
				</>
			) : (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</>
			)}
		</Links>
	);
}

export default NavLinks;
