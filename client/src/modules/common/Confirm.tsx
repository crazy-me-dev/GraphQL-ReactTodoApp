import React, { useState } from "react";

import { Modal, Button } from "./";
import styled from "../../config/styles";

const Actions = styled.div`
  text-align: center;
  button {
    margin: 0 0.5rem;
  }
`;

interface Props {
  children: (callback: Function) => {};
  title: string;
  submitText: string;
  cancelText: string;
}

const Confirm = ({ children, title, submitText, cancelText }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirm, setConfirm] = useState<Function>(() => () => {});

  return (
    <>
      <Modal
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <h2>{title}</h2>
        <Actions>
          <Button
            filled
            onClick={() => {
              confirm();
              setModalIsOpen(false);
            }}
          >
            {submitText}
          </Button>
          <Button onClick={() => setModalIsOpen(false)}>{cancelText}</Button>
        </Actions>
      </Modal>

      {children((callback: Function) => {
        setModalIsOpen(true);
        setConfirm(() => callback);
      })}
    </>
  );
};

export default Confirm;
