import styled, { keyframes } from 'styled-components';
import Button from 'components/button';

const fadeIn = keyframes`
  from {
    transform: translateX(60vw);
    opacity: 0.5;
  }

  to {
      transform: translateY(0);
      opacity: 1;
  }
`;

const ModalContainer = styled.div`
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 3000;
	position: fixed;
	touch-action: none;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	-webkit-tap-highlight-color: transparent;
`;

const ModalBox = styled.div`
	width: 50%;
	height: 100%;
	position: absolute;
	z-index: 3200;
	right: 0;
	bottom: 0;
	background: #fff;
	animation: ${fadeIn} 0.3s ease;
	overflow-y: auto;
`;

const PseudoContainer = styled.div`
	position: absolute;
	z-index: 3100;
	background: transparent;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const ModalTitleContainer = styled.div`
	margin-top: 60px;
	padding: 16px 36px;
	padding-top: 0;
`;

const ModalTitle = styled.h6`
	color: ${props => props.theme.color.default};
	font-size: 1.75rem;
	font-weight: 600;
	line-height: 1.6;
	margin-bottom: 0;
	padding-bottom: 1rem;
	border-bottom: 0.5px solid ${props => props.theme.grey.lightGrey};
`;

const CloseButton = styled(Button)`
  top: 8px;
  left: 8px;
  color: ${props => props.theme.color.default};
  background: none;
  position: absolute;
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.54);
  padding: 6px;
  overflow: visible;
  font-size: 1.25rem;
  text-align: center;
  z-index: 100;

  &:hover {
    box-shadow: none;
  }
`;

const ModalBody = styled.div`
	margin: 0;
	padding: 16px 36px;
	padding-top: 0;
	height: 100%;
	display: flex;
	flex-direction: column;

	* {
		flex-shrink: 0;
	}
`;

export {
	ModalContainer,
	ModalBox,
	PseudoContainer,
	ModalTitleContainer,
	ModalTitle,
	CloseButton,
	ModalBody
};
