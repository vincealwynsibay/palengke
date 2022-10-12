import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {}

function Search({}: Props) {
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
		<div>
			<form onSubmit={handleSubmit}>
				<p>Search</p>
				<input type='text' onChange={(e) => setQuery(e.target.value)} />
			</form>
		</div>
	);
}

export default Search;
