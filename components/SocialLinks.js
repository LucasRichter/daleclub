import styled from 'styled-components'
import React from 'react'
import { Twitter, Instagram, Facebook } from 'react-feather'
import { Box } from '@rebass/grid'
import mediaQueries from '../helpers/mediaQueries'
import PropTypes from 'prop-types'
import colors from '../helpers/colors'

const StyledSocial = styled(Box)`
  display: none;

  @media ${mediaQueries.laptop} {
    display: block;
    position: fixed;
    bottom: 40px;
    left: 25px;
  }
`

const SocialMedias = ({ currentConfig }) =>
  <StyledSocial>
    <Box mb='20px'>
      <a href={currentConfig.twitter} target='_blank'>
        <Twitter color={colors.sea} />
      </a>
    </Box>
    <Box mb='20px'>
      <a href={currentConfig.instagram} target='_blank'>
        <Instagram color={colors.sea} />
      </a>
    </Box>
    <Box mb='20px'>
      <a href={currentConfig.facebook} target='_blank'>
        <Facebook color={colors.sea} />
      </a>
    </Box>
  </StyledSocial>

SocialMedias.propTypes = {
  currentConfig: PropTypes.object
}

export default SocialMedias
