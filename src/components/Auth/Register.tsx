import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

const Container = styled.div`
	position: relative;
	height: 80vh;
	text-align: left;
	background: white;
	z-index: 2;
	border-radius: 3px;
	margin: 0 auto;
	max-width: max(50%, 600px);
	padding: 2rem 3rem;
`;
const Header = styled.h2`
	font-weight: 600;
	margin-bottom: 2rem;
`;
const InputContainer = styled.div`
	margin-bottom: 1.5rem;
`;
const Label = styled.label`
	text-transform: uppercase;
	margin-bottom: 1.5rem;
`;
const Input = styled.input`
	display: block;
	background: none;
	border: 1px solid #1a202c;
	padding: 1rem;
	width: 100%;
`;
const Button = styled.button`
	background-color: #1dbe74;
	border: none;
	padding: 1rem 2rem;
	font-weight: 700;
	font-size: 1rem;
	color: #fff;
	text-transform: uppercase;
	width: 100%;
`;

const RedirectLink = styled(Link)`
	color: #1dbe74;
`;

function Register({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const navigate = useNavigate();

	// get the current user if there is
	const { user: currentUser, isAuthReady, dispatch } = useAuthContext();

	useEffect(() => {
		const createShoppingCart = async () => {
			const shoppingCart = {
				products: [],
			};
			const orders = {
				products: [],
			};
			if (currentUser) {
				await setDoc(
					doc(db, "shoppingCarts", currentUser.uid),
					shoppingCart
				);
				await setDoc(doc(db, "orders", currentUser.uid), orders);
			}
		};
		if (currentUser) {
			createShoppingCart();
			navigate("/");
		}
	}, [currentUser]);

	// function for onChange events
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevValue) => ({
			...prevValue,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// register user and if successful redirect to home page
		await createUserWithEmailAndPassword(formData.email, formData.password);
	};

	return (
		<Container>
			<Header>Register</Header>
			<form onSubmit={handleSubmit}>
				<InputContainer>
					<Label htmlFor=''>Email</Label>
					<Input type='email' name='email' onChange={handleChange} />
				</InputContainer>
				<InputContainer>
					<Label htmlFor=''>Password</Label>
					<Input
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</InputContainer>
				{/* if there is an error, display a message */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{loading ? (
					<Button type='submit' disabled>
						loading...
					</Button>
				) : (
					<Button type='submit'>Register</Button>
				)}
			</form>
			<p>
				Already have an account?{" "}
				<RedirectLink to='/login'>Login</RedirectLink>
			</p>
		</Container>
	);
}

export default Register;
