import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import ShareItemPreview from '../../components/ShareItemPreview';

const ItemsGrid = ({ classes }) => {
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <ShareItemPreview />
                </Grid>
                <Grid item xs={4}>
                    <ShareItemPreview />
                </Grid>
                <Grid item xs={4}>
                    <ShareItemPreview />
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(ItemsGrid);