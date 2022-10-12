import { collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import { useQuery } from "../../hooks/useQuery";
import Filter from "../Filter/Filter";
import ProductItem from "./ProductItem";
interface Props {}

function ProductsList({}: Props) {
	const [filter, setFilter] = useState("all");
	const [products, setProducts] = useState<any[]>([]);

	// query
	let searchQuery = useQuery();
	const queryText = searchQuery.get("query") || "";

	const [snapshot, loading, error] = useCollection(
		query(
			collection(db, "products"),
			where("name", ">=", queryText),
			where("name", "<=", queryText + "\uf8ff")
		)
	);

	useEffect(() => {
		console.log(queryText);
		if (!loading) {
			if (filter === "all") {
				setProducts(snapshot!.docs);
			} else if (filter !== "all") {
				const filteredProducts = snapshot!.docs.filter((product) => {
					return product.data().category === filter;
				});
				setProducts(filteredProducts);
			}
		}
	}, [loading, filter]);

	console.log(filter);

	if (loading) {
		return <div>loading...</div>;
	}

	const filterList = ["all", "fruit", "vegetable", "dairy", "meat"];

	return (
		<div>
			<h1>ProductsList</h1>
			<Filter list={filterList} setFilter={setFilter} />
			<div className='product-list'>
				{products &&
					products.map((doc) => {
						return (
							<ProductItem
								key={doc.id}
								id={doc.id}
								data={doc.data()}
							/>
						);
					})}
				{products.length === 0 && <div>No products found</div>}
			</div>
		</div>
	);
}

export default ProductsList;
