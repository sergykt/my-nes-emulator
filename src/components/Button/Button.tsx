import type { FC, ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = ComponentProps<'button'>;

const Button: FC<ButtonProps> = ({ children, className, type, ...rest }) => (
  <button
    className={classNames(styles.button, className)}
    type={type === 'submit' ? 'submit' : 'button'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}
  </button>
);

export default Button;
