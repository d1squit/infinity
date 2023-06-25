import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import AuthContext from 'components/auth/AuthProvider';
import AuthFormFieldset from 'components/auth/forms/includes/AuthFormFieldset';

import logo from 'img/logo.png';
import 'scss/form.scss';


const AuthForm = ({ title, subtitle, fields, additional, button, handle }) => {
	const { error } = useContext(AuthContext);

	const handleSubmit = e => {
		e.preventDefault();
		const params = fields.map(field => e.target[field.name].value);
		handle(...params);
	};

	return (
		<div className="form-container flex flex-col justify-center items-center gap-7">
			<a href="/" className="form__logo logo-image bg-contain w-12 h-12" style={{backgroundImage: `url('${logo}')`}}></a>

			<form method="POST" onSubmit={handleSubmit} className="main-block flex flex-col justify-center text-center bg-white rounded-lg p-7 shadow-auth-form">
				<h1 className="form__title font-semibold text-3xl">{title}</h1>
				<h2 className="form__subtitle mb-7 mt-2.5">{subtitle}</h2>

				{fields.map(field => <AuthFormFieldset key={field.name} error={error[field.name]} name={field.name} placeholder={field.placeholder} icon={field.icon ?? ''} /> )}

				<button className="form__submit mt-2.5 bg-main-color hover:bg-other-color rounded-md h-11 cursor-pointer text-white border-none transition-colors duration-300" type="submit">{button}</button>
			</form>

			<div className="form__other">
				{additional.map(field => <div className="form__other__field mb-1 text-center" key={field.title}>{field.title}<a href={field.link} className="form__other__link ml-1 text-other-color">{field.subtitle}</a></div> )}
			</div>
		</div>
	);
};

AuthForm.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	fields: PropTypes.array.isRequired,
	additional: PropTypes.array.isRequired,
	button: PropTypes.string.isRequired,
	handle: PropTypes.func.isRequired
};

export default AuthForm;
