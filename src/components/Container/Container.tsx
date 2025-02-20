import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'clsx';
import styles from './Container.module.scss';

type ContainerProps = ComponentProps<'div'>;

const Container: FC<ContainerProps> = memo((props) => {
  const { children, className, ...rest } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames(styles.container, className)} {...rest}>
      {children}
    </div>
  );
});

export default Container;
