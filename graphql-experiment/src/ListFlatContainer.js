import React from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import List from './List';
import Item from './Item';

const FLAT_LIST = gql`
query flatList{
  flatList {
    value
  }
}
`;

const UPDATE_LIST = gql`
mutation updateFlatList($list: [FlatItemInput]) {
  updateFlatList(list: $list) {
    value
  }
}
`;

const ListFlatContainer = ({ name, optimistic, grayOut, ...restProps }) => (
  <div className="List">
    <Query query={FLAT_LIST}>
      {({ loading, error, data }) => {
        // console.log('loading: ', loading);
        // console.log('error: ', error);
        // console.log(name, loading, error, data);
        if (loading) return 'loading';
        // if (error) return 'error';
        return (
          <Mutation
            mutation={UPDATE_LIST}
            onError={() => console.log('There was an error. DON\'T PANIC.')}
          >
            {(updateFlatList, { loading, error }) => {
              const disabled = !optimistic && grayOut && loading;              
              return (
                <List>
                  {data.listFlat.list.map((item, index) => (
                    <Item disabled={disabled} error={!!error}>
                      <input
                        type="checkbox"
                        checked={item.value}
                        readOnly
                        onChange={
                          e => {
                            const list = data.listFlat.list.map(({ value }) => ({ value }));
                            list[index] = {
                              value: !list[index].value
                            }
                            updateFlatList({
                              variables: {
                                list,
                              },
                            })
                          }
                        }
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
