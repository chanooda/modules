import {
  FieldValues,
  Path,
  UseFormRegister,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import styled from 'styled-components';

interface IOnClicks {
  [key: string]: () => void;
}

export interface IInputs<FormData> {
  name: Path<FormData & FieldValues>;
  label: string;
  type: 'text' | 'password';
  buttonText?: string;
}

export function useCustomForm<FormData>(
  inputs: IInputs<FormData>[],
  onValid: SubmitHandler<FormData & FieldValues>,
  inValidCustomFn: (errMessage?: string) => void,
  onClicks?: IOnClicks
) {
  const { register, watch, handleSubmit, setValue } = useForm<
    FormData & FieldValues
  >();

  let inputSetObj: { [name: string]: JSX.Element } = {};
  const inputSetList: JSX.Element[] = [];

  // 인풋 컴포넌트 생성
  inputs.forEach((el) => {
    inputSetObj[el.name as string] = (
      <InputSet
        register={register}
        label={el.label}
        name={el.name}
        buttonText={el.buttonText}
        type={el.type}
        onClick={onClicks && onClicks[el.name as string]}
      />
    );
    inputSetList.push(
      <InputSet
        register={register}
        label={el.label}
        name={el.name}
        buttonText={el.buttonText}
        type={el.type}
        onClick={onClicks && onClicks[el.name as string]}
      />
    );
  });

  const inValid: SubmitErrorHandler<FormData & FieldValues> = (errors) => {
    if (errors) {
      inputs.every((el) => {
        if (errors[el.name as string]) {
          if (inValidCustomFn)
            inValidCustomFn(errors[el.name as string]?.message as string);
          return false;
        } else {
          return true;
        }
      });
    }
  };

  return {
    input: inputSetObj,
    inputList: inputSetList,
    onSubmit: handleSubmit(onValid, inValid),
    watch,
  };
}

interface IInputSetProps<FormData> {
  register: UseFormRegister<FormData & FieldValues>;
  label: string;
  name: Path<FormData & FieldValues>;
  type: 'text' | 'password';
  buttonText?: string;
  onClick?: () => void;
}
function InputSet<FormData>({
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
