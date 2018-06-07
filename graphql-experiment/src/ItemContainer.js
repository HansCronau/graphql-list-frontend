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

const ItemContainer = ({ item, optimistic, grayOut }) => (
  <Mutation
      mutation={UPDATE_ITEM}
      onError={() => console.log('There was an error. DON\'T PANIC.')}
  >
    {(updateItem, { loading, error }) => {
      const disabled = !optimistic && grayOut && loading;

      return (
        <Item disabled={disabled} error={!!error}>
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
              disabled={disabled}
          />
        </Item>
      );
    }}
  </Mutation>
);

export default ItemContainer;
