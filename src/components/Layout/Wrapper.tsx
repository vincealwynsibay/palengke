import React from "react";

interface Props {
	children: JSX.Element;
}

export default function Wrapper({ children }: Props) {
	return <div>{children}</div>;
}
