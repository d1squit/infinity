import NavigationFieldsGroup from '@components/dashboard/navigation/NavigationFieldsGroup.jsx';
import NavigationField from '@components/dashboard/navigation/NavigationField.jsx';

import '@scss/navbar.scss';

const Navigation = () => {
	return (
		<div className="nav-block block border-right">
			<a href="/" className="logo text-icon">
				<img src="src/img/logo.png" className="logo__logo-image icon" alt="logo"/>
				<h1>MusicApp</h1>
			</a>
			<nav className="navbar">
				<NavigationFieldsGroup title="Menu">
					<NavigationField href="dashboard/" selected>Home</NavigationField>
					<NavigationField href="search/">Search</NavigationField>
					<NavigationField href="tracks/">Discover</NavigationField>
					<NavigationField href="albums/">Albums</NavigationField>
					<NavigationField href="artists/">Artists</NavigationField>
				</NavigationFieldsGroup>
				<NavigationFieldsGroup title="Library">
					<NavigationField href="recent/">Recent</NavigationField>
					<NavigationField href="favourites/">Favourites</NavigationField>
				</NavigationFieldsGroup>
				<NavigationFieldsGroup title="Playlists">
					<NavigationField href="playlists/create/" image="create">Create New</NavigationField>
					<NavigationField href="playlists/1" image="playlist">Playlist1</NavigationField>
					<NavigationField href="playlists/2" image="playlist">Playlist2</NavigationField>
				</NavigationFieldsGroup>
				<NavigationFieldsGroup title="General">
					<NavigationField href="settings/">Settings</NavigationField>
					<NavigationField href="logout/" image="logout">Log Out</NavigationField>
				</NavigationFieldsGroup>
			</nav>
		</div>
	);
};

export default Navigation;
