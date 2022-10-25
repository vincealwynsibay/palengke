import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function Navbar({}: Props) {
	const { user } = useAuthContext();
	return (
		<nav>
			{user ? (
				<>
					<Link to='/'>Home</Link>
					<Link to='/shoppingCart'>Shopping Cart</Link>
					<Link to='/orders'>Orders</Link>
					<a href='#' onClick={() => signOut(auth)}>
						Logout
					</a>
				</>
			) : (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</>
			)}
		</nav>
	);
}

export default Navbar;
