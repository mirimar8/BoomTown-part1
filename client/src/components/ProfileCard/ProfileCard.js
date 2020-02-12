import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const ProfileCard = ({ data, classes }) => {
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContainer}>
                <div className={classes.userName}>
                    <Avatar className={classes.avatar}>M</Avatar>
                    <Typography className={classes.fullname}>

                        {data.user.fullname}
                    </Typography>
                </div>

                <Typography
                    className={classes.userInfo}
                    variant="h5"
                    component="h2">
                    {data.user.items.length} Items shared 0 Items borrowed.

                </Typography>

                <Typography
                    className={classes.userBio}
                    variant="body2"
                    component="h3">
                    {!data.user.bio ? '"No bio provided."' : data.user.bio}
                </Typography>
            </CardContent>

        </Card>
    );
}
export default withStyles(styles)(ProfileCard);