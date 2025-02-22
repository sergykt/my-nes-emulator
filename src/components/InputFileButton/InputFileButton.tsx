import { type FC, type ComponentProps, memo, useRef } from 'react';
import classNames from 'clsx';
import Button from '../Button';
import styles from './InputFileButton.module.scss';

interface InputButtonProps extends ComponentProps<'input'> {
  title: string;
}

const InputButton: FC<InputButtonProps> = memo((props) => {
  const { className, accept, name, id, title, onChange, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Button type='button' className={styles.button} onClick={() => inputRef.current?.click()}>
      <input
        className={classNames(styles.input, className)}
        type='file'
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        ref={inputRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {title}
    </Button>
  );
});

export default InputButton;
