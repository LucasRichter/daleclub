import styled from 'styled-components'
import React from 'react'
import { Twitter, Instagram, Facebook } from 'react-feather'
import { Box } from '@rebass/grid'
import mediaQueries from '../helpers/mediaQueries'

const links = [
  {
    link: 'https://twitter.com/SinnersPOA',
    Icon: Twitter
  },
  {
    link: 'https://www.instagram.com/instasinners/',
    Icon: Instagram
  },
  {
    link: 'https://www.facebook.com/WelcomeToSinners',
    Icon: Facebook
  }
]
const StyledSocial = styled(Box)`
  display: none;

  @media ${mediaQueries.laptop} {
    display: block;
    position: fixed;
    bottom: 40px;
    left: 25px;
  }
`

const SocialMedias = () =>
  <StyledSocial>
    {links.map(({ Icon, link }) => (
      <Box key={link} mb='20px'>
        <a href={link} target='_blank'>
          <Icon />
        </a>
      </Box>
    ))}
  </StyledSocial>

export default SocialMedias
