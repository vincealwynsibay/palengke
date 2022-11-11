import React from "react";
import styled from "styled-components";
import ProductsList from "../Products/ProductsList.styled";
import hero from "../../assets/hero.jpg";

interface Props {}

const Hero = styled.div`
	background: url(${hero}) no-repeat center center/cover;
	position: relative;
	height: 50vh;
	z-index: -1;

	h1 {
		font-size: 2.4rem;
		margin-bottom: 0.6rem;
		z-index: 2;
		> span {
			color: ${(props) => props.theme.accent};
		}
	}

	p {
		font-size: 1.2rem;
		z-index: 2;
		> span {
			color: ${(props) => props.theme.accent};
		}
	}
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	text-align: center;
`;

function Home({}: Props) {
	return (
		<div>
			<Hero>
				<Overlay>
					<h1>
						Welcome to the <span> Palengke! </span>
					</h1>
					<p>
						A place where you can buy <span>organic</span> and{" "}
						<span>high quality</span> products.
					</p>
				</Overlay>
			</Hero>
			<ProductsList />
		</div>
	);
}

export default Home;
