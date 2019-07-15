import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import { useSelector } from 'react-redux';
import { Selectors } from '../redux/logs';

import styles from './style.module.css';

export default () => {
  const logs = useSelector(Selectors.all);
  return (
    <Card>
      <CardHeader 
        title="Logs"
      />
      <CardContent className={styles.logs}>
        {logs.map(log => <p>{log}</p>)}
      </CardContent>
    </Card>
  )
}