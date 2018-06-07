import React, { Component } from 'react';
import gql from "graphql-tag";
import { withApollo, Mutation } from "react-apollo";
import List from './List';
import Item from './Item';
import Message from './Message';

const FLAT_LIST = gql`
query flatList{
  flatList {
    id
    list {
      value
    }
  }
}
`;

const UPDATE_LIST = gql`
mutation updateFlatList($flatList: FlatListInput) {
  updateFlatList(flatList: $flatList) {
    id
    list {
      value
    }
  }
}
`;

class ListFlatApplyContainer extends Component {
  state = {
    id: '',
    list: [],
    changed: false
  }
  componentDidMount() {
    const { client } = this.props;
    client.query({
      query: FLAT_LIST
    }).then(({ loading, error, data }) => {
      const { id, list } = data.flatList;
      this.setState({
        id,
        list: list.map(({ value }) => ({ value })),
      });
    });
  }
  render() {
    const { name, grayOut, ...restProps } = this.props;
    const { id, list, changed } = this.state;
    return (
      <div className="List">
        <Mutation
          mutation={UPDATE_LIST}
          onError={() => console.log('There was an error. DON\'T PANIC.')}
        >
          {(updateFlatList, { loading, error, called }) => {
            const disabled = grayOut && loading;
            
            const canSave = changed || !!error;
            let buttonText;
            if (canSave) buttonText = 'Save';
            else buttonText = loading ? 'Saving' : 'Saved';
            
            return (
              <React.Fragment>
                <List>
                  {list.map((item, index) => (
                    <Item disabled={disabled} error={!!error}>
                      <input
                        type="checkbox"
                        checked={item.value}
                        readOnly
                        onChange={
                          e => {
                            this.setState(prevState => {
                              const updatedList = [...prevState.list];
                              updatedList[index] = {
                                ...updatedList[index],
                                value: !updatedList[index].value
                              };
                              return {
                                list: updatedList,
                                changed: true
                              }
                            });
                          }
                        }
                        disabled={disabled}
                      />
                  </Item>
                  ))}
                </List>
                <button
                  disabled={!canSave}
                  onClick={() => {
                    const { id, list } = this.state;
                    updateFlatList({
                      variables: {
                        flatList: {
                          id,
                          list,
                        },
                      }
                    });
                    this.setState({
                      changed: false
                    })
                  }}
                >
                  {buttonText}
                </button>
              </React.Fragment>
            );
          }}
        </Mutation>
      </div>
  )}
};

export default withApollo(ListFlatApplyContainer);
