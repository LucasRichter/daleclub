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
  align-items: flex-start;
  text-align: center;
  padding: 20px 20px 0;

  @media ${mediaQueries.laptop} {
    padding: 20px 200px;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
  }
`

const links = {
  contato: 'Contato',
  aniversarios: 'Aniversários',
  acasa: 'A casa',
  fotos: 'Fotos',
  formatura: 'Formatura/100 dias'
}

export default () => (
  <StyledHeader>
    <MenuMobile links={links} />

    <Box
      mb='40px'
      mr='auto'
      ml={['auto', '0']}
    >
      <Link href='/'>
        <Logo />
      </Link>
    </Box>

    <Menudesktop links={links} />
  </StyledHeader>
)
