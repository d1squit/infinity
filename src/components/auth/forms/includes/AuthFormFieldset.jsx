import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '@components/auth/AuthProvider.jsx';


const AuthFormFieldset = ({ name, placeholder, icon }) => {
	const fieldsetRef = useRef(null);
	const { error } = useContext(AuthContext);

	return (
		<fieldset ref={fieldsetRef} className={"form__field flex border border-solid border-black/[.4] rounded p-3 mb-2.5 transition-colors duration-300 " + (error[name] !== '' ? "invalid" : "")}
					onClick={() => fieldsetRef.current.querySelector('.form__input').focus()}>
			<img src={`src/img/icons/auth/${icon === '' ? name : icon}-icon.svg`} className="form__placeholder-image w-5" alt={(icon === '' ? name : icon) + "-icon"}/>
			<input type={name.includes('password') ? "password" : "text"} className="form__input w-full ml-2.5 border-none placeholder:text-sm" name={name} placeholder={placeholder}/>
		</fieldset>
	);
};

AuthFormFieldset.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default AuthFormFieldset;
