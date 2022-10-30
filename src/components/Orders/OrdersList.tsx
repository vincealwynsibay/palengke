import { collection, doc, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import OrderHeader from "./OrderHeader";
import OrderItem from "./OrderItem";

interface Props {}

const Container = styled.div`
	width: 90%;
	margin: 0 auto;
`;

const OrderItemsContainer = styled.div`
	display: grid;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	padding: 2rem;
`;

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
		<Container>
			{loading && <div>loading... </div>}

			<OrderItemsContainer>
				<OrderHeader />
				{orders &&
					orders.docs!.map((order: any) => {
						return (
							<OrderItem
								key={order.id}
								product={order.data().product}
							/>
						);
					})}
			</OrderItemsContainer>
		</Container>
	);
}

export default OrdersList;
