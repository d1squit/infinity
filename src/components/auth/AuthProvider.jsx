import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { baseUrl } from '@/settings';

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
	const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({});

	const navigate = useNavigate();

	const fetchApi = async (url, body) => {
		return new Promise((resolve) => {
			fetch(`${baseUrl}${url}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			}).then(response => response.json().then(json => resolve({ data: json, status: response.status })));
		});
	}

	const isAuthenticated = async () => {
		const { data } = await fetchApi('/user/token/verify/', authTokens);
		return Boolean(data.token);
	};

	const loginUser = async (name, password) => {
		const { data, status } = await fetchApi('/user/token/obtain/', { name, password });

		if (status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.token));
			localStorage.setItem('authTokens', JSON.stringify(data));
			navigate(`/dashboard`);
		} else if (status === 400) {
			setError({
				name: typeof data.name == 'object',
				password: typeof data.password == 'object',
			});
		}
	};

	const registerUser = async (email, name, password, passwordConfirm) => {
		if (passwordConfirm !== password) {
			setError({
				email: typeof error.email || false,
				name: typeof error.name || false,
				password: typeof error.password || false,
				passwordConfirm: password !== passwordConfirm,
			});
			return;
		}

		const { data, status } = await fetchApi('/user/token/register/', { email, password, name });

		if (status === 201) navigate('/login');
		else if (status === 400) {
			setError({
				email: typeof data.email == 'object',
				name: typeof data.name == 'object',
				password: typeof data.password == 'object',
				passwordConfirm: error.passwordConfirm || false,
			});
		}
	};

	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem('authTokens');
		navigate('/');
	};

	const contextData = {
		error,
		user,
		setUser,
		authTokens,
		setAuthTokens,
		registerUser,
		loginUser,
		logoutUser,
		isAuthenticated,
	};

	useEffect(() => {
		if (authTokens) setUser(jwt_decode(authTokens.token));
		setLoading(false);
	}, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
