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

const ItemCard = ({ classes, item }) => {
    // console.log('test-card-item', item)


    return (
        < Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={item.imageurl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS77QpvM9kV624QsyMdfRW3G83cIxz8hbVXOsBJLZQQWjHAxqC4'}
                >
                </CardMedia>
                <CardHeader
                    avatar={
                        <Avatar aria-label="user" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title={item.itemowner.fullname}
                    // "{state.item.itemowner}"
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
                    {item.title}
                </Typography>

                <Typography
                    gutterBottom
                    variant="h5"
                    component="p"
                >
                    {item.tags.map((tag) => {
                        return tag.title;
                    }).join(',')}
                </Typography>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {item.description}
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