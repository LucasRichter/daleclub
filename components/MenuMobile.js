import styled from 'styled-components'
import mediaQueries from '../helpers/mediaQueries'
import React from 'react'
import Anchor from './Anchor'
import Link from 'next/link'
import PropTypes from 'prop-types'
import colors from '../helpers/colors'

const MenuToggle = styled.div`
  @media ${mediaQueries.laptop} {
    display: none;
  }

  display: block;
  position: relative;
  top: 25px;
  left: 25px;
  
  z-index: 1;
  
  user-select: none;

  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    
    cursor: pointer;
    
    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */
    
    -webkit-touch-callout: none;
  }

  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    
    background: white;
    border-radius: 3px;
    
    z-index: 1;
    
    transform-origin: 4px 0px;
    
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }

  span:first-child {
    transform-origin: 0% 0%;
  }

  span:nth-last-child(2)
  {
    transform-origin: 0% 100%;
  }

  input:checked ~ span
  {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: white;
  }

  input:checked ~ span:nth-last-child(3)
  {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  input:checked ~ span:nth-last-child(2)
  {
    transform: rotate(-45deg) translate(0, -1px);
  }

  input:checked ~ ul
{
  transform: none;
}
`

const MenuList = styled.ul`
  position: absolute;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  height: 100vh;
  background: ${colors.dark};
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

  li
  {
    padding: 10px 0;
    font-size: 22px;
  }
  
`

const MenuMobile = ({ links }) =>
  <MenuToggle>
    <input type='checkbox' />
    <span />
    <span />
    <span />

    <MenuList>
      {Object.entries(links).map(([key, value]) => (
        <Link key={key} href={`/${key}`}>
          <Anchor>
            <li>
              {value}
            </li>
          </Anchor>
        </Link>
      ))}
    </MenuList>
  </MenuToggle>

MenuMobile.propTypes = {
  links: PropTypes.object.isRequried
}

export default MenuMobile
