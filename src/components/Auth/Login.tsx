import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function Login({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

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
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Email</label>
					<input type='email' name='email' onChange={handleChange} />
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				{/*  if there is error display message  */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{loading ? (
					<button type='submit' disabled>
						loading...
					</button>
				) : (
					<button type='submit'>Login</button>
				)}
			</form>
			<p>
				Don't have an account yet? <Link to='/register'>Register</Link>
			</p>
		</div>
	);
}

export default Login;
