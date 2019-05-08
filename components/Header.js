import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import { Box } from '@rebass/grid'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.laptop} {
    margin: 40px 80px;
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

    <Box css={{ maxWidth: '140px', flexGrow: 1, flexBasis: 0 }}>
      <Link href='/'>
        logo
      </Link>
    </Box>

    <Menudesktop links={links} />
  </StyledHeader>
)
