import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";

interface Props {}

function Dashboard({}: Props) {
	// total products bought
	// total available products

	const [products] = useCollection(collection(db, "products"));
	const [orders] = useCollection(collection(db, "orders"));

	return (
		<div>
			<p>{products && products.docs.length} Products</p>
			<p>{orders && orders.docs.length} Orders</p>
		</div>
	);
}

export default Dashboard;
