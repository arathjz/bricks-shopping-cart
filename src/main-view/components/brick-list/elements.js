import styled from 'styled-components';
import Button from 'components/button';

const BrickCard = styled.div`
	min-height: 70px;
	margin-bottom: 20px;
	border-radius: ${props => props.theme.radius};
	box-shadow: ${props => props.theme.shadow};
	border-left: 3px solid ${props => props.theme.color.secondary};
	padding: 20px;
	position: relative;
`;

const BuyButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`;

export { BrickCard, BuyButton };
