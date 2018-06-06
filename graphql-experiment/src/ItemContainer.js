import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_ITEM = gql`
mutation updateItem($id: ID, $value: Boolean) {
  updateItem(id: $id, value: $value) {
    id
    value
  }
}
`;

class ItemContainer extends Component {
  render() {
    return (
      <li className="Item">
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
                    checked={this.props.item.value}
                    readOnly
                    onChange={e => {
                        const { id, value } = this.props.item;
                        updateItem({
                            variables: {
                                id,
                                value: !value,
                            },
                            optimisticResponse: {
                                __typename: 'Mutation',
                                updateItem: {
                                    __typename: 'Item',
                                    id,
                                    value: !value,
                                }
                            },
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
      </li>
    );
  }
}

export default ItemContainer;
