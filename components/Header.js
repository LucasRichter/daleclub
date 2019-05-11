import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'
import { Box } from '@rebass/grid'
import Logo from './Logo'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.laptop} {
    position: absolute;
    z-index: 99;
    top: 20px;
    padding: 0 80px;
    box-sizing: border-box;
    width: 100%;
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

    <Box m='0 auto' css={{ flexGrow: 1, flexBasis: 0 }}>
      <Link href='/'>
        <Logo />
      </Link>
    </Box>

    <Menudesktop links={links} />
  </StyledHeader>
)
