import React from "react";
import styled from "styled-components";

interface IInputButton {
  text: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function InputButton({ text, onClick, children }: IInputButton) {
  return (
    <InputButtonContainer type="button" onClick={onClick}>
      {text}
      {children}
    </InputButtonContainer>
  );
}

const InputButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 167px;
  height: 47px;
  background-color: #438cae;
  color: white;
  border-radius: 69px;
  font-size: 15px;
  line-height: 22px;
`;
