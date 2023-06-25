import React, { useRef } from 'react';
import PropTypes from 'prop-types';


const AuthFormFieldset = ({ error, name, placeholder, icon }) => {
	const fieldsetRef = useRef(null);

	return (
		<fieldset ref={fieldsetRef} className={"form__field flex border border-solid border-black/[.4] rounded p-3 mb-2.5 transition-colors duration-300 " + (error !== '' ? "invalid" : "")}
					onClick={() => fieldsetRef.current.querySelector('.form__input').focus()}>
			<img src={`src/img/icons/${icon === '' ? name : icon}-icon.svg`} className="form__placeholder-image w-5" alt={(icon === '' ? name : icon) + "-icon"}/>
			<input className="form__input w-full ml-2.5 border-none placeholder:text-sm" name={name} type="text" placeholder={placeholder}/>
		</fieldset>
	);
};

AuthFormFieldset.propTypes = {
	error: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default AuthFormFieldset;
