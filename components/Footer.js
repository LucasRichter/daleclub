import styled from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.laptop} {
    padding: 40px 200px 80px;
  }
`

const Footer = () =>
  <StyledFooter>
    <Logo />
    <Text color='white'>
      © 2019 Daleclub, Todos os direitos reservados
    </Text>
  </StyledFooter>

export default Footer
