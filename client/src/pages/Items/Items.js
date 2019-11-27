import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';

const Items = ({ classes }) => {
  return (
    <div>
      <ItemsGrid />
    </div>
  );
};

export default withStyles(styles)(Items);
