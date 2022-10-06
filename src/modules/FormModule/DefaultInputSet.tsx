import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

interface IInputSetProps<FormData> {
  register: UseFormRegister<FormData & FieldValues>;
  label: string;
  name: Path<FormData & FieldValues>;
  type: 'text' | 'password';
  buttonText?: string;
  onClick?: () => void;
}
export function InputSet<FormData>({
  register,
  label,
  name,
  type,
  buttonText,
  onClick,
}: IInputSetProps<FormData>) {
  return (
    <InputSetContainer>
      <label htmlFor="">{label}</label>
      <div>
        <input
          type={type}
          {...register(name, { required: `${label}을 입력해주세요.` })}
          placeholder={`${label}을 입력해주세요.`}
        />
        {buttonText && (
          <button type="button" onClick={onClick}>
            {buttonText}
          </button>
        )}
      </div>
    </InputSetContainer>
  );
}

const InputSetContainer = styled.div`
  width: 100%;
  > label {
    display: block;
    margin-bottom: 10px;
  }
  > div {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    > input {
      width: 100%;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #b4acac;
    }
    > button {
      width: 30%;
      white-space: nowrap;
      border-radius: 5px;
      border: none;
      background-color: #39a6f0;
      color: white;
    }
  }
`;
