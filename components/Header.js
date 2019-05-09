import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'
import Logo from './Logo'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.laptop} {
    margin: 20px 60px 0 80px;
  }
`

const links = {
  contato: 'Contato',
  aniversarios: 'Aniversários',
  fotos: 'Fotos'
}

export default () => (
  <StyledHeader>
    <MenuMobile links={links} />

    <Link href='/'>
      <Logo />
    </Link>

    <Menudesktop links={links} />
  </StyledHeader>
)
