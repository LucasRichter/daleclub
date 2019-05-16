import styled from 'styled-components'
import React from 'react'
import { Twitter, Instagram, Facebook } from 'react-feather'
import { Flex, Box } from '@rebass/grid'
import mediaQueries from '../helpers/mediaQueries'
import PropTypes from 'prop-types'
import colors from '../helpers/colors'

const StyledSocial = styled(Flex)`
  display: none;

  @media ${mediaQueries.laptop} {
    display: flex;
  }
`

const SocialMedias = ({ socialLinks }) =>
  <StyledSocial>
    <Box mr='20px'>
      <a href={socialLinks.twitter} target='_blank'>
        <Twitter color={colors.sea} />
      </a>
    </Box>
    <Box mr='20px'>
      <a href={socialLinks.instagram} target='_blank'>
        <Instagram color={colors.sea} />
      </a>
    </Box>
    <Box mr='20px'>
      <a href={socialLinks.facebook} target='_blank'>
        <Facebook color={colors.sea} />
      </a>
    </Box>
  </StyledSocial>

SocialMedias.propTypes = {
  socialLinks: PropTypes.object
}

export default SocialMedias
