import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './NavElement'
const Navbar = () => {
  return (
    <>
      <PrimaryNav>
        <Hamburger />
        <Menu>
          <MenuLink to="/ListUser" activeStyle>
            Listar Usuários
          </MenuLink>
          <MenuLink to="/RegisterUser" activeStyle>
            Cadastrar Usuários
          </MenuLink>
        </Menu>
      </PrimaryNav>
    </>
  )
}
export default Navbar