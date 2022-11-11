import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "./Avatar.styled";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

interface Props {}

const Links = styled.div`
	display: none;
	gap: 2rem;
	@media screen and (min-width: 48rem) {
		display: flex;
	}
`;

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 1rem;
	position: relative;
	padding: 0.8rem 1.5rem;
	color: ${(props) => props.theme.black};

	x :hover {
		> * {
			color: ${(props) => props.theme.accent};
		}
	}

	:hover::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		border-bottom: 1px solid ${(props) => props.theme.accent};
	}
`;

const ButtonLink = styled(Link)`
	padding: 0.8rem 1.5rem;
	background-color: ${(props) => props.theme.accent};
	color: #fff;
	border-radius: 30px;

	:hover {
		background-color: ${(props) => props.theme.accentHover};
	}

	:last-of-type {
		background: none;
		border: 1px solid ${(props) => props.theme.accent};
		color: ${(props) => props.theme.accent};

		:active {
			outline: none;
		}

		:hover {
			background-color: ${(props) => props.theme.accent};
			color: #fff;
		}
	}
`;

const ShoppingCartIcon = styled(AiOutlineShoppingCart)`
	color: ${(props) => props.theme.black};
	transform: scale(1.5);
	transition: background-color 0.2s ease-in-out;
`;

function NavLinks({}: Props) {
	const { user } = useAuthContext();
	return (
		<Links>
			{user ? (
				<>
					<StyledLink to='/shoppingCart'>
						<ShoppingCartIcon />
						Cart
					</StyledLink>
					<Avatar />
				</>
			) : (
				<>
					<ButtonLink to='/login'>Login</ButtonLink>
					<ButtonLink to='/register'>Register</ButtonLink>
				</>
			)}
		</Links>
	);
}

export default NavLinks;
