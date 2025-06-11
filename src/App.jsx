import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />

      <StyledApp>
        <Row type='vertical'>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div className=''>
              <Heading as='h2'>Chek in and out</Heading>
              <Button
                variation='primary'
                size='medium'
                onClick={() => alert('I wanted to say hi !')}
              >
                Check in
              </Button>
              <Button
                variation='secondary'
                size='small'
                onClick={() => alert('I wanted to say hi !')}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <form className=''>
              <Input type='number' placeholder='Number of guests' />
              <Input type='number' placeholder='Number of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
