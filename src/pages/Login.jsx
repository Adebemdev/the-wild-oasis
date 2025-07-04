import styled from 'styled-components';
import LoginForm from '../../src/features/authentication/LoginForm';
import Logo from '../../src/ui/Logo';
import Heading from '../../src/ui/Heading';
import CabinTable from '../../src/features/cabins/CabinTable';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />

      <CabinTable />
    </LoginLayout>
  );
}

export default Login;
