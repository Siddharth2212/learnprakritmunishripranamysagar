import React, { Component } from 'react';
import { View, Dimensions, FlatList, StyleSheet } from 'react-native';
var { width, height } = Dimensions.get('window');// You can import from local files
import { ListItem, Avatar } from 'react-native-elements';
import { DataCall } from "./utils/DataCall";
import { Card, Button, Appbar, Searchbar, ActivityIndicator, Colors } from 'react-native-paper';
import Moment from 'moment';
import * as WebBrowser from 'expo-web-browser';

const BOOKS =
    [
        {
        id: 0,
        url: "http://pranamyasagar.org/books/pdf/Paiya-Shika-Part-1.pdf",
        name:'पाइय सिक्खा भाग-1',
        image: 'images/ps22.PNG',
        category: 'mains',
        label:'Hot',
        price:'4.99',
        featured: true,
        description:'लेखक : मुनि श्री १०८ प्रणम्य सागर जी महाराज '
        },
        {
        id: 1,
        url: "http://pranamyasagar.org/books/pdf/Paiya-Shika-Part-2.pdf",
        name:'पाइय सिक्खा भाग-2',
        image: 'images/zucchipakoda.png',
        category: 'appetizer',
        label:'',
        price:'1.99',
        featured: false,
        description:'लेखक : मुनि श्री १०८ प्रणम्य सागर जी महाराज '
        },
        {
        id: 2,
        url: "http://pranamyasagar.org/books/pdf/Paiya-Shika-Part-III.pdf",
        name:'पाइय सिक्खा भाग-3',
        image: 'images/vadonut.png',
        category: 'appetizer',
        label:'New',
        price:'1.99',
        featured: false,
        description:'लेखक : मुनि श्री १०८ प्रणम्य सागर जी महाराज '
        },
        {
        id: 3,
        url: "http://pranamyasagar.org/books/pdf/Paiya-Shika-Part-4.pdf",
        name:'पाइय सिक्खा भाग-4',
        image: 'images/elaicheesecake.png',
        category: 'dessert',
        label:'',
        price:'2.99',
        featured: false,
        description:'लेखक : मुनि श्री १०८ प्रणम्य सागर जी महाराज '
        }
    ];
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
    async _handlePressButtonAsync(url) {
        let result = await WebBrowser.openBrowserAsync(url);
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




    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return <ListItem key={i} bottomDivider>
        <Avatar source={{ uri: "https://www.pranamyasagar.org/images/muni-pranamyasagar-72px.jpg" }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
                <Card.Actions style={{ flex: 1, justifyContent: "space-around", width: "100%" }}>
                    <Button icon="page-next" onPress={() => this._handlePressButtonAsync(item.url)}>Read Book</Button>
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
        return <>
                    <Appbar.Header>
                        <Appbar.Content title="Books" />
                        {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
                    </Appbar.Header>
                    {this.state.showSearch && <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={this.state.searchQuery}
                    />}
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={BOOKS}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name.toString()}
                    />
                </>
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
