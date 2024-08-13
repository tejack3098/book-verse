import { Title } from "../../components/Title";
import { Container } from "./styles";

const NotFound = () => {
  return (
    <Container>
      <Title text={"Page Not Found"} />
      <img src="/src/assets/images/not-found.svg" alt="" />
    </Container>
  );
};

export default NotFound;
