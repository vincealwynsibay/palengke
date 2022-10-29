import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../app/firebase";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import useComponentVisible from "../../hooks/useComponentVisible";

interface Props {}

const AvatarIcon = styled(BsPersonCircle)`
	transform: scale(1.5);
	position: relative;
	cursor: pointer;
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: absolute;
	top: 100%;
	transform: translate(-50%, 0);
	background: #fff;
	padding: 1rem;
	border-radius: 3px;
	z-index: 999;
`;

function Avatar({}: Props) {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false);

	return (
		<div ref={ref}>
			<AvatarIcon
				onClick={() => setIsComponentVisible(!isComponentVisible)}
			/>
			{isComponentVisible && (
				<Menu>
					<Link to='/orders'>Orders</Link>
					<a href='#' onClick={() => signOut(auth)}>
						Logout
					</a>
				</Menu>
			)}
		</div>
	);
}

export default Avatar;
