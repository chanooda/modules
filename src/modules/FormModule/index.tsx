import {
  FieldValues,
  Path,
  UseFormRegister,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import styled from 'styled-components';
import { InputSet } from './InputSet';

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
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData & FieldValues>();

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
        onClick={
          onClicks &&
          (() => {
            const value = watch(el.name);
            if (!value) {
              inValidCustomFn(`${el.label}을 입력해주세요.`);
              return;
            }
            onClicks[el.name as string]();
          })
        }
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
    errors,
    setValue,
  };
}
