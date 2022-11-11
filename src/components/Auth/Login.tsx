import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import styled from "styled-components";

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
const Label = styled.label``;
const Input = styled.input`
	display: block;
	background: none;
	border: 1px solid ${(props) => props.theme.darkGray};
	border-radius: 20px;
	padding: 1rem;
	width: 100%;

	:focus {
		outline: none;
		border: 1px solid ${(props) => props.theme.accent};
	}
`;
const Button = styled.button`
	background-color: ${(props) => props.theme.accent};
	border: none;
	padding: 1rem 2rem;
	font-weight: 700;
	font-size: 1rem;
	color: #fff;
	text-transform: uppercase;
	width: 100%;
	border-radius: 20px;
`;
const RedirectLink = styled(Link)`
	color: ${(props) => props.theme.accent};

	:hover {
		color: ${(props) => props.theme.accentHover};
	}
`;

function Login({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	<ProtectedRoute />;

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const navigate = useNavigate();

	// get the current user if there is
	const { user: currentUser } = useAuthContext();

	// if already logged in
	if (currentUser) {
		return <Navigate to='/' />;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevValue) => ({
			...prevValue,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		// login user and if successful redirect to home page
		await signInWithEmailAndPassword(formData.email, formData.password);

		if (!loading && !error) {
			navigate("/");
		}
	};

	return (
		<Container>
			<Header>Log In</Header>
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
				{/*  if there is error display message  */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{loading ? (
					<Button type='submit' disabled>
						loading...
					</Button>
				) : (
					<Button type='submit'>Login</Button>
				)}
			</form>
			<p>
				Don't have an account yet?{" "}
				<RedirectLink to='/register'>Register</RedirectLink>
			</p>
		</Container>
	);
}

export default Login;
