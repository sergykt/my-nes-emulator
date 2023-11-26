import type { FC } from 'react';

const PageNotFound: FC = () => {
  return (
    <div className="emptypage">
      <div className="container emptypage__container">
        <h1 className="emptypage__title">GAME OVER</h1>
        <h2 className="emptypage__subtitle">Page not found</h2>
      </div>
    </div>

  );
};

export default PageNotFound;
