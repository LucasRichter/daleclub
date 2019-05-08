// pages/_app.js
import React, {Fragment} from 'react'
import App, { Container } from 'next/app'
import Header from '../components/Header'
import Reset from 'styled-reset'
import { createGlobalStyle, keyframes } from 'styled-components'
import moment from 'moment'
import SocialMedias from '../components/SocialLinks'

moment.locale('pt-br')

const bg = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`

const GlobalStyle = createGlobalStyle`
  ${Reset}


  * {
    font-family: 'Montserrat', sans-serif !important;
    line-height: 1.6 !important;
  }

  html {
    height: 100%;
    width: 100%;
    animation: ${bg} 30s ease infinite;
    background: linear-gradient(161deg, #7757cb, #58c9e0);
    background-size: 400% 400%;
  }

  strong {
    font-weight: bold !important;
  }

  /* other styles */

`

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Fragment>
        <GlobalStyle />
        <Container>
          <Header />
          <Component {...pageProps} />
          <SocialMedias />
        </Container>
      </Fragment>
    )
  }
}

export default MyApp
