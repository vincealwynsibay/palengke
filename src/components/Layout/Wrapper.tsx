import React from "react";
import styled from "styled-components";
interface Props {
	children: JSX.Element;
}

const Container = styled.div`
	margin: 1rem 2rem;
`;

export default function Wrapper({ children }: Props) {
	return <Container>{children}</Container>;
}
