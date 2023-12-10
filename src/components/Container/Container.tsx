import type { FC, ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = ({ children, className, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={classNames(styles.container, className)} {...rest}>
    {children}
  </div>
);

export default Container;
