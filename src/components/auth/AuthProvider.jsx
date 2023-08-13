import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { authFields } from '@/settings.js';
import { fetchApi, createObject } from '@/utils.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
	const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
	const [isVerified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, _setError] = useState({});

	const setError = (data) => {
		let newError = {};
		authFields.forEach(field => newError[field] = data[field] ?? '');
		Object.keys(newError).forEach(key => { if (newError[key].length > 0) newError[key] = newError[key][0] });
		_setError(newError);
	};

	const navigate = useNavigate();

	useEffect(() => setError(createObject(authFields, Array(authFields.length).fill(''))), []);

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
		}

		setError(data);
	};

	const registerUser = async (email, name, password, password_confirm) => {
		const { data, status } = await fetchApi('/user/register/', { email, password, name, password_confirm });
		if (status === 201) navigate('/email-verify-waiting', { state: { email: email } });

		setError(data);
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
		isVerified,
		setVerified,
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

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired
}

export default AuthContext;
