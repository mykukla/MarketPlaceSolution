import React, {Component} from "react";
import{
  View,
  Text,
  Flatlist,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";
import _ from"lodash";
import {getUsers, contains} from"./api/index";

class App extends Component{
  constructor(props){
    super(props);

    this.state ={
      loading: false,
      data:[],
      error: null
  };
  }

  componentDidMount() ;{
    this.makeRemoteRequest();
  }
//wrap entire remoterequest with debounce..take the initial //f and take a debounce time,it willnotbe called more than 250miliseconds or wait 250miliseconds b4 makingrequests sincelast time itwas called.put number in andlookat chromeconsole. thisway we just get search response pinja vs p,then pi, then pin, etc..pinja
  makeRemoteRequest = _.debounce(() => {  //make this call when we do a handleSearch
    this.setState ({loading: true});
//api is getUsers
    getUsers(20,this.state,query)
      .then(users => {
        this.setState({
          loading: false,
          data: users,
          fullData: users,
        });    
      },250)
  .catch(error => {
    this.setState({ error, loading: false});
  });
});

handleSearch=text =>{
  //console.log("text",text));
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.fullData,user =>{
    return contains(user, formatQuery):
  });
  this.setState({ query: formatQuery, data },() => this.makeRemoteRequest);
//takes a callback f as a 2nd argument becuz setState is asynch.  this callback f willbecalled once state has been updated.  We rely on the latest state inside a makeRemoteRequest so i wannamake it sure its been updated w our query value b4 we make this new request. now we can say this.makeRemoteRequest, save it
//go to api and say 0nline14after export const getUsers
//  console.log("api called", query); just so we can track,wealso put query in there so we can see how many times its being called
};


renderSeparator = ( => {
  return(
    <View
      style={{
        heighty: 1,
        width: "86%",
        backgroundColor: "daf3ba"
      }}
    />
  )
})
  })

      })
    )

  }
  }
    }
  }
}
}
);
};


render() {
  return(
    <SafeAreaView>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: }}
        <Flatlist
          data={this.state.data}
          renderItem={({ item}) => }
            ListItem
              roundAvatar
              title={'${item.name.first ${item.name.last}'}
              subtitle={item.email}
              avatar={{uri:  item.picture.thumbnail}}
              containerStyle={{ borderBottomWidth: 0}}
              />
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

  
  export default [
    {
      gender: "female",
      name: {
        title: "ms"
        first: "raya",
        last:"mannel"
      },
      location: {
        street: "7 Stone Drive"
        city:"harrison"
        state: "new york"
        postcode: 10604
      },
      email: "rm45639p@pace.edu"
      login: {
        username: "computerproject",
        password: "seidenberg",
        salt: "c7QvzaON",
        md5:  "ognwsiovhw",
        shal: "riuhtguigheuisgribt4",
        sha256: "yfvvkgvgkjcvgkuvgcvkgkcvkvckgcvkgcv"
      },
       id: {
         name:"",
         value: null
       }
      

      }
      }
      }
    }
  ]

  )
}
