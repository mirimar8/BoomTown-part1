import React, { Component } from 'react'
import { ItemPreviewContext } from '../../context/ItemPreviewProvider';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


export class ShareItemPreview extends Component {
    render() {
        return (
            <ItemPreviewContext.Consumer>
                {({ state })} => (
                <div>
                    <img src={state.imageUrl} />
                    <h1>{state.title}</h1>
                    <h2>{state.description}</h2>
                </div>
                )}

            </ItemPreviewContext.Consumer>
        )
    }
}


export default withStyles(styles)(ShareItemPreview);
