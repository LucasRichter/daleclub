import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import Text from '../components/Text'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import styled from 'styled-components'

const Image = styled.div`
  background-image: url(http://www.sinnersclub.com.br/uploads/event/cover_image/706/main_cartaz.png);
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  flex-basis: 0;
`

class IndexPage extends Component {
  render () {
    return (
      <main>
        <PageHead
          title='Daleclub | Aniversários'
          description='Aniversários'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 80px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Aniversários'
              dark
            />
          </Box>

          <Flex>
            <Image />

            <Box ml='20px' css={{ flexGrow: 1, flexBasis: 0 }}>
              <Text m='0 0 20px'>
                Quer comemorar teu aniver com a gente? Tu pode contar com as seguintes vantagens enviando uma lista:
              </Text>

              <Text m='0 0 20px'>
                - Aniversariante (data de aniverário 3 dias antes ou depois da festa): FREE
              </Text>

              <Text m='0 0 20px'>
    - Convidados (lista com até 15 amigos) tem entrada preferêncial e preço de lista sem limite de horário!
              </Text>

              <Text m='0 0 20px'>
    A lista deve ser enviada até as 20h do dia da festa escolhida.
              </Text>

              <Text m='0 0 20px'>
    - "O ANIVERSARIANTE TEM FILA PREFERENCIAL?": Sim. Os convidados também.
              </Text>

              <Text m='0 0 20px'>
    - "TENHO DIREITO A UM ACOMPANHANTE FREE?": Tem, é só chegar na hora!
              </Text>

              <Text m='0 0 20px'>
    - "MEU FREE VALE ATÉ QUE HORÁRIO?": Até duas e meia!
              </Text>

              <Text m='0 0 20px'>
    - "TENHO Q CHEGAR ANTES DOS MEUS CONVIDADOS?": Não precisa.
              </Text>

              <Text m='0 0 20px'>
    Não perde tempo que o número de listas que pra cada festa é limitado!
              </Text>

              <Text m='0 0 20px'>
    P.s.: nas festas OPEN BAR não teremos promoção para aniversariantes
              </Text>

              <Link href='/lista'>
                <Button color='secondary' variant='contained' size='large'>
                  Enviar lista de aniversário
                </Button>
              </Link>
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default IndexPage
