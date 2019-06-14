import styled from 'styled-components';

const Container = styled.div`
	background: #fff;
	margin-top: 66px;
	padding: 60px;
	width: 100%;
	position: relative;
`;

const SectionTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const ShoppingCartIcon = styled.div`
	color: ${props => props.theme.color.secondary};
	font-size: 35px;
	cursor: pointer;
`;

const SelectFilter = styled.select`
	padding: 5px;
	margin-right: 40px;
	background: #fff;
	border: 1px solid ${props => props.theme.color.secondary};
	border-radius: ${props => props.theme.radius};

	&:focus {
		outline: none;
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;

export { Container, SectionTitle, ShoppingCartIcon, SelectFilter, Row };
