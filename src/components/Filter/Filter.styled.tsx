import React, { useState } from "react";
import styled from "styled-components";

interface Props {
	list: any[];
	setFilter: any;
}

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 1rem 0;
	gap: 1rem;

	@media screen and (min-width: 48rem) {
		justify-content: flex-start;
		margin: 0;
	}
`;

const Select = styled.select`
	cursor: pointer;
	border: 1px solid #1a202c;
	background: none;
	padding: 16px 32px;
	border-radius: 3px;
	font-size: 1rem;

	:hover {
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}
`;

const Option = styled.option``;

function Filter({ list, setFilter }: Props) {
	return (
		<Container>
			<p>Category: </p>
			<Select name='' id='' onChange={(e) => setFilter(e.target.value)}>
				{list &&
					list.map((item) => {
						return <Option value={item}>{item}</Option>;
					})}
			</Select>
		</Container>
	);
}

export default Filter;
