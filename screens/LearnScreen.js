import React, { Component } from 'react';
import { View, Dimensions, FlatList, StyleSheet } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { ListItem, Avatar } from 'react-native-elements';
import { DataCall } from "./utils/DataCall";
import { Card, Button, Appbar, Searchbar, ActivityIndicator, Colors } from 'react-native-paper';
import Moment from 'moment';

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
                    <Button icon="page-next" onPress={() => this.props.navigation.navigate("List", { playlistid: item.playlistid, typeofplaylist: "meditations" })}>Watch Playlist</Button>
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
                    <Appbar.Content title="By Munishri Pranamyasagar ji" />
                    {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
                </Appbar.Header>
                {this.state.showSearch && <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={this.state.searchQuery}
                />}
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={[{
                        playlistname: "Learn Prakrit",
                        playlistid: "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC"
                    }]}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.playlistid.toString()}
                />
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
    }
});

export default Tab
