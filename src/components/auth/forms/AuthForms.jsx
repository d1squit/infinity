// import React from 'react';
import AuthForm from 'components/auth/forms/includes/AuthForm';
import { useContext } from "react";
import AuthContext from "components/auth/AuthProvider.jsx";


export const LoginForm = () => {
	return (
		<AuthForm   title="Welcome Back"
					subtitle="Enter your credentials to access your account"
					fields={[ { name: "name", placeholder: "Enter your username" },
							{ name: "password", placeholder: "Enter your password" } ]}
					additional={[ { title: "Forgot your password?", subtitle: "Reset password", link: "/reset-password" },
								{ title: "Don't have an account?", subtitle: "Sign Up", link: "/register" } ]}
					button="Log In"
					handle={useContext(AuthContext).loginUser} />
	);
};

export const RegisterForm = () => {
	return (
		<AuthForm   title="Hello"
					subtitle="Enter your credentials to create your account"
					fields={[ { name: "email", placeholder: "Enter your email" },
							{ name: "name", placeholder: "Enter your username" },
							{ name: "password", placeholder: "Enter your password" },
							{ name: "password_confirm", placeholder: "Confirm your password", icon: 'password' } ]}
					additional={[ { title: "Already have an account?", subtitle: "Log In", link: "/login" } ]}
					button="Sign Up"
					handle={useContext(AuthContext).registerUser} />
	);
};
