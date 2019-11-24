import React from 'react'
import { withStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
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
    console.log(state.item);
    return (
        < Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={state.item.imageUrl}
                >
                </CardMedia>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title='hi'
                    subheader='hihi'
                />
            </CardActionArea>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    title='{state.item.title}'
                >
                    Lizard
                    </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    description={state.item.description}
                >
                    djckjsdckjsckjsdckjsdkjcndnskcd
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    BORROW
                </Button>
            </CardActions>

        </Card >

    );
}


export default withStyles(styles)(ItemCard);