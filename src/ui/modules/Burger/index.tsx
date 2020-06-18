import styled from 'ui/themes/styled';
import React, { FC } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { Power, Settings } from 'react-feather';
import Avatar from 'ui/elements/Avatar';
// import  Button  from 'ui/elements/Button';

export const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
export interface MenuProps {
  open: boolean;
  Side: JSX.Element;
  setOpen(_: boolean): any;
  userImage: string;
  name: string;
  username: string;
  signout(): any;
}
export const Menu: FC<MenuProps> = ({
  open,
  Side,
  setOpen,
  userImage,
  name,
  username,
  signout
}) => {
  return (
    <>
      {open && <Background onClick={() => setOpen(false)} />}
      <StyledMenu open={open}>
        <Profile>
          <User>
            <Avatar size="s" src={userImage} />
            <Title>{name}</Title>
            <Username>{username}</Username>
            <Span>
              <Settings size="24" strokeWidth={1} color={'#333'} />
            </Span>
          </User>
          {/* <Button variant="primary">Create a new community</Button> */}
        </Profile>
        <Communities>{Side}</Communities>

        <Bottom>
          <List>
            <Item onClick={signout}>
              <Power size={24} strokeWidth={1} color={'#333'} />
              <Box ml={2}>Sign out</Box>
            </Item>
          </List>
        </Bottom>
      </StyledMenu>
    </>
  );
};

const Bottom = styled(Box)``;
const Profile = styled(Box)`
  padding: 16px;
  border-bottom: ${props => props.theme.colors.border};
`;
const User = styled(Box)`
  position: relative;
  > div:first-of-type {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
`;

const Span = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  line-height: initial;
`;
const Title = styled(Box)`
  line-height: initial;
  margin-top: 8px;
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
`;
const Username = styled(Box)`
  line-height: initial;
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.mediumdark};
`;
const Communities = styled(Box)``;

const List = styled.div<{ lined?: boolean }>`
  border-top: ${props => props.theme.colors.border};
`;
const Item = styled(Flex)`
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  align-items: center;
  & span {
    display: inline-block;
    margin-right: 8px;
  }
  & a {
    color: inherit !important;
    text-decoration: none;
  }
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Background = styled(Box)<{ open: boolean }>`
  z-index: 99998;
  background: rgba(0,0,0,.9);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: calc(100vh - 75px);
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  // transform: ${({ open }) => (open ? '' : 'translateX(-100%)')};
`;

export const StyledBurger = styled.button<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  line-height: 75px;
  margin: 0 auto;
  margin-top: 26px;
  &:focus {
    outline: none;
  }

  div {
    width: 18px;
    height: 2px;
    background: ${({ theme, open }) => (open ? theme.colors.primary : theme.colors.darker)};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

export const StyledMenu = styled.nav<{ open: boolean }>`
  background: ${({ theme }) => theme.colors.appInverse};
  height: calc(100vh - 75px);
  text-align: left;
  // padding: 2rem;
  position: absolute;
  z-index: 999999999999;
  top: 0;
  left: 0;
  bottom: 0px;
  right: 16px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  overflow: scroll;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
