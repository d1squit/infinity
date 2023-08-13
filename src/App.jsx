import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@components/auth/AuthProvider.jsx';

import { EmailVerifyForm, LoginForm, RegisterForm } from '@components/auth/forms/AuthForms.jsx';
import EmailVerify from '@components/auth/forms/includes/EmailVerify.jsx';
import Dashboard from '@components/dashboard/Dashboard.jsx';
import Home from '@components/Home.jsx';

import '@scss/reset.scss';
import '@scss/style.scss';


class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route element={<Home />} path="/"></Route>
						{/* <Route element={<LandingPage/>} path="/"/> */}
						<Route element={<Dashboard />} path="/dashboard"/>
						<Route element={<LoginForm />} path="/login"/>
						<Route element={<RegisterForm />} path="/register"/>
						<Route element={<EmailVerifyForm />} path="/email-verify-waiting"/>
						<Route element={<EmailVerify />} path="/email-verify/:token"/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		);
	}
}

export default App;
