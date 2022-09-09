import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { IInputs, useCustomForm } from './FormHook';

interface ISignupInput {
  id: string;
  name: string;
  password: string;
  phone: string;
  email: string;
  [key: string]: string;
}

const inputs: IInputs<ISignupInput>[] = [
  { name: 'id', label: '아이디', type: 'text', buttonText: '중복 확인' },
  { name: 'password', label: '비밀번호', type: 'password' },
  { name: 'passwordCheck', label: '비밀번호 확인', type: 'text' },
  { name: 'name', label: '이름', type: 'text' },
  { name: 'phone', label: '전화번호', type: 'text', buttonText: '본인 인증' },
  { name: 'email', label: '이메일', type: 'text', buttonText: '이메일 인증' },
];

function App() {
  const onValid: SubmitHandler<ISignupInput> = (formData) => {
    const { password, passwordConfirm } = formData;
    if (password !== passwordConfirm) {
      console.log('비밀번호 같지 않음');
      return;
    }
    console.log(formData);
  };

  const customInValid = (errMessage?: string) => {
    console.log(errMessage);
  };

  const onClicks = {
    id() {
      watch('id');
      console.log(watch('id'));
    },
    phone() {
      watch('phone');
      console.log(watch('phone'));
    },
    email() {
      watch('phone');
      console.log(watch('phone'));
    },
  };

  const { input, inputList, onSubmit, watch } = useCustomForm<ISignupInput>(
    inputs,
    onValid,
    customInValid,
    onClicks
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <AppContainer>
          {inputList.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
          <button>회원가입</button>
        </AppContainer>
        <>
          ============================================================================================
        </>
      </form>
    </>
  );
}

const AppContainer = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  > button {
    height: 35px;
    border: none;
    background-color: #39a6f0;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 16px;
  }
`;

export default App;
