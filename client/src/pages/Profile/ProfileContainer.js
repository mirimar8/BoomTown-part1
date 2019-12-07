import React, { Component } from 'react';
import Profile from './Profile';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from "../../context/ViewerProvider";


export default class ProfileContainer extends Component {

  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => {
          return (
            <Query
              query={ALL_USER_ITEMS_QUERY}
              variables={{
                id: this.props.match.params.userid || viewer.id
              }}
            >
              {({ loading, error, data }) => {
                console.log('error is', error);
                console.log('data', data)
                // console.log('viewer', viewer)

                if (loading || !data) return <p>loading</p>
                return (
                  <Profile
                    classes={this.props.classes}
                    data={data} />
                )
                return <div>whatever</div>
              }}
            </Query>
          )
        }
        }
      </ViewerContext.Consumer>
    )
  }


}
