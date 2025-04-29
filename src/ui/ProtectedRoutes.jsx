import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the Authenticated useer;
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is No Authenticated user, redirect them to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3.while loading, show a spinner;
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. If there is user, render the app.

  if (isAuthenticated) return children;
};

export default ProtectedRoutes;
