import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 9rem;

  h2 {
    font-weight: 400;
    margin-bottom: 2rem;

    span {
      font-weight: 700;
    }
  }

  a {
    text-decoration: none;
    color: #fff;

    p {
      text-transform: capitalize;
    }
  }
`;
