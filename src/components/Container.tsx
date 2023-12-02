import { FC, ComponentProps } from 'react';
import classNames from 'classnames';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = ({ children, className, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={classNames('container', className)} {...rest}>
    {children}
  </div>
);

export default Container;
