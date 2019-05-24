import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import TrackVisibility from 'react-on-screen'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import colors from '../helpers/colors'

const Span = styled.span`
  ${p => p.empty && css`
    width: 10px;
  `};

  color: currentColor;
  opacity: 0;
  display: inline-block;
  transform: translateY(20%);
  transition: all ${p => p.index * 0.125}s ease-in-out;
`

const StyledTitle = styled(H2)`
  align-items: center;
  text-transform: uppercase;
  white-space: nowrap;
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
      height: 1px;
      width: 0;
      margin-left: ${p => p.bottom ? '0' : '40px'};
      transition: width .500s ease-in-out;
      max-width: 100%;
      margin: 0 auto;
      margin-top: 10px;
      ${p => p.isVisible && css`
        width: 500px;
      `};
    }


    ${Span} {
      ${p => p.isVisible && css`
        opacity: 1;
        transform: translateY(0);
      `}
    }

`

export default class SectionTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  get titleSpan() {
    const { title } = this.props
    const spans = []
    for (let i = 0; i < title.length; i++) {
      let letter = title[i]

      spans.push(
        <Span empty={!letter.trim()} key={i} index={i + 1} >
          {letter}
        </Span>
      )
    }

    return spans
  }

  render() {
    return (
      <TrackVisibility once>
        <StyledTitle centered {...this.props}>
          {this.titleSpan}
        </StyledTitle>
      </TrackVisibility>
    )
  }
}
