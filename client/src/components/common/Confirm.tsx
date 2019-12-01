import React, { useState } from "react";

import { Modal, Button } from "./";
import styled from "../../config/styles";

interface Props {
  children: (callback: Function) => {};
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

const Confirm = ({
  children,
  title,
  confirmButtonText,
  cancelButtonText
}: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [callback, setCallback] = useState<Function>(() => () => {});

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
            data-testid="confirm-button"
            onClick={() => {
              callback();
              setModalIsOpen(false);
            }}
          >
            {confirmButtonText}
          </Button>
          <Button
            data-testid="confirm-cancel-button"
            onClick={() => setModalIsOpen(false)}
          >
            {cancelButtonText}
          </Button>
        </Actions>
      </Modal>

      {children((callback: Function) => {
        setModalIsOpen(true);
        setCallback(() => callback);
      })}
    </>
  );
};

const Actions = styled.div`
  text-align: center;
  button {
    margin: 0 0.5rem;
  }
`;

export default Confirm;
