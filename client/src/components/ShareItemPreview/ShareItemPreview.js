import React, { Component } from 'react'
import { ItemPreviewContext } from '../../context/ItemPreviewProvider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemCard from '../ItemCard';


class ShareItemPreview extends Component {
    render() {
        return (
            <ItemPreviewContext.Consumer>
                {({ state }) =>
                    <div>
                        <ItemCard state={state} />
                    </div>
                }
            </ItemPreviewContext.Consumer>
        )
    }
}

export default withStyles(styles)(ShareItemPreview);
