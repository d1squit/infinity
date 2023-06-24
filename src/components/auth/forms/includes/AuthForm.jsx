import React, {useContext} from 'react';

import logo from 'img/logo.png';
import 'scss/forms.scss';

import AuthContext from "components/auth/AuthProvider";
import AuthFormFieldset from 'components/auth/forms/includes/AuthFormFieldset';

const AuthForm = (props) => {
	const { error, loginUser } = useContext(AuthContext);

	const handleSubmit = e => {
		e.preventDefault();
		const params = props.fields.map(field => e.target[field.name].value);
		loginUser(...params);
	};


	return (
		<div className="form-container">
			<a href="/" className="form__logo logo-image" style={{backgroundImage: `url('${logo}')`}}></a>

			<form method="POST" onSubmit={handleSubmit} className="main-block">
				<h1 className="form__title">{props.title}</h1>
				<h2 className="form__subtitle">{props.subtitle}</h2>

				{props.fields.map(field => <AuthFormFieldset key={field.name} error={error[field.name]} name={field.name} placeholder={field.placeholder} image={field.image} /> )}

				<button className="form__submit" type="submit">{props.button}</button>
			</form>

			<div className="form__other">
				{props.additional.map(field => <div className="form__other__field" key={field.title}>{field.title}<a href={field.link} className="form__other__link">{field.subtitle}</a></div> )}
			</div>
		</div>
	);
};

export default AuthForm;