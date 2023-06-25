import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'components/auth/AuthProvider';

import { LoginForm, RegisterForm } from 'components/auth/forms/AuthForms';

import 'scss/style.scss';


class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						{/* <Route element={<LandingPage/>} path="/"/> */}
						{/* <Route element={<DashboardPage/>} path="/dashboard"/> */}
						<Route element={<LoginForm />} path="/login"/>
						<Route element={<RegisterForm />} path="/register"/>
						{/* <Route element={<RegisterPage/>} path="/register"/> */}
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		);
	}
}

export default App;
