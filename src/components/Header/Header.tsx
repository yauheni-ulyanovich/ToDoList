import './Header.scss';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const DEFAULT_CLASSNAME = 'header';

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className={DEFAULT_CLASSNAME}>
      <h1 className={`${DEFAULT_CLASSNAME}__title`}>{title}</h1>
      {subtitle && (
        <h2 className={`${DEFAULT_CLASSNAME}__subtitle`}>{subtitle}</h2>
      )}
    </header>
  );
};

export default Header;
