import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import useComponentVisible from "../../hooks/useComponentVisible";

interface Props {}

const Container = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	cursor: pointer;
	position: relative;
	padding: 0.8rem 1.5rem;

	:hover::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		border-bottom: 1px solid ${(props) => props.theme.accent};
	}
`;

const AvatarIcon = styled(BsPersonCircle)`
	transform: scale(1.5);
	position: relative;
	cursor: pointer;
	color: ${(props) => props.theme.black};
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: #fff;
	border-radius: 3px;
	z-index: 999;

	> * {
		display: block;
		padding: 0.7rem 1rem;

		:hover {
			background: ${(props) => props.theme.accentHover};
		}
	}
`;

function Avatar({}: Props) {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false);
	const navigate = useNavigate();

	return (
		<Container
			ref={ref}
			onClick={() => setIsComponentVisible(!isComponentVisible)}
		>
			<AvatarIcon />
			Account
			{isComponentVisible && (
				<Menu>
					<Link to='/orders'>Orders</Link>
					<a
						href='#'
						onClick={() => {
							signOut(auth);
							navigate("/");
						}}
					>
						Logout
					</a>
				</Menu>
			)}
		</Container>
	);
}

export default Avatar;
