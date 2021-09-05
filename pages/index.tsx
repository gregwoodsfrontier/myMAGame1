import React from 'react';
import { Layout } from 'components/sections/layout';
import { styled } from 'theme';
import { Panel, Button } from 'components/ui';
import { useAavegotchi } from 'context/AavegotchiContext';
import router from 'next/router';

const Grid = styled.section`
  display: grid;
  gap: 3.2rem;

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQueries.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.light2};
  padding: 2.4rem;
  color: ${({ theme }) => theme.colors.dark0};

  :hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primaryAccent};
  }

  p {
    margin: 0;
  }
`

const PlayButtonContainer = styled.div`
  padding-top: 2.4rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Home = () => {
  const { state: { selectedAavegotchiId }} = useAavegotchi();

  return (
    <Layout>
      <Panel>
        <h1>SamuGotchi ShowDown</h1>
        <p>Get started by editing <b>pages/index.tsx</b>.</p>
        <Grid>
          <Card target="_blank">
            <h3>Rules</h3>
            <p>Be the fastest to show who's boss. First to score 10 points wins the shoDown</p>
          </Card>
          <Card target="_blank">
            <h3>Rules</h3>
            <p>A-key = GUARD. W-key = SLASH. D-key = THROW. Think of GUARD as rock, SLASH as paper, THROW as scissors.</p>
          </Card>
          <Card target="_blank">
            <h3>When the ❗ sign flashes</h3>
            <p>Choose your SHODOWN! QUICK! Else you trip and enemy SHODOWNED you.</p>
          </Card>
          <Card target="_blank">
            <h3>If you are ready to duel</h3>
            <p>PRESS PLAY AND SHOW WHOSE TURF IS THIS.</p>
          </Card>
          
        </Grid>
      </Panel>
      <PlayButtonContainer>
        <Button
          disabled={!selectedAavegotchiId}
          primary
          onClick={() => router.push('/play')}
        >
          PLAY
        </Button>
      </PlayButtonContainer>
    </Layout>
  )
}

export default Home;