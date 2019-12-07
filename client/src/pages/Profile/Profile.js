import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';
import ProfileCard from '../../components/ProfileCard';
import Typography from '@material-ui/core/Typography';

const Profile = ({ classes, data }) => {
  console.log('data', data)
  return (
    <div className={classes.profilePage}>

      <ProfileCard data={data} />
      <Typography className={classes.title}>
        Shared Items
      </Typography>
      <div className={classes.userItems}>
        <ItemsGrid items={data.user.items} />
      </div>

    </div >
  );
};

export default withStyles(styles)(Profile);
