import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.6rem 2.4rem;
  border: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyleHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyleHeader>
  );
}

export default Header;
