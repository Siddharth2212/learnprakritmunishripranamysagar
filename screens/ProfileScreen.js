import React, { Component } from 'react';
import { View, Dimensions, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { Icon, Button as Alias, Card, Image, Text, ListItem, Avatar } from 'react-native-elements';
import { DataCall } from "./utils/DataCall";
import { Button, Appbar, Searchbar, IconButton } from 'react-native-paper';
import Moment from 'moment';
import auth from '@react-native-firebase/auth';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: width,
            height: height,
            data: [],
            page: 1,
            searchQuery: "",
            showSearch: false,
            count: 1,
            inProgressNetworkReq: false
        };
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.fetchMoreData(-1);
        var user = auth().currentUser;
        fetch("https://arhamyoga.herokuapp.com/trackerdetails", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(user) // <-- Post parameters        
        })
        .then((response) => {
            console.log("__apeghhipaegapehgaeghere");
            return response.json()
          })
          .then((data) => {
            // Work with JSON data here
            console.log(data);
            this.setState({meditationplaylist: data.meditationplaylist, 
                meditationvideo: data.meditationvideo, 
                knowledgebyteplaylist: data.knowledgebyteplaylist,
                meditationplaylistvideos: data.meditationplaylistvideos, 
                meditationvideovideos: data.meditationvideovideos, 
                knowledgebyteplaylistvideos: data.knowledgebyteplaylistvideos                
            })
          })
          .catch((err) => {
              console.log(err);
            // Do something for an error here
          })
    }

    async fetchMoreData(query) {

        if (!this.state.inProgressNetworkReq) {
            //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
            //more than once
            if (query == -1) {
                this.setState({
                    inProgressNetworkReq: true
                });
                const data = await DataCall.get(query, "knowledgebytes");
                console.log("__ahoegage");
                console.log(data);
                this.setState({
                    data: data,
                    count: this.state.count + 1,
                    inProgressNetworkReq: false
                });
            }
            else {
                this.setState({
                    inProgressNetworkReq: true
                });
                const data = await DataCall.get(query);
                this.setState({
                    data: data,
                    count: this.state.count + 1,
                    inProgressNetworkReq: false
                });
            }
        }
    }

    onLayout = event => {
        let { width, height } = event.nativeEvent.layout
        this.setState({ height: height })
    }

    _renderItem = ({ item, index }) => (
        <MyListItem
            height={this.state.height}
            width={this.state.width}
            item={item}
            index={index}
            navigate={this.props.navigation.navigate}
        />
    );

    fetchResult = () => {
        // this.fetchMoreData();
    }


    renderFooter = () => {
        if (this.state.inProgressNetworkReq == false) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return <ListItem key={i} bottomDivider>
        <Avatar source={{ uri: "https://www.pranamyasagar.org/images/muni-pranamyasagar-72px.jpg" }} />
        <ListItem.Content>
          <ListItem.Title>{item.playlistname}</ListItem.Title>
                <Card.Actions style={{ flex: 1, justifyContent: "space-around", width: "100%" }}>
                    <Button icon="page-next" onPress={() => this.props.navigation.navigate("List", { playlistid: item.playlistid, typeofplaylist: "knowledgebytes" })}>Watch Playlist</Button>
                </Card.Actions>
        </ListItem.Content>
      </ListItem>
    }

    render() {
        const onChangeSearch = query => {
            this.setState({ searchQuery: query })
            console.log(this.state.searchQuery);
            this.fetchMoreData(query);
        };
        
        Moment.locale('en');
        return (
            <>
                <Appbar.Header>
                    <Appbar.Content title="Profile" />
                </Appbar.Header>
                {this.state.showSearch && <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={this.state.searchQuery}
                />}
                <View style={styles.container}>
                <Text h4 style={{textAlign: "center"}}>Welcome {(auth().currentUser.displayName)}</Text>
              
            <Button icon="page-next" onPress={() => auth().signOut().then(() => console.log('User signed out!'))}>Logout</Button>

            </View>
               
            </>
        )
    }
}

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#2196f3',
        fontSize: 14,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: "center"
      },
      logoImg: {
        width: 145,
        height: 145,
        marginBottom: 20,
        alignSelf: 'center',
      },
      logoText: {
        color: '#F3BA1D',
        alignSelf: 'center',
        marginBottom: 30,
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'center',
      }
});

export default Tab
