import React, { Component } from 'react';
import Share from './Share';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ data }) => {
          return (
            <Share
              classes={this.props.classes}
              tags={data.tags} />
          )
        }}
      </Query>
    )
  }
}

export default ShareContainer;
