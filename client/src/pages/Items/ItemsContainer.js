import React, { Component } from 'react';
import Items from './Items';
// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import { ALL_ITEMS_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    // console.log(data);
    return (
      <Items />
      // <Query query={ALL_ITEMS_QUERY}>
      //   {({ data }) => {
      //     return (<Items classes={this.props.classes} items={data.items} />);
      //   }}
      // </Query>
    );
  }
}

export default ItemsContainer;
