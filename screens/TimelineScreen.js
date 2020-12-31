import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Modal, Alert, PanResponder, Share, Dimensions } from 'react-native';
import { Text, Rating, AirbnbRating } from 'react-native-elements';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import Moment from 'moment';
import Timeline from 'react-native-timeline-flatlist'
import { DataCall } from "./utils2/DataCall";



function RenderRating(props) {
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    // const dish = props.item;
    return (
        <View>
            <Text>By {props.createdbyname}</Text>
            <Paragraph><Text style={{ fontWeight: "bold" }}>Remark:</Text> {props.remark}</Paragraph>
            <Rating
                type='heart'
                readonly
                ratingCount={5}
                imageSize={27}
                showRating
                startingValue={props.rating}
                onFinishRating={ratingCompleted}
            />
        </View>
    );
}

function RenderPostLinks(props) {
    const htmlContent = props.linkofpost;
    console.log("____ahoeigaeg");
    return (
        <ScrollView>
        </ScrollView>
    );
}

class TimelineScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 3,
            timelinedata: [],
            logs: [],
            result: null
        }

        this.data = [
            { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
            { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
            { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
            { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
            { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
        ]
    }

    _handlePressButtonAsync = async (link) => {
        let result = await WebBrowser.openBrowserAsync(link);
        this.setState({ result });
    };

    static navigationOptions = {
        header: null
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId, "siddharthsogani1@gmail.com");
    }

    addComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, "siddharthsogani1@gmail.com", comment);
    }

    componentDidMount() {
        const item = this.props.route.params.dish;
        // let dishId = dish.newsid;
        // this.props.fetchComments(dishId);
        this.fetchMoreData(item._id, item, this.props.navigation.navigate);
    }

    async fetchMoreData(ticketid, item, navigate) {
        if (!this.state.inProgressNetworkReq) {
            //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
            //more than once
            this.setState({
                inProgressNetworkReq: true
            });
            const data = await DataCall.get(ticketid);
            console.log("__ahieg");
            console.log(data);
            this.setState({
                logs: data,
                inProgressNetworkReq: false
            });
            var timelinedata = [];
            for (var i = 0; i < data.length; i++) {
                let logdescription = ""
                if (data[i]["status"] == "Created") {
                    logdescription = `by ${item["createdbyname"]}`;
                }
                else if (data[i]["status"] == "Assigned") {
                    logdescription = `to ${item["assignedto"]}`;
                }
                else if (data[i]["status"] == "In Progress") {
                    logdescription = `by ${item["assignedto"]}`;
                }
                else if (data[i]["status"] == "Work Submitted") {
                    var linkofwork = data[i]["linkofwork"];
                    logdescription = <Button onPress={() => navigate("WebView", { url: linkofwork })}>View Work</Button>;
                }
                else if (data[i]["status"] == "Approved") {
                    logdescription = <RenderRating remark={item["remark"]} createdbyname={item["createdbyname"]} rating={data[i]["rating"]} />
                }
                else if (data[i]["status"] == "Posted") {
                    logdescription = <RenderPostLinks linkofpost={item["linkofpost"]} />
                }
                timelinedata.push({ time: Moment(new Date(data[i]["date"])).fromNow(), title: data[i]["status"], description: logdescription })
            }
            this.setState({
                timelinedata: timelinedata
            })
            console.log("_haieghapeg");
            console.log(this.state.timelinedata)
        }
    }

    render() {
        Moment.locale('en');
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

        const item = this.props.route.params.dish;

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

        const _goBack = () => this.props.navigation.goBack(null);

        const _handleSearch = () => console.log('Searching');

        const _handleMore = () => console.log('Shown more');

        return (
            <>
                <Appbar.Header>
                    <Appbar.BackAction onPress={_goBack} />
                    <Appbar.Content title="Timeline" subtitle={typeofrequest} />
                    {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
                </Appbar.Header>
                <ScrollView>
                    <View>
                        <Card>
                            <Card.Title title={caption} subtitle={`${typeofrequest}`} left={LeftContent} />
                            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                            <Card.Content>
                                {this.state.logs.length > 0 && <Timeline
                                    data={this.state.timelinedata}
                                />}
                            </Card.Content>
                            {/* <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions> */}
                        </Card>
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default TimelineScreen;
