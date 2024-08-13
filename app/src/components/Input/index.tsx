import { ChangeEvent, InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  freeSize?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean
}

export const Input = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = true
}: InputProps) => {
  return (
    <Container>
      {label && <label htmlFor={id}>{label}:</label>}

      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Container>
  );
};
