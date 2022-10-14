import { doc } from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function ShoppingCart({}: Props) {
	const { user } = useAuthContext();

	if (!user) {
		return null;
	}

	const [value, loading, error] = useDocument(
		doc(db, "shoppingCart", user.uid)
	);

	return (
		<div>
			{error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Document: Loading...</span>}
			{value && <span>Document: {JSON.stringify(value.data())}</span>}
		</div>
	);
}

export default ShoppingCart;
