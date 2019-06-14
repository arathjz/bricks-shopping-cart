import styled from 'styled-components';

const Container = styled.nav`
	width: 100%;
	height: 66px;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	display: flex;
	z-index: 900;
	transition: all 0.3s ease;
	border-bottom: 1px solid ${props => props.theme.color.secondary};
	align-items: center;
	justify-content: space-between;
	padding: 0 60px;
	background: #fff;
`;

const Logo = styled.img`
	width: 50px;
	height: auto;
`;

export { Container, Logo };
