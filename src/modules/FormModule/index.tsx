import { FieldValues, Path, useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

interface IOnClicks {
  [key: string]: () => void;
}

export interface IInputs<FormData> {
  name: Path<FormData & FieldValues>;
  label: string;
  type: "text" | "password";
  buttonText?: string;
}

export function useCustomForm<FormData>(
  inputs: IInputs<FormData>[],
  onValid: SubmitHandler<FormData & FieldValues>,
  inValidCustomFn: (errMessage?: string) => void,
  InputComponent?: any,
  onClicks?: IOnClicks
) {
  const { register, ...formMethods } = useForm<FormData & FieldValues>();

  const inputSetObj: { [name: string]: JSX.Element } = {};
  const inputSetList: JSX.Element[] = [];

  // 인풋 컴포넌트 생성
  inputs.forEach((el) => {
    inputSetObj[el.name as string] = (
      <InputComponent
        register={register}
        label={el.label}
        name={el.name}
        buttonText={el.buttonText}
        type={el.type}
        onClick={
          onClicks &&
          (() => {
            const value = formMethods.watch(el.name);
            if (!value) {
              inValidCustomFn(`${el.label}을 입력해주세요.`);
              return;
            }
            onClicks[el.name as string]();
          })
        }
      />
    ) || <></>;

    inputSetList.push(
      <InputComponent
        register={register}
        label={el.label}
        name={el.name}
        buttonText={el.buttonText}
        type={el.type}
        onClick={
          onClicks &&
          (() => {
            const value = formMethods.watch(el.name);
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
          if (inValidCustomFn) inValidCustomFn(errors[el.name as string]?.message as string);
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
    onSubmit: formMethods.handleSubmit(onValid, inValid),
    formMethods,
  };
}

const Wrap = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
};
