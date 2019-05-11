import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

const PageHead = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <link rel='shortcut icon' type='image/png' href='/static/fav.ico' />
    <link rel='stylesheet' type='text/css' charset='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
    <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
    <link href='https://fonts.googleapis.com/css?family=Inconsolata|Montserrat|Work+Sans:400,600|Material+Icons' rel='stylesheet' />
    <meta name='description' content={description} />
    <meta charSet='utf-8' />
    <meta httpEquiv='content-language' content='pt-br' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  </Head>
)

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default PageHead
