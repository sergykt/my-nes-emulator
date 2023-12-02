import type { FC } from 'react';
import Container from '../components/Container';

const PageNotFound: FC = () => (
  <div className='emptypage'>
    <Container className='emptypage__container'>
      <h1 className='emptypage__title'>GAME OVER</h1>
      <h2 className='emptypage__subtitle'>Page not found</h2>
    </Container>
  </div>
);

export default PageNotFound;
