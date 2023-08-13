import PropTypes from 'prop-types';

const NavigationFieldsGroup = props => {
	return (
		<div className="navbar__part">
			<h2 className="navbar__part__title">{props.title}</h2>
			{props.children}
		</div>
	);
};

NavigationFieldsGroup.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};

export default NavigationFieldsGroup;
