import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import FocusTrap from "focus-trap-react";

import styled, { color, mq } from "../../config/styles";
import usePortal from "../../utils/usePortal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModalBox: React.FC<Props> = ({ children, onClose }) => {
  const styleProps = useSpring({
    from: { opacity: 0, transform: `scale(0.8)` },
    to: { opacity: 1, transform: `scale(1.0)` },
    config: { duration: 150 }
  });

  return (
    <animated.div style={styleProps}>
      <FocusTrap>
        <ModalBoxWrapper>
          <CloseButton
            onClick={() => onClose()}
            data-testid="modal-close-button"
          >
            &times;
          </CloseButton>
          {children}
        </ModalBoxWrapper>
      </FocusTrap>
    </animated.div>
  );
};

const Modal: React.FC<Props> = ({ children, open, onClose }) => {
  const overlayElement = useRef(null);
  const styleProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const target = usePortal("modal-root");

  if (!open) return null;

  return ReactDOM.createPortal(
    <animated.div style={styleProps} tabIndex={-1}>
      <span tabIndex={0} />
      <Wrapper
        ref={overlayElement}
        data-testid="modal-outside"
        onMouseDown={e => {
          if (e.target === overlayElement.current) {
            onClose();
          }
        }}
      >
        <ModalBox onClose={onClose} open={open}>
          {children}
        </ModalBox>
      </Wrapper>
      <span tabIndex={0} />
    </animated.div>,
    target
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalBoxWrapper = styled.div`
  text-align: center;
  position: relative;
  background: ${color("background")};
  padding: 2rem;
  min-width: 0;
  height: 100vh;
  width: 100vw;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;

  ${mq("medium")} {
    display: block;
    padding: 4rem;
    max-width: 540px;
    min-width: 400px;
    height: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  font-size: 2rem;
  line-height: 1;
  &:hover,
  &:focus {
    outline: none;
    color: ${color("primary")};
  }
`;

export default Modal;
