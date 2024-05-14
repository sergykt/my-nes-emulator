import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'classnames';
import styles from './InputFileButton.module.scss';

interface InputButtonProps extends ComponentProps<'input'> {
  title: string;
}

const InputButton: FC<InputButtonProps> = memo((props) => {
  const { className, accept, name, id, title, onChange, ...rest } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        className={classNames(styles.input, className)}
        type='file'
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      <span>{title}</span>
    </label>
  );
});

export default InputButton;
