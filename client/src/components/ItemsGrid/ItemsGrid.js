import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import ShareItemPreview from '../../components/ShareItemPreview';

const ItemsGrid = ({ classes, items }) => {
    // function FormRow() {
    //     return (
    //         <React.Fragment>
    //             <Grid item xs={4}>
    //                 <ShareItemPreview />
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <ShareItemPreview />
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <ShareItemPreview />
    //             </Grid>
    //         </React.Fragment>
    //     );
    // }

    if (!items) return <p>no items</p>
    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.gridBox}>
                {items.map(item => (
                    <Grid key={item.id} item xs={12} spacing={3}>
                        <ShareItemPreview title={item.title} description={item.description} />
                    </Grid>
                ))}
                {/* <Grid item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid item xs={12} spacing={3}>
                    <FormRow />
                </Grid> */}
            </Grid>
        </div>
    );
}

export default withStyles(styles)(ItemsGrid);