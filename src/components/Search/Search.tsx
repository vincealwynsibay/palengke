import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
interface Props {
	className: string;
}

const Input = styled.input`
	border: 1px solid #1a202c;
	border-radius: 3px 0 0 3px;
	padding: 0.5rem 1rem;
`;

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr minmax(45px, 10%);
	margin: 1rem 0;
	@media screen and (min-width: 48rem) {
		margin: 0;
	}
`;

const Button = styled.button`
	border: 1px solid #1a202c;
	border-radius: 0 3px 3px 0;
	padding: 0.5rem 1rem;
	background: #1dbe74;
`;

const SearchIcon = styled(BsSearch)`
	width: 1rem;
	color: white;
	transform: scale(1.5);
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
		<div className={className}>
			<Form onSubmit={handleSubmit}>
				<Input type='text' onChange={(e) => setQuery(e.target.value)} />
				<Button>
					<SearchIcon />
				</Button>
			</Form>
		</div>
	);
}

export default Search;
