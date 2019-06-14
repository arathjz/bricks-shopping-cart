import React, { Fragment, Component } from 'react';
import RoundClear from 'react-md-icon/dist/RoundClear';
import ModalPortal from 'components/modal-portal';
import {
	ModalBox,
	ModalContainer,
	PseudoContainer,
	ModalTitleContainer,
	ModalTitle,
	ModalBody,
	CloseButton
} from './elements';

class SideModal extends Component {
	componentDidUpdate = prevProps => {
		const { active } = this.props;
		const { body } = document;
		if (prevProps.active !== active) {
			if (active) {
				body.style.overflow = 'hidden';
			} else {
				body.style.overflow = null;
			}
		}
	};
	render() {
		const { active, closeButton, title, children } = this.props;
		return (
			<Fragment>
				{active && (
					<ModalPortal>
						<ModalContainer>
							<ModalBox id="side-modal-box">
								<CloseButton onClick={closeButton}>
									<RoundClear />
								</CloseButton>
								<ModalTitleContainer>
									<ModalTitle>{title}</ModalTitle>
								</ModalTitleContainer>
								<ModalBody>{children}</ModalBody>
							</ModalBox>
							<PseudoContainer onClick={closeButton} />
						</ModalContainer>
					</ModalPortal>
				)}
			</Fragment>
		);
	}
}

export default SideModal;
