import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from '@components/auth/AuthProvider.jsx';

import { fetchApi } from '@/utils.js';


const EmailVerify = () => {
	const { setVerified } = useContext(AuthContext);
	const { token } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			fetchApi('/user/email-verify/', { 'verification_hash': token }).then(response => {
				console.log(response)
				if (response.status === 200) setVerified(true);
				else if (response.json) response.json().then(res => console.log(res));
				navigate('/login');
			});
		}
	});
};

export default EmailVerify;
