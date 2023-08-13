import PropTypes from 'prop-types';

const NavigationField = props => {
	return (
		<a href={props.href} className={`navbar__part__link text-icon ${props.selected ? 'selected' : ''}`}>
			<img src={props.image ? `src/img/icons/navigation/${props.image}.svg` : `src/img/icons/navigation/${props.children.toString().toLocaleLowerCase()}.svg`} alt={props.children} className="navbar__part__link__image icon" />
			{props.children}
		</a>
	);
};

NavigationField.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	image: PropTypes.string,
	selected: PropTypes.bool
};

export default NavigationField;
