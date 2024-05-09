import { type FC, type ComponentProps, memo } from 'react';
import classNames from 'classnames';
import styles from './FancyLink.module.scss';

type FancyLinkProps = ComponentProps<'a'>;

const FancyLink: FC<FancyLinkProps> = memo((props) => {
  const { children, className, href, ...rest } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a className={classNames(styles.fancyLink, className)} href={href} {...rest}>
      {children}
    </a>
  );
});

export default FancyLink;
