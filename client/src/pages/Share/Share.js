import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes }) => {
  return (
    <div className={classes.sharePage}>

      <ShareItemPreview />
      <ShareItemForm />

    </div >
  );
};

export default withStyles(styles)(Share);
