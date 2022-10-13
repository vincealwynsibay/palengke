import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {}

function Register({}: Props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const navigate = useNavigate();

	// get the current user if there is
	const { user: currentUser } = useAuthContext();

	// if already logged in
	if (currentUser) {
		return <Navigate to='/' />;
	}

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

		if (!loading && !error) {
			navigate("/");
		}
	};

	return (
		<div>
			<h1>Register</h1>
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
				{/* if there is an error, display a message */}
				{error && <p>{error.message}</p>}
				{/* disable button to avoid repeated network requests */}
				{loading ? (
					<button type='submit' disabled>
						loading...
					</button>
				) : (
					<button type='submit'>Register</button>
				)}
			</form>
			<p>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
}

export default Register;