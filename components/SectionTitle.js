import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import TrackVisibility from 'react-on-screen'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import colors from '../helpers/colors'

const StyledTitle = styled(H2)`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  white-space: nowrap;

  ${p => p.bottom && css`
    display: block;
  `};

  color: ${p =>
    p.purple
      ? colors.purple
      : p.blueLight
        ? colors.blueLight
        : p.sea
          ? colors.sea
          : p.dark
            ? colors.dark
            : '#292929'};

    ::after {
      content: '';
      background-color: ${p =>
    p.purple
      ? colors.purple
      : p.blueLight
        ? colors.blueLight
        : p.sea
          ? colors.sea
          : p.dark
            ? colors.dark
            : '#292929'};
      display: block;
      height: 2px;
      width: 0;
      margin-left: ${p => p.bottom ? '0' : '40px'};
      transition: width .365s ease-in-out;
      ${p => p.isVisible && css`
        width: 100%;
      `};
    }
`

export default class SectionTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { title } = this.props
    return (
      <TrackVisibility once>
        <StyledTitle {...this.props}>
          {title}
        </StyledTitle>
      </TrackVisibility>
    )
  }
}
