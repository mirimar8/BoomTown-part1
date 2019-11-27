import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

const ItemCard = ({ classes, state }) => {
    // console.log(state.item);
    return (
        < Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={state.item.imageurl}
                >
                </CardMedia>
                <CardHeader
                    avatar={
                        <Avatar aria-label="user" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    // title="{state.item.itemowner}"
                    subheader="date"
                // {state.item.created}
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                    {state.item.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {state.item.description}
                </Typography>

            </CardContent>
            <CardActions className={classes.borrowBotton}>
                <Button variant="outlined">
                    BORROW
                </Button>
            </CardActions>
        </Card >
    );
}


export default withStyles(styles)(ItemCard);