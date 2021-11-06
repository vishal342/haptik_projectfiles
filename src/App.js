import React from "react";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";
import Pagination from "./Pagination";

class App extends React.Component {
  state = {
    friendlist: [],
    isfriend: "is your friend",
    searchTerm: "",
    currentPage: "1",
    itemsPerPage: "4",
  };

  deleteItem = (id) => {
    const tod = this.state.friendlist.filter((item) => {
      return item.id !== id;
    });
    this.setState({
      friendlist: tod,
    });
  };

  addFriend = (item) => {
    item.id = Math.random();
    let tod = [...this.state.friendlist, item];
    this.setState({
      friendlist: tod,
      searchTerm: "",
    });
  };

  handleCallback = (childData) => {
    this.setState({ searchTerm: childData });
  };

  render() {
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastItem - this.state.itemsPerPage;
    const currentList = this.state.friendlist.slice(
      indexOfFirstPost,
      indexOfLastItem
    );
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    const dynamicSearch = (posts) => {
      var original = posts;
      if (this.state.searchTerm === "") {
        return original;
      }
      return posts.filter((name) =>
        name.content.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    };

    return (
      <div className="todo-app  container">
        <div className="wrapper">
          <h4>Friends List</h4>
          <AddFriend
            addFriend={this.addFriend}
            parentCallback={this.handleCallback}
          />
          <FriendList
            friendlist={dynamicSearch(currentList)}
            relation={this.state.isfriend}
            deleteItem={this.deleteItem}
          />
        </div>
        <Pagination
          itemsPerPage={this.state.itemsPerPage}
          totalPosts={this.state.friendlist.length}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default App;
