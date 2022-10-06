import React from "react";
import { SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import InputSet1 from "../../Component/FormComponent/InputSet";
import { IInputs, useCustomForm } from "../../Modules/FormModule/Index";

interface ISignupInput {
  id: string;
  name: string;
  passwordCheck: string;
  phone: string;
  email: string;
  [key: string]: string;
}

const inputs: IInputs<ISignupInput>[] = [
  { name: "id", label: "아이디", type: "text", buttonText: "중복 확인" },
  { name: "password", label: "비밀번호", type: "password" },
  { name: "passwordCheck", label: "비밀번호 확인", type: "password" },
  { name: "name", label: "이름", type: "text" },
  { name: "phone", label: "전화번호", type: "text", buttonText: "본인 인증" },
  { name: "email", label: "이메일", type: "text", buttonText: "이메일 인증" },
];

function FormView() {
  const onValid: SubmitHandler<ISignupInput> = (formData) => {
    const { password, passwordCheck } = formData;
    if (password !== passwordCheck) {
      console.log("비밀번호 같지 않음");
      return;
    }
    console.log(formData);
  };

  const customInValid = (errMessage?: string) => {
    console.log(errMessage);
  };

  const onClicks = {
    id() {
      watch("id");
      console.log(watch("id"));
    },
    phone() {
      watch("phone");
      console.log(watch("phone"));
    },
    email() {
      watch("email");
      console.log(watch("email"));
    },
  };

  const { input, inputList, onSubmit, formMethods } = useCustomForm<ISignupInput>(
    inputs,
    onValid,
    customInValid,
    InputSet1,
    onClicks
  );

  const { watch } = formMethods;

  return (
    <>
      <form onSubmit={onSubmit}>
        <AppContainer>
          <>
            {inputList.map((el, i) => (
              <React.Fragment key={i}>{el}</React.Fragment>
            ))}
          </>
        </AppContainer>
      </form>
    </>
  );
}

const AppContainer = styled.div`
  margin: 0 auto;
  padding: 50px;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  > button {
    height: 35px;
    margin-top: 15px;
    border: none;
    background-color: #39a6f0;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 16px;
  }
`;

export default FormView;
