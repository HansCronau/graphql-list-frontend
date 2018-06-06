import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const listQuery = gql`
query {
  list {
    id
    value
  }
}
`;

class ListContainer extends Component {
  render() {
    return (
      <div className="List">
        <Query query={listQuery}>
          {({ loading, error, data }) => {
            // console.log('loading: ', loading);
            // console.log('error: ', error);
            if (loading) return 'loading';
            if (error) return 'error';
            return (
              <List>
                {data.list.map(option => (
                  <li key={option.id}>
                    <input type="checkbox" checked={option.value} readOnly />
                  </li>
                ))}
              </List>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ListContainer;
