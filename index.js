import React, {Component} from "react";
import{
  View,
  Text,
  Flatlist,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";
import _ from "lodash";   //a utility librarty
import {getUsers, contains} from "./api/index";

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],        //from our local list
      error: null,
      query: "",
      fullData: []  //from server
   };
  }

  componentDidMount() {
    this.makeRemoteRequest();//make this call when we do a handleSearch.we rely //on the latest state, 
  }

  makeRemoteRequest = _.debounce(() => {  //make this call when we do a //handleSearch..when we make this remotedrequest we pass args to getUse f and //pass the query variables, limit 20
    this.setState ({loading: true});
//api is getUsers
    getUsers(20, this.state,query)
      .then(users => {
        this.setState({
          loading: false,
          data: users,  // the data that we update with our search results
          fullData: users
        });    
      })
      .catch(error => {
    this.setState({ error, loading: false });
  });
},250); //will wait 250 miliseconds b4 make namer request since last name was 

  handleSearch=text => { //make the local data request
    console.log("text",text); //not using regex so all lowercase   //logout to check console of localhost for expected response
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData,user =>{  //request to api get the 
      return contains(user, formatQuery);//storing our query that gets passed to the api
  });
  this.setState({ query: formatQuery, data },() => this.makeRemoteRequest());
};


renderSeparator = () => {
  return(
    <View
      style={{
        heighty: 1,
        width: "86%",
        backgroundColor: "daf3ba",
        marginLeft: "14%"
      }}
    />
  );
};
renderHeader = () => {
  return <SearchBar placeholder ="Type here" lightTheme round onChangeText ={this.handleSearch}
  />
};
renderFooter = () => {
  if (!this.state.loading) return null;

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        bordwrColor: "CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
 };

        render() {
          return(
            <SafeAreaView>
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: }}
                <Flatlist
                  data={this.state.data}
                  renderItem={({ item}) => (
                    <ListItem
                      roundAvatar
                      title={'${item.name.first ${item.name.last}'}
                      subtitle={item.email}
                      avatar={{uri:  item.picture.thumbnail}}
                      containerStyle={{ borderBottomWidth: 0}}
                    />{
                  )}
                  keyExtractor={item=> item.email}
                  ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
            />
          </List>
        </SafeAreaView>
      );
    }
  }

  export default App;