import styled from "styled-components";

export const Container = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .sign-out {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #5280e2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3a60c0;
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const NavItems = styled.ul<{ isOpen: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  gap: 2rem;

  li {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 1.1rem;
      font-weight: 500;
      color: #5280e2;
      transition: color 0.3s ease;

      svg {
        margin-right: 0.5rem;
      }

      &:hover {
        color: #3a60c0;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    width: 100%;
    max-width: 300px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease;

    li {
      margin-bottom: 1rem;
    }
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 0.4rem;

  span {
    width: 25px;
    height: 2px;
    background-color: #5280e2;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
