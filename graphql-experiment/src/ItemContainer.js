import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Item from './Item';

const UPDATE_ITEM = gql`
mutation updateItem($id: ID, $value: Boolean) {
  updateItem(id: $id, value: $value) {
    id
    value
  }
}
`;

const ItemContainer = ({ item, optimistic }) => (
  <Item className="Item">
    <Mutation
        mutation={UPDATE_ITEM}
        onError={() => console.log('There was an error. DON\'T PANIC.')}
    >
      {(updateItem, { loading, error }) => {
        // console.log('loading: ', loading);
        // console.log('error: ', error);
        // if (error) return 'error';

        return (
          <React.Fragment>
            <input
                type="checkbox"
                checked={item.value}
                readOnly
                onChange={e => {
                    const { id, value } = item;
                    updateItem({
                        variables: {
                            id,
                            value: !value,
                        },
                        optimisticResponse:
                          optimistic
                          ? {
                            __typename: 'Mutation',
                            updateItem: {
                              __typename: 'Item',
                              id,
                              value: !value,
                            }
                          }
                          : null,
                    });
                }}
                // no gray out, non-optimistic
                // disabled={false}
                // gray out, non-optimistic
                // disabled={!!loading}
                // optimistic

            />
            {error && '!'}
          </React.Fragment>
        );
      }}
    </Mutation>
  </Item>
);

export default ItemContainer;
