import React from 'react';

const AuthFormFieldset = (props) => {
	return (
		<fieldset className={`form__field`} error={props.error}>
			<img src={`src/img/icons/${props.name}-icon.svg`} className="form__placeholder-image" alt={props.name + "-icon"}/>
			<input className="form__input" name={props.name} type="text" placeholder={props.placeholder}/>
		</fieldset>
	);
}

export default AuthFormFieldset;