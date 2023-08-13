import React, { useContext, useEffect, useState } from "react";
import AuthContext from '@components/auth/AuthProvider.jsx';

import AuthFormContainer from '@components/auth/forms/includes/AuthFormContainer.jsx';
import AuthForm from '@components/auth/forms/includes/AuthForm.jsx';

import '@scss/form.scss';
import { useLocation } from 'react-router-dom';
import { baseUrl } from "@/settings.js";
import { fetchApi } from '@/utils.js';


export const LoginForm = () => {
	return (
		<AuthFormContainer additional={[ { title: "Forgot your password?", subtitle: "Reset password", link: "/reset-password" },
										{ title: "Don't have an account?", subtitle: "Sign Up", link: "/register" } ]}>
			<AuthForm   title="Welcome Back"
						subtitle="Enter your credentials to access your account"
						fields={[ { name: "name", placeholder: "Enter your username" },
								{ name: "password", placeholder: "Enter your password" } ]}
						button="Log In"
						handle={useContext(AuthContext).loginUser} />
		</AuthFormContainer>
	);
};

export const RegisterForm = () => {
	return (
		<AuthFormContainer  additional={[ { title: "Already have an account?", subtitle: "Log In", link: "/login" } ]}>
			<AuthForm 	title="Hello"
						subtitle="Enter your credentials to create your account"
						fields={[ { name: "email", placeholder: "Enter your email" },
								{ name: "name", placeholder: "Enter your username" },
								{ name: "password", placeholder: "Enter your password" },
								{ name: "password_confirm", placeholder: "Confirm your password", icon: 'password' } ]}
						button="Sign Up"
						handle={useContext(AuthContext).registerUser}/>
		</AuthFormContainer>
	);
};

export const EmailVerifyForm = () => {
	const [timer, setTimer] = useState(60);
	const location = useLocation();

	useEffect(() => {
		if (!localStorage.getItem('email-timer')) localStorage.setItem('email-timer', '60');
		else setTimer(+localStorage.getItem('email-timer') - 1);
	}, [])

	useEffect(() => {
		const decrementTimer = () => {
			setTimer(prevTimer => prevTimer - 1);
			localStorage.setItem('email-timer', timer.toString());
		}
		const interval = setInterval(decrementTimer, 1000);
		return () => clearInterval(interval);
	}, [timer]);

	const sendEmail = () => {
		fetchApi('/user/send-verification-email/', { 'email': location.state.email }).then(() => {
			setTimer(60);
			localStorage.setItem('email-timer', '60');
		});
	}

	return (
		<AuthFormContainer additional={[]}>
			<h1 className="text-xl font-semibold">We sent a verification email to: <span className="text-base font-normal">{location.state.email}</span></h1>
			<button onClick={sendEmail} className={(timer <= 0 ? "" : "disabled") + " w-full mt-8 bg-main-color hover:bg-other-color rounded-md h-11 cursor-pointer text-white border-none transition-colors duration-300 flex items-center justify-center"}>
				Send another one {timer <= 0 ? '' : `(${timer})`}
			</button>
		</AuthFormContainer>
	)
};
