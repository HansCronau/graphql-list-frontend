import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import List from './List';
import ItemContainer from './ItemContainer';

const listQuery = gql`
query {
  list {
    id
    value
  }
}
`;

const ListContainer = ({ ...restProps }) => (
  <div className="List">
    <Query query={listQuery}>
      {({ loading, error, data }) => {
        if (loading) return 'loading';
        if (error) return 'error';
        return (
          <List >
            {data.list.map(item => (
              <ItemContainer
                key={item.id}
                item={item}
                {...restProps}
              />
            ))}
          </List>
        );
      }}
    </Query>
  </div>
);

export default ListContainer;
