import React from 'react';
import { Container, Logo } from './elements';
import withProvider from 'provider';
import Typography from 'components/typography';
import logoImg from 'static/logo.png';

const Navbar = ({ user }) => (
	<Container>
		<Logo src={logoImg} />
		<Typography variant="paragraph">
			Hello {user && user.firstName} {user && user.lastName}
		</Typography>
	</Container>
);

export default withProvider(Navbar);
