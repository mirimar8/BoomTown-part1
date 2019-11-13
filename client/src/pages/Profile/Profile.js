import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Profile = (props) => {
  console.log(props);
  return (
    < div >
      <p>
        This is the profile page located at <code>/profile/{props.Id}</code>
      </p>
    </div >
  );
};

export default withStyles(styles)(Profile);
