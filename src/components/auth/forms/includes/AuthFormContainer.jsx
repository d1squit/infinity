import React from 'react';
import PropTypes from 'prop-types';

import logo from '@img/logo.png';
import '@scss/form.scss';


const AuthFormContainer = ({ children, additional }) => {
	return (
		<div className="form-container flex flex-col justify-center items-center gap-7">
			<a href="/" className="form__logo logo-image bg-contain w-12 h-12" style={{backgroundImage: `url('${logo}')`}}></a>

			<div className="main-block flex flex-col justify-center text-center bg-white rounded-lg p-7 shadow-auth-form">
				{children}
			</div>

			<div className="form__other">
				{additional.map(field => <div className="form__other__field mb-1 text-center" key={field.title}>{field.title}<a href={field.link} className="form__other__link ml-1 text-other-color">{field.subtitle}</a></div> )}
			</div>
		</div>
	);
};

AuthFormContainer.propTypes = {
	children: PropTypes.node.isRequired,
	additional: PropTypes.array.isRequired
};

export default AuthFormContainer;
