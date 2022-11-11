import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import useComponentVisible from "../../hooks/useComponentVisible";

interface Props {
	toggle: boolean;
}

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 50%;
	top: 100%;
	transform: translate(-50%, 0);
	z-index: 999;
	text-align: center;
	background: #fff;
	border-radius: 20px;
	width: 16.5rem;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	> * {
		display: block;
		padding: 1rem 1rem;

		:hover {
			background: ${(props) => props.theme.accentHover};
		}
	}
	@media screen and (min-width: 48rem) {
		display: none;
	}
`;

export default function NavMenu({ toggle }: Props) {
	const { user } = useAuthContext();
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(toggle);

	useEffect(() => {
		setIsComponentVisible(toggle);
	}, [toggle]);

	return (
		<>
			{isComponentVisible && (
				<Menu ref={ref}>
					{user ? (
						<>
							<Link to='/shoppingCart'>Shopping Cart</Link>
							<Link to='/orders'>Orders</Link>
							<a href='#' onClick={() => signOut(auth)}>
								Logout
							</a>
						</>
					) : (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Register</Link>
						</>
					)}
				</Menu>
			)}
		</>
	);
}
