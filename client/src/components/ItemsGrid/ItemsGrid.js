import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import ShareItemPreview from '../../components/ShareItemPreview';
import ItemCard from '../ItemCard';

const ItemsGrid = ({ classes, items }) => {
    if (!items) return <p>no items</p>
    return (
        <div className={classes.root}>
            <Grid container className={classes.gridBox}>
                {items.map(item => (
                    <Grid key={item.id} item xs={12} className={classes.grid}>
                        <ItemCard item={item} />
                    </Grid>
                ))}

            </Grid>
        </div>
    );
}

export default withStyles(styles)(ItemsGrid);