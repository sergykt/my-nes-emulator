import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = ComponentProps<'button'>;

const Button: FC<ButtonProps> = memo((props) => {
  const { children, className, type, ...rest } = props;

  return (
    <button
      className={classNames(styles.button, className)}
      type={type === 'submit' ? 'submit' : 'button'}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
