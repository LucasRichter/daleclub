import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import Text from '../components/Text'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

class IndexPage extends Component {
  render () {
    return (
      <main>
        <PageHead
          title='Daleclub | Aniversários'
          description='Aniversários'
        />

        <Box
          mt='40px'
          mx={['20px', '80px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Aniversários'
              dark
            />
          </Box>

          <Box css={{ textAlign: 'center' }}>
            <Text m='0 0 20px' color='white'>
              Quer comemorar teu aniver com a gente? Tu pode contar com as seguintes vantagens enviando uma lista:
            </Text>

            <Text m='0 0 20px' color='white'>
              - Aniversariante (data de aniverário 3 dias antes ou depois da festa): FREE
            </Text>

            <Text m='0 0 20px' color='white'>
  - Convidados (lista com até 15 amigos) tem entrada preferêncial e preço de lista sem limite de horário!
            </Text>

            <Text m='0 0 20px' color='white'>
  A lista deve ser enviada até as 20h do dia da festa escolhida.
            </Text>

            <Text m='0 0 20px' color='white'>
  - "O ANIVERSARIANTE TEM FILA PREFERENCIAL?": Sim. Os convidados também.
            </Text>

            <Text m='0 0 20px' color='white'>
  - "TENHO DIREITO A UM ACOMPANHANTE FREE?": Tem, é só chegar na hora!
            </Text>

            <Text m='0 0 20px' color='white'>
  - "MEU FREE VALE ATÉ QUE HORÁRIO?": Até duas e meia!
            </Text>

            <Text m='0 0 20px' color='white'>
  - "TENHO Q CHEGAR ANTES DOS MEUS CONVIDADOS?": Não precisa.
            </Text>

            <Text m='0 0 20px' color='white'>
  Não perde tempo que o número de listas que pra cada festa é limitado!
            </Text>

            <Text m='0 0 20px' color='white'>
  P.s.: nas festas OPEN BAR não teremos promoção para aniversariantes
            </Text>

            <Link href='/listaaniversario'>
              <Button color='secondary' variant='contained' size='large'>
                Enviar lista de aniversário
              </Button>
            </Link>
          </Box>

        </Box>

      </main>
    )
  }
}

export default IndexPage
