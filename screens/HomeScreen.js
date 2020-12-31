import React, { Component } from 'react';
import { View, Dimensions, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { Icon, Button as Alias, Image, Text, ListItem, Avatar } from 'react-native-elements';
import { DataCall } from "./utils/DataCall";
import { EXTRACTHOSTNAME } from "./utils/extracthostname";
import { GETHOSTNAME } from "./utils/gethostname";
import { TIMESINCE } from "./utils/timesince";
import { Card, Button, Appbar, Searchbar, IconButton } from 'react-native-paper';
import Moment from 'moment';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
]


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
    }

    async fetchMoreData(query) {

        if (!this.state.inProgressNetworkReq) {
            //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
            //more than once
            if (query == -1) {
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

    renderItem = ({ item }) => {
        if (item["typeofrequest"] == "smpi") {
            var typeofrequest = "Social Media Post Image";
            var caption = `${item["smpicaption"] ? item["smpicaption"] : ""}`;
        }
        else if (item["typeofrequest"] == "smpv") {
            var typeofrequest = "Social Media Post Video";
            var caption = `${item["smpvstoryline"] ? item["smpvstoryline"] : ""}`;
        }
        else {
            var typeofrequest = "Blog";
            var caption = `${item["blogtitle"] ? item["blogtitle"] : ""}`;
        }
        return <ListItem
            bottomDivider >
            {/* <IconButton
                icon="file"
                color={'purple'}
                size={20}
                onPress={() => console.log('Pressed')}
            /> */}
            <ListItem.Content>
                <ListItem.Title>{caption}</ListItem.Title>
                <ListItem.Subtitle>Status: {item.status}, Post Date: {Moment(item.postdate).format('d MMM')}
                </ListItem.Subtitle>
                <Card.Actions style={{ flex: 1, justifyContent: "space-around", width: "100%" }}>
                    <Button icon="page-next" onPress={() => this.props.navigation.navigate('Detail', { dish: item })}>Details</Button>
                    <Button icon="timeline-text-outline" onPress={() => this.props.navigation.navigate('Timeline', { dish: item })}>Timeline</Button>
                </Card.Actions>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    }

    render() {
        const onChangeSearch = query => {
            this.setState({ searchQuery: query })
            console.log(this.state.searchQuery);
            this.fetchMoreData(query);
        };

        const _goBack = () => console.log('Went back');

        const _handleSearch = () => this.setState({ showSearch: true })

        const _handleMore = () => console.log('Shown more');
        Moment.locale('en');
        return (
            <>
                <Appbar.Header>
                    <Appbar.Content title="Requests" />
                    <Appbar.Action icon="magnify" onPress={_handleSearch} />
                    {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
                </Appbar.Header>
                {this.state.showSearch && <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={this.state.searchQuery}
                />}
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.data}
                    renderItem={this.renderItem}
                />
            </>
            // <FlatList
            //         onLayout={this.onLayout}
            //         getItemLayout={(data, index) => (
            //             { length: this.state.height, offset: this.state.height * index, index }
            //         )}
            //         pagingEnabled={true}
            //         data={this.state.data}
            //         renderItem={this._renderItem}
            //         initialNumToRender={3}
            //         keyExtractor={item => item._id.toString()}
            //         removeClippedSubviews={true}
            //         onEndReached={this.fetchResult}
            //         onEndReachedThreshold={5}
            //         ListFooterComponent={this.renderFooter}
            //         style={{ flex: 1, backgroundColor: "#f0f2f5" }}
            //     />
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
