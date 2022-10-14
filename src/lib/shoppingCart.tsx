import {
	arrayRemove,
	arrayUnion,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebase";

export const createShoppingCart = async (user_id: string) => {
	// create a new shopping cart
	const shoppingCart = {
		products: [],
	};
	await setDoc(doc(db, "shoppingCart", user_id), shoppingCart);
};

export const addToShoppingCart = async (
	user_id: string,
	product_id: string,
	quantity: number
) => {
	// get shopping cart ref
	const shoppingCartRef = doc(db, "shoppingCart", user_id);

	// add a product to the shopping cart
	await updateDoc(shoppingCartRef, {
		products: arrayUnion({
			product_id,
			quantity,
		}),
	});
};

// export const removeFromShoppingCart = async (
// 	user_id: string,
// 	product_id: string
// ) => {
// 	// get shopping cart ref
// 	const shoppingCartRef = doc(db, "shoppingCart", user_id);

// 	// add a product to the shopping cart
// 	await updateDoc(shoppingCartRef, {
// 		products: arrayRemove(product_id),
// 	});
// };
