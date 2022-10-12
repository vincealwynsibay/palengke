import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import { useQuery } from "../../hooks/useQuery";
import ProductItem from "./ProductItem";

interface Props {}

function FilteredProductsListByName({}: Props) {
	let searchQuery = useQuery();
	const queryText = searchQuery.get("query");
	const [snapshot, loading, error] = useCollection(
		query(
			collection(db, "products"),
			where("name", ">=", queryText),
			where("name", "<=", queryText + "\uf8ff")
		)
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	const results = snapshot!.docs;

	return (
		<div>
			{results &&
				results.map((result: any) => {
					return (
						<ProductItem
							key={result.id}
							id={result.id}
							data={result.data()}
						/>
					);
				})}
			{results.length === 0 && <div>No results found</div>}
		</div>
	);
}

export default FilteredProductsListByName;
