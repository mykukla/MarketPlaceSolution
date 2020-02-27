//THIS FILE IS INDEX FROM API GETUSER:   the index.js file under api folder is the little search function Separate File from other index.js: 
//line 1 import _ from "lodash";
//line 2 import users from "./users";

//line 4 export const contains = ({name,email},query=>{
//line 5  const{first,last}=name;
//line 6   if(first.includes(query) || last.includes(query) || email.includes(query)){
//line 7      return true;
//}
//line10      return false; };


//line 13export const getUsers=(limit = 20,query="")=>{
//          console.log("api called", query);
//line 14   return new Promise((resolve,reject)=>{
//line15      if(query.length===0){
//line 16       reslove(_.take(users,limit));
//             }else{
//              const formattedQuery=query.toLowerCase();
//line19         const results=_.filter(users,user=>{
//line 20           return contains(user,formattedQuery);
//line 21         });
//line 22         resolve(_.take(results,limit));
//line 23        }
//line 24     });
//line 25 };

//export default getUsers;


//NOW WE HAVE LOCAL SEARCH FOR INSTANT RESULTS AND REMOTE SEARCH HITTING AN API TO GET THAT INFO BACK.  
//NOW 
//DONT MAKE CONSTANTREQUESTS TO YOUR API, ESP IF ITS REMOTESERVER.  WAIT FOR THE USERS INPUT TO SLOW ORSTOP SO WECAN KNOW EXACTLY WHATTHE USER'SSEARCHINGFOR
//A WAY TO LIMIT API REQUESTS ISTOMAKE A DEBOUNCE F WHICH LODASH BRINGS


//Flatlist of data that just displays the data.  search bar doesnt work yet
//data from a lacal file ..set it up so we are making a fetch against a local API
//passing a search quiry to a server.
//basic state...our loading is going to b true when making initial request.
//our data is an array of all the people we are going to be rendering.
//Store an error in case any kind of errors dooccur.
//when the component mounts we r going to make our local request.
//we r going to set our loading state to true.
//we will make our request to get our users.
//then we will update our state to capture that loading is false and also to store our users in state.
//render separator does what it says.
//renderHeader is where we r rendering this search bar.
//it will stick to the top of list and not scroll with it.
//our renderFooter will be a loader indicator.
//Within the Actual Render Method we got a Safeview cuz we r demo iphone 10 
//inside Flatlist we have data that we r actually rendering
//

// we have an array of users...see users.js
//api folder wqith index.js and users.js
//our api is returning 20 users by default
//our actual api has a function to return whatever our limit is 
//and our api or get users we can pass both a limit and a search quiry
//our search quiry is going to check on our users first name last name and email address
//that is the way we will be sorting.  we will check on the first name,last, and email on a user
//all users have the same format.
//start setting up search, locally first, wealready have 20 
//users on our device.  how to search this and filter it on our user device.
//add 2 pieces of data to our default component state.
//first off we have our quiry which by default will b an empty string.
//another array array of data which b called 
//fullData data is going to be whatever is displayed on the users list 
//and fullData array will be what is returned from the servers list.
//we search our local collection of info and update data on that.
//First,applies to Header, we need check when text is changing
//and update that state when it happens.So we have to add new //functioncalled . handleSearch =(text)=>{} takes 1 arg to //the f, whatever the user has searched.
//update quiry value to whatevwr this textis. 
//this.setState({error,loading false}); to use this we go //downto (use reactnative elements to makeEasier.)
//searchbar under renderHeader return and 
//  return<SearchBar placeholder="Type Here.." lightTheme round onChangeText={this.handleSearch}/>
//log this out to make sure we r getting responseWeExpect w
//console.log("text",text); //logoutand see if we r getting the text we want to get on the localhost console
//this.setState({query:text});
//next thing we wanttodois filter this info,wejustwanttodothe localinfo first b4 we make remote requests. there r 2 things wewant to import first.
//push to line 10 inbetween 9 and 11import _ from "lodash"; a utility library good for wkingwdata
//SETUP SEARCH ION A FLATLIST RTEACT NATIVE
//SETTING UP SEARCH, WE HAVE DATA WE R UPDATING W SEARCH RESULTS/WE R STORINGOUR QUERY WHICH WETHEN PASSTO OUR API.
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