// CreateBook.tsx

import { Input } from "../../../components/Input";
import { Title } from "../../../components/Title";
import { ChangeEvent, FormEvent, useState } from "react";
import { inputProps } from "./inputProps";
import { createBook } from "../../../services/BooksAPI";
import { IBookInfo } from "../../../models/IBookInfo";
import { useNavigate } from "react-router-dom";
import { Container, StyledForm, SubmitButton, StyledInputWrapper } from "./styles";

export const CreateBook = () => {
  const [request, setRequest] = useState({} as IBookInfo);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Create Book called..")
    createBook(request)
      .then((response) => {
        if (response.status === 200) {
          alert("Book successfully added!");
          navigate("/admin/books");
        }
      })
      .catch((err) => {
        const { status } = err.response;
        const { message } = err.response.data;
        alert(`[Error ${status}] - Message: ${message}`);
      });
  };

  return (
    <Container>
      <Title text="Create Book" />
      <StyledForm onSubmit={handleSubmit}>
        {inputProps.map((input, index) => (
          <StyledInputWrapper key={index}>
            <Input
              label={input.label}
              id={input.id}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              onChange={handleChange}
            />
          </StyledInputWrapper>
        ))}
        <SubmitButton type="submit" value="Submit" />
      </StyledForm>
    </Container>
  );
};
