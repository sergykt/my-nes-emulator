import type { FC } from 'react';
import FancyLink from '@components/FancyLink';
import Container from '@components/Container';

const Footer: FC = () => (
  <footer className='footer'>
    <Container>
      <p className='footer__engine'>
        <FancyLink href='https://github.com/bfirsh/jsnes'>NES engine by jsnes</FancyLink>
      </p>
      <p className='footer__copyright'>© 2023 Created by Sergei Sivtsev</p>
    </Container>
  </footer>
);

export default Footer;
