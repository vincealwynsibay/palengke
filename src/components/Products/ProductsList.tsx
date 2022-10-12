import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import ProductItem from "./ProductItem";
interface Props {}

function ProductsList({}: Props) {
	const [snapshot, loading, error] = useCollection(
		collection(db, "products")
	);

	console.log(snapshot);

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h1>ProductsList</h1>
			<div className='product-list'>
				{snapshot &&
					snapshot.docs.map((doc) => {
						return (
							<ProductItem
								key={doc.id}
								id={doc.id}
								data={doc.data()}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default ProductsList;
