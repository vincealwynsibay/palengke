import { collection, doc, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import OrderItem from "./OrderItem";

interface Props {}

function OrdersList({}: Props) {
	const { user } = useAuthContext();
	const [products, setProducts] = useState<any>(null);

	const [orders, loading, error] = useCollection(
		query(collection(db, "orders"), where("buyer_id", "==", user.uid))
	);

	if (!user) {
		return null;
	}

	console.log(!loading && orders?.docs);

	return (
		<div>
			{loading && <div>loading... </div>}
			{orders &&
				orders.docs!.map((order: any) => {
					return <OrderItem key={order.id} data={order.data()} />;
				})}
		</div>
	);
}

export default OrdersList;
