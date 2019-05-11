import styled from 'styled-components'

const Logo = styled.img`
  margin: ${p => p.m};
  max-width: 100px;
  cursor: pointer;
  transition: transform .125s ease-in-out;
  transform: scale(1);

  :hover {
    transform: scale(1.1);
  }
`

Logo.defaultProps = {
  src: '/static/logo.png', alt: 'logo'
}

export default Logo
