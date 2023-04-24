import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';

interface HeaderProps {
  title: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      padding: '1rem',
      textAlign: 'center'
    },
    title: {
      margin: 0,
      fontSize: '2rem'
    }
  })
);

const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
    </header>
  );
};

export default Header;
