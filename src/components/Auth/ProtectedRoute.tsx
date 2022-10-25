import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function ProtectedRoute({}: Props) {
	const { user } = useAuthContext();

	if (!user) {
		return <Navigate to='/' />;
	}

	return <div></div>;
}

export default ProtectedRoute;
