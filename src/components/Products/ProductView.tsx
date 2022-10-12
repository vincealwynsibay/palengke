import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../app/firebase";

interface Props {}

function ProductView({}: Props) {
	const { product_id } = useParams();
	const [value, loading, error] = useDocument(
		doc(db, "products", product_id!)
	);

	if (loading) {
		return <div>loading...</div>;
	}
	const data: any = value?.data();

	return (
		<div>
			<img src={data.photoUrls.regular} alt='' />
			<h2>{data.name}</h2>
			<p>category: {data.category}</p>
			<p>quantity: {data.quantity}</p>
			<p>price: {data.price}</p>
		</div>
	);
}

export default ProductView;
