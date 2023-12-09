import { FC, ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './FancyLink.module.scss';

type FancyLinkProps = ComponentProps<'a'>;

const FancyLink: FC<FancyLinkProps> = ({ children, className, href, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a className={classNames(styles.fancyLink, className)} href={href} {...rest}>
    {children}
  </a>
);

export default FancyLink;
