import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
interface Props {
	className: string;
}

const Form = styled.form`
	margin: 1rem 0;
	position: relative;
	width: 25rem;
	@media screen and (min-width: 480px) {
		margin: 0;
	}
`;

const Input = styled.input`
	border: none;
	border-radius: 20px;
	padding: 0.8rem 1.5rem;
	padding-left: 48px;
	font-size: 1rem;
	width: 100%;
	background-color: ${(props) => props.theme.primary};

	:focus {
		outline: none;
	}
`;

const SearchIcon = styled(BsSearch)`
	position: absolute;
	left: 15px;
	top: 50%;
	width: 1rem;
	color: ${(props) => props.theme.accent};
	transform: translate(0, -50%) scale(1.3);
`;

function Search({ className }: Props) {
	const [query, setQuery] = React.useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (query) {
			return navigate(`/products/search?query=${query}`);
		} else {
			return navigate(`/`);
		}
	};

	return (
		<Form className={className} onSubmit={handleSubmit}>
			<Input
				type='text'
				placeholder='Search'
				onChange={(e) => setQuery(e.target.value)}
			/>
			<SearchIcon />
		</Form>
	);
}

export default Search;
