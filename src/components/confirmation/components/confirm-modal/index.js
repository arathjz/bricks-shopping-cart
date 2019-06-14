import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components/card';
import Button from 'components/button';
import {
	ModalContainer,
	ModalBox,
	ModalTitleContainer,
	ModalTitle,
	ModalActions,
	PseudoContainer,
	ModalBody
} from './elements';

class ConfirmModal extends Component {
	componentDidMount = () => {
		const { body } = document;
		body.style.overflow = 'hidden';
	};

	componentWillUnmount = () => {
		const { body } = document;
		body.style.overflow = null;
	};

	render() {
		const { confirm, cancel, message, title } = this.props;
		return (
			<ModalContainer>
				<ModalBox animate>
					<Card>
						<ModalTitleContainer>
							<ModalTitle>{title}</ModalTitle>
						</ModalTitleContainer>
						{message && <ModalBody>{message}</ModalBody>}
						<ModalActions>
							<Button
								size="large"
								color="default"
								marginR="20"
								variant="outlined"
								onClick={cancel}
							>
								Cancelar
							</Button>
							<Button size="large" color="secondary" onClick={confirm}>
								Confirmar
							</Button>
						</ModalActions>
					</Card>
				</ModalBox>
				<PseudoContainer onClick={cancel} />
			</ModalContainer>
		);
	}
}

ConfirmModal.defaultProps = {
	message: null,
	title: 'Are you sure?'
};

ConfirmModal.propTypes = {
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
	message: PropTypes.string,
	title: PropTypes.string
};

export default ConfirmModal;
