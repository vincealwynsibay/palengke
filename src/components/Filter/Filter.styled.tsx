import React, { useState } from "react";
import styled from "styled-components";

interface Props {
	list: any[];
	setFilter: any;
	value: any;
}

const Container = styled.div`
	display: flex;
	justify-content: flex;
	margin: 1rem 0;
	align-items: center;
	gap: 1rem;
	@media screen and (min-width: 48rem) {
		justify-content: flex-end;
		margin: 0;
	}
`;

const SelectContainer = styled.div`
	cursor: pointer;
	padding: 0.8rem 4rem;
	border: 1px solid #000;
	position: relative;
	border: 1px solid ${(props) => props.theme.black};
	border-radius: 20px;

	:hover {
		border: 1px solid ${(props) => props.theme.accent};
	}
`;

const Options = styled.div`
	position: absolute;
	right: 0;
	top: 60px;
	background-color: ${(props) => props.theme.neutral};
	border-radius: 20px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	text-align: center;

	> div {
		padding: 1rem 2rem;
		position: relative;
		transition: border-bottom 0.2 ease-in-out;

		:hover {
			background-color: ${(props) => props.theme.accent};
		}
	}
`;

const Option = styled.option``;

function Filter({ list, value, setFilter }: Props) {
	const [show, setShow] = useState(false);
	return (
		<Container>
			<p>Category: </p>
			<SelectContainer onClick={() => setShow((prevVal) => !prevVal)}>
				<div>{value ? value : "all"}</div>
				<Options>
					{show &&
						list.map((item) => {
							return (
								<div key={item} onClick={() => setFilter(item)}>
									{item}
								</div>
							);
						})}
				</Options>
			</SelectContainer>
			{/* <Select name='' id='' onChange={(e) => setFilter(e.target.value)}>
				<Options>
					{list &&
						list.map((item) => {
							return (
								<Option key={item} value={item}>
									{item}
								</Option>
							);
						})}
				</Options>
			</Select> */}
		</Container>
	);
}

export default Filter;
