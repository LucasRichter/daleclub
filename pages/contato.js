import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import Text from '../components/Text'
import Anchor from '../components/Anchor'
import PropTypes from 'prop-types'

class IndexPage extends Component {
  static propTypes = {
    currentConfig: PropTypes.object
  }

  render () {
    return (
      <main>
        <PageHead
          title='Daleclub | Contato'
          description='Contato'
        />

        <Box
          mt='40px'
          p={['20px', '0 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Contato'
              dark
            />
          </Box>

          <Box css={{ textAlign: 'center' }} mx='auto'>
            <Anchor
              fontSize='12px'
              lower
              href={`mailto:${this.props.currentConfig.contact_email}`}
            >
              contato@sinnersclub.com.br
            </Anchor>
          </Box>

          <Box
            my='30px'
            css={{ textAlign: 'center' }}
          >
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9905425432153!2d-51.225042185056836!3d-30.037129181884918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979005ceca0f7%3A0x3ccdcea41fe8b057!2sSinners+Club!5e0!3m2!1spt-BR!2sbr!4v1557281586764!5m2!1spt-BR!2sbr'
              style={{
                width: '100%',
                maxWidth: '400px'
              }}
              height='300'
              frameBorder='0'
              allowFullScreen
            />
          </Box>

          <Text centered m='auto' color='white'>
            R. Gen. Lima e Silva, 426 - Cidade Baixa - POA - RS.
          </Text>
        </Box>

      </main>
    )
  }
}

export default IndexPage
