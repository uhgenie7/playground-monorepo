import React from 'react';
import { Navbar, Text } from '@nextui-org/react';

const Header = () => {
  return (
    <header>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            PLAYGROUND
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/recoil">Recoil</Navbar.Link>
          <Navbar.Link href="/">React-hook-form</Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </header>
  );
};

export default Header;
