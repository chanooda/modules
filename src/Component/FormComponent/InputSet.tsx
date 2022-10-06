import styled from "styled-components";
import InputButton from "../../Component/ButtonComponent/InputButton";

interface IInputSet1 {
  text?: string;
  label?: string;
  isButton?: boolean;
  buttonText?: string;
  isSelect?: boolean;
  selectOption?: { text: string; value: string }[];
  disabled?: boolean;
  register?: any;
  type?: string;
  placeholder?: string;
  onClick?: () => void;
  name?: string;
}

export default function InputSet1({
  text,
  label,
  isButton = false,
  buttonText,
  isSelect = false,
  disabled = false,
  register = {},
  selectOption,
  placeholder,
  type,
  onClick,
  name,
}: IInputSet1) {
  return (
    <InputSet1Container disabled={disabled}>
      <label>{label}</label>
      <div className="inputButtonWrap">
        {isSelect ? (
          <>
            <select {...register}>
              {selectOption?.map((el, i) => (
                <option key={el.value} value={el.value}>
                  {el.text}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            {disabled ? (
              <span className={placeholder ? "placeholder" : ""}>{text}</span>
            ) : (
              <input
                type={type}
                {...register(name, { required: `${label}을 입력해주세요.` })}
                placeholder={`${label}을 입력해주세요.`}
              />
            )}
            {buttonText && (
              <InputButton
                text={buttonText || ""}
                onClick={onClick ? () => onClick() : undefined}
              />
            )}
          </>
        )}
      </div>
    </InputSet1Container>
  );
}

const InputSet1Container = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  .inputButtonWrap {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 16px;
    & > input,
    select,
    .disabledCover,
    span {
      border-radius: 5px;
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 24px;
      line-height: 47px;
      flex: 1;
      background-color: ${(props) => (props.disabled ? "#2A3748" : "white")};
      border: 1px solid #cbd3e5;
      &.placeholder {
        color: #aab1c1;
        font-size: 14px;
      }
    }
  }
  label {
    width: 154px;
    font-weight: 700;
    font-size: 16px;
    color: #2a3748;
  }
  input {
    &[type="file"] {
      display: none;
    }
  }
`;
