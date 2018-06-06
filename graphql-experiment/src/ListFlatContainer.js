import React from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import List from './List';
import Item from './Item';

const listQuery = gql`
query list{
  listFlat {
    value
  }
}
`;

const UPDATE_LIST = gql`
mutation updateList($values: [Boolean]) {
  updateList(values: $values) {
    value
  }
}
`;

const ListFlatContainer = ({ name, optimistic, grayOut, ...restProps }) => (
  <div className="List">
    <Query query={listQuery}>
      {({ loading, error, data }) => {
        // console.log('loading: ', loading);
        // console.log('error: ', error);
        // console.log(name, loading, error, data);
        if (loading) return 'loading';
        if (error) return 'error';
        return (
          <Mutation
            mutation={UPDATE_LIST}
            onError={() => console.log('There was an error. DON\'T PANIC.')}
          >
            {(updateList, { loading, error }) => {
              const disabled = !optimistic && grayOut && loading;              
              return (
                <List>
                  {data.listFlat.map(item => (
                    <Item disabled={disabled}>
                      <input
                          type="checkbox"
                          checked={item.value}
                          readOnly
                          onChange={()=>null}
                          disabled={disabled}
                      />
                  </Item>
                  ))}
                </List>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </div>
);

export default ListFlatContainer;
