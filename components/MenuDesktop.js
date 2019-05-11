import styled from 'styled-components'
import mediaQueries from '../helpers/mediaQueries'
import React from 'react'
import Anchor from './Anchor'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Flex } from '@rebass/grid'

const Menu = styled.div`
  display: none;
  @media ${mediaQueries.laptop} {
    display: block;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const MenuDesktop = ({ links }) =>
  <Menu>
    <Flex
      justifyContent='space-between'
      alignItems='center'
    >
      {Object.entries(links).map(([key, value]) => (
        <Link key={key} href={`/${key}`}>
          <Anchor>
            {value}
          </Anchor>
        </Link>
      ))}
    </Flex>
  </Menu>

MenuDesktop.propTypes = {
  links: PropTypes.object.isRequired
}

export default MenuDesktop
