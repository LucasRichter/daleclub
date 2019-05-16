import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'
import { Box } from '@rebass/grid'
import Logo from './Logo'
import PropTypes from 'prop-types'

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
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

const Header = ({ currentConfig }) => (
  <StyledHeader>
    <MenuMobile socialLinks={currentConfig} links={links} />

    <Box
      mb='40px'
      mr={['auto', '100px']}
      ml={['auto', '0']}
    >
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
    </Box>

    <Menudesktop links={links} />
  </StyledHeader>
)

Header.propTypes = {
  currentConfig: PropTypes.object
}

export default Header
