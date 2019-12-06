import React, { createContext, Component } from 'react';

export const ItemPreviewContext = createContext();

const initialState = {
    title: 'Name your item',
    description: 'Describe your item',
    tags: [],
    imageurl: 'http://via.placeholder.com/300?text=Please select an image',
    itemowner: {},
    created: new Date()
}

class ItemPreviewProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: initialState
        }
    }

    updatePreview = item => {
        console.log("update", item);
        const updatedItem = { ...this.state.item, ...item }
        this.setState({
            item: updatedItem
        })
    }

    resetPreview = () => {
        this.setState({
            item: initialState
        })
    }

    render() {
        return (
            <ItemPreviewContext.Provider
                value={{
                    state: this.state,
                    updatePreview: this.updatePreview,
                    resetPreview: this.resetPreview
                }}
            >
                {this.props.children}
            </ItemPreviewContext.Provider>
        )
    }
}

export default ItemPreviewProvider;
