import styled from 'styled-components';

const Item = styled.div`
	width: 100%;
	border-bottom: 1px solid ${props => props.theme.grey.veryLightGrey};
	margin-bottom: 20px;
	padding-bottom: 5px;
	position: relative;
`;

const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
`;

const RemoveIcon = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	svg {
		font-size: 25px;
		color: ${props => props.theme.color.secondary};
		cursor: pointer;
	}
`;

export { Item, Actions, RemoveIcon };
