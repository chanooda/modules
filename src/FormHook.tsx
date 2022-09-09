import { UseFormRegister } from 'react-hook-form/dist/types';
import { useForm } from 'react-hook-form/dist/useForm';

export interface IInputs {
  key: string;
  label: string;
  type: 'text' | 'password';
  isButton: boolean;
}

interface IUseCustomFormParameter {
  inputs: IInputs[];
}

interface IInputSetProps<T> {
  register: UseFormRegister<T>;
  label: string;
  key: string;
  type: 'text' | 'password';
  isButton: boolean;
}

export function useCustomForm<T>({ inputs }: IUseCustomFormParameter) {
  const { register, watch, handleSubmit, setValue } = useForm();

  const inputComponents: React.ReactNode[] = [];

  inputs.forEach((el) => {
    inputComponents.push(
      <InputSet
        register={register}
        label={el.label}
        key={el.key}
        isButton={el.isButton}
        type={el.type}
      />
    );
  });
}

const InputSet = ({
  register,
  label,
  key,
  type,
  isButton,
}: IInputSetProps<T>) => {
  return <div></div>;
};
