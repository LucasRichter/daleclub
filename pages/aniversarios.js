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
  width: 400px;
  max-width: 100%;
  height: 400px;
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
          p={['20px', '40px 200px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Aniversários'
              dark
            />
          </Box>

          <Flex flexDirection={['column', 'row']}>

            <Box mb={['20px', '']}>
              <Image />
            </Box>

            <Box ml='20px' >
              <Text m='0 0 20px'>
                Quer comemorar teu aniver com a gente? Tu pode contar com as seguintes vantagens enviando uma lista:
              </Text>

              <Text bold >
                - Aniversariante (data de aniverário 3 dias antes ou depois da festa):
              </Text>

              <Text m='0 0 20px'>
                FREE
              </Text>

              <Text bold m='0 0 20px'>
    - Convidados (lista com até 15 amigos) tem entrada preferêncial e preço de lista sem limite de horário!
              </Text>

              <Text m='0 0 20px'>
    A lista deve ser enviada até as 20h do dia da festa escolhida.
              </Text>

              <Text bold>
    - "O ANIVERSARIANTE TEM FILA PREFERENCIAL?":
              </Text>

              <Text m='0 0 20px'>
              Sim. Os convidados também.
              </Text>

              <Text bold >
    - "TENHO DIREITO A UM ACOMPANHANTE FREE?":
              </Text>

              <Text m='0 0 20px'>
Tem, é só chegar na hora!
              </Text>

              <Text bold >
    - "MEU FREE VALE ATÉ QUE HORÁRIO?":
              </Text>

              <Text m='0 0 20px'>
              Até duas e meia!
              </Text>

              <Text bold >
    - "TENHO Q CHEGAR ANTES DOS MEUS CONVIDADOS?":
              </Text>

              <Text m='0 0 20px'>
              Não precisa.
              </Text>

              <Text m='0 0 20px'>
    Não perde tempo que o número de listas que pra cada festa é limitado!
              </Text>

              <Text m='0 0 20px'>
    P.s.: nas festas OPEN BAR não teremos promoção para aniversariantes
              </Text>

              <Link href='/lista'>
                <Button color='secondary' variant='contained' size='large'>
                  Enviar lista
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
