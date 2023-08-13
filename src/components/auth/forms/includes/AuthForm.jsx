import React from 'react';
import PropTypes from 'prop-types';

import AuthFormFieldset from '@components/auth/forms/includes/AuthFormFieldset.jsx';

import '@scss/form.scss';


const AuthForm = ({ title, subtitle, fields, button, handle }) => {
	const handleSubmit = e => {
		e.preventDefault();
		const params = fields.map(field => e.target[field.name].value);
		handle(...params);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<h1 className="form__title font-semibold text-3xl">{title}</h1>
			<h2 className="form__subtitle mb-7 mt-2.5">{subtitle}</h2>

			{fields.map(field => <AuthFormFieldset key={field.name} name={field.name} placeholder={field.placeholder} icon={field.icon ?? ''} /> )}

			<button className="form__submit w-full mt-2.5 bg-main-color hover:bg-other-color rounded-md h-11 cursor-pointer text-white border-none transition-colors duration-300"
					type="submit">{button}</button>
		</form>
	);
};

AuthForm.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	fields: PropTypes.array.isRequired,
	button: PropTypes.string.isRequired,
	handle: PropTypes.func.isRequired
};

export default AuthForm;
