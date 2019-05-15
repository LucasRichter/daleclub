import styled from 'styled-components'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'

const StyledLogo = styled.img`
  margin: ${p => p.m};
  cursor: pointer;
  max-width: 100px;
  transition: transform .125s ease-in-out;
  transform: scale(1);

  @media ${mediaQueries.laptop} {
    max-width: 140px;
  }

  :hover {
    transform: scale(1.1);
  }
`

const Logo = () =>
  <picture>
    <StyledLogo as='source' srcSet='/static/logo-mobi.png' media='(max-width: 600px)' />
    <StyledLogo src='/static/logo.png' alt='Logo' />
  </picture>

export default Logo
