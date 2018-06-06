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
      <div className="Item">
        <Mutation mutation={UPDATE_ITEM}>
          {(updateItem, { loading, error, data }) => {
            // console.log('loading: ', loading);
            // console.log('error: ', error);
            if (error) return 'error';

            return (
              <li>
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
                            }
                        });
                    }}
                    // no gray out, non-optimistic
                    // disabled={false}
                    // gray out, non-optimistic
                    // disabled={!!loading}
                    // optimistic

                />
              </li>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default ItemContainer;
