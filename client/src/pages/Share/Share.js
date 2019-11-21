import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import ShareItemForm from '../../components/ShareItemForm';
// import ShareItemPreview from '../../components/ShareItemPreview';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/


const Share = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6}>
        <Typography
          variant="button"
          gutterBottom
          className={classes.subheading}
        >
        </Typography>
        <Typography variant="h1" className={classes.headline}>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="h3">
          Share. Borrow. <br></br>Prosper.

        </Typography>
        <ShareItemForm />
      </Grid>
    </Grid >
  );
};

// const ShareItemPreview = ({ classes }) => {
//   return (
//     <ShareItemPreview />
//   );
// };
export default withStyles(styles)(Share);
