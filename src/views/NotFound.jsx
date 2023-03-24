import { Container } from "react-bootstrap";

//Vista de datos de error de ruta
const NotFound = () => {
  return (
    <Container className="pt-5 text-center">
      <h1 className="mb-4">La ruta que intentas consultar no existe :/</h1>
    </Container>
  );
};
export default NotFound;


