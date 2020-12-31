import React, { useState, useEffect, Component } from 'react';

import { View, ScrollView, StyleSheet, Platform, FlatList, Modal, Alert, PanResponder, Share, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Title, Paragraph, Appbar, ProgressBar, Colors } from 'react-native-paper';
import Moment from 'moment';
import { DataCall } from "./utils2/DataCall";
import ImageView from 'react-native-image-view';
import * as DocumentPicker from 'expo-document-picker';
import { firebaseStorage } from '../firebase/storage';

let alteredFormDict = {}

const onFormFieldValueChange = (formField, value) => {
    var newFieldsDict = alteredFormDict;
    newFieldsDict[formField] = value;
};

const RenderTextAreaField = (props) => {
    return (
        <View style={{ padding: 0 }} >
            <TextInput
                onChangeText={(text) => {
                    // setAboutme(text);
                    onFormFieldValueChange(props.fieldname, text);
                }}
                defaultValue={props.defaultValue}
                style={{
                    justifyContent: "flex-start"
                }}
                underlineColorAndroid="transparent"
                placeholder={""}
                placeholderTextColor="grey"
                multiline={true}
            />
        </View>
    );
};

class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: "",
            uri: "",
            uploadProgress: null,
            isImageViewerVisible: false,
            showModal: false,
            author: '',
            comment: '',
            rating: 3,
            result: null
        }
    }

    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // alert(result.uri);
        console.log(result);
        if (!result.cancelled) {
            // console.log(result.uri);
            this.startUpload(result.uri)
            // setProfilePictureURL(result.uri);
            // props.setProfilePictureURL(result.uri);
        }
    }

    startUpload = (source) => {
        // const { source, mime } = uploadData;
        const self = this;
    
        const filename =
          new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);
          const uploadUri =
          Platform.OS === 'ios' ? source.replace('file://', '') : source;
    
        firebaseStorage.uploadFileWithProgressTracking(
          filename,
          uploadUri,
          async (snapshot) => {
            const uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes);
              console.log(uploadProgress);
              self.setState({ uploadProgress });
          },
          async (url) => {
            if (url) {
                console.log("here");
                console.log(url);
                self.setState({uploadProgress: null})
            //   self.setState(
            //     {
            //       downloadUrl: { ...uploadData, source: url, uri: url, url, mime },
            //       uploadProgress: 0,
            //     },
            //     () => {
            //       self.onSendInput();
            //     },
            //   );
            }
          },
          (error) => {
            self.setState({uploadProgress: 0})
            alert('Oops! An error has occured. Please try again.');
            console.log(error);
          },
        );
      };

    updateProfilePictureURL = (photoURI) => {
        console.log(photoURI);
        // var userID = props.initialValuesDict.userID;
        if (photoURI == null) {
        //   setEvent(null);
        }
        // If we have a photo, we upload it to Firebase, and then update the user
        firebaseStorage.uploadImage(photoURI).then((response) => {
          if (response.error) {
              console.log(response.error)
            // there was an error, fail silently
          } else {
              console.log(response.downloadURL)
            // setEvent(response.downloadURL);
          }
        });
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
        // let dishId = dish._id;
        this.fetchMoreData(item._id, item, this.props.navigation.navigate);
    }

    async fetchMoreData(ticketid, item, navigate) {
        if (!this.state.inProgressNetworkReq) {
            //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
            //more than once
            this.setState({
                inProgressNetworkReq: true
            });
            const data = await DataCall.getRequestDetails(ticketid);
            console.log("___here");
            console.log(data);
            this.setState({
                data: data,
                inProgressNetworkReq: false
            });
        }
    }

    getFileType(url) {
        var url_extension = url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(url_extension)) {
            return "image";
        }
        else if (/(ogg|mp3|mp?g|wav)$/.test(url_extension)) {
            return "audio";
        }
        else if (/(ogg|mp4|mp?g|webm|3gp)$/.test(url_extension)) {
            return "video";
        }
        else if (/(htm|html)$/.test(url_extension)) {
            return "html";
        }
        else if (/(txt|md|csv|nfo|ini|json|php|js|css)$/.test(url_extension)) {
            return "text";
        }
        else {
            return "other"
        }
    }

    render() {
        const _goBack = () => this.props.navigation.goBack(null);

        const _handleSearch = () => console.log('Searching');

        const _handleMore = () => console.log('Shown more');
        if (this.state.data == "") {
            return (
                <>
                    <Appbar.Header>
                        <Appbar.BackAction onPress={_goBack} />
                        <Appbar.Content title="Details" />
                        {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
                    </Appbar.Header>
                    <ScrollView>
                        <View>
                        </View>
                    </ScrollView>
                </>
            );
        }
        else {
            Moment.locale('en');
            const LeftContent = props => <Avatar.Icon {...props} icon="file" />
            const LeftContent2 = props => <Avatar.Icon {...props} icon="folder" />
            let item = this.state.data;

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

            const onFormFieldValueChange = (formField, value) => {
                console.log("agehgaeg");
                // var newFieldsDict = alteredFormDict;
                // newFieldsDict[formField.key] = value;
                // setAlteredFormDict(newFieldsDict);
                // onFormChange(newFieldsDict);
            };

            return (
                <>
                    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Details" />
      <Appbar.Action icon="content-save-all" onPress={() => {
                                        Alert.alert(
                                            "Confirmation",
                                            "Do you wanna save these changes?",
                                            [
                                                {
                                                    text: "No",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Yes", onPress: () => {
                                                        return fetch("https://www.digitalbrand.me/updatedetails", {
                                                            method: "POST",
                                                            headers: new Headers({
                                                                'Content-Type': 'application/json',
                                                            }),
                                                            body: JSON.stringify(alteredFormDict) // <-- Post parameters        
                                                        }).then((responseData) => {
                                                            console.log("__haioehgaeg");
                                                            console.log(responseData.json);
                                                        }).done();
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }} />
    </Appbar.Header>
                    <ScrollView>
                        <View>
                            <Card>
                                <Card.Title title={"Details"} subtitle={`${typeofrequest}`} left={LeftContent} />
                                <Card.Content>
                                    <Paragraph><Text style={{ fontWeight: "bold" }}>Post Caption:</Text> {caption}</Paragraph>
                                    <Paragraph><Text style={{ fontWeight: "bold" }}>Post Date:</Text> {Moment(item.postdate).format('d MMM')}</Paragraph>
                                    <Paragraph><Text style={{ fontWeight: "bold" }}>Assigned To:</Text> {item.assignedto}</Paragraph>
                                    {item.typeofrequest == "smpi" && <>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Purpose of Post</Text>:</Paragraph>
                                            <RenderTextAreaField fieldname="smpidescription" defaultValue={item.smpidescription} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Post CTA:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpicta" defaultValue={item.smpicta} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Post Platform:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpiplatform" defaultValue={item.smpiplatform.join(", ")} />
                                        </View>
                                        {/* <Paragraph><Text style={{ fontWeight: "bold" }}>Post Platform:</Text> {item.smpiplatform.join(", ")}</Paragraph> */}
                                    </>}
                                    {item.typeofrequest == "smpv" && <>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Audio/Video Core Message:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpvcoremessage" defaultValue={item.smpvcoremessage} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Audio/Video Visual Suggestions:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpvvisualsuggestions" defaultValue={item.smpvvisualsuggestions} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Audio/Video Platform:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpvplatform" defaultValue={item.smpvplatform.join(", ")} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Sample Links:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="smpvsamplevideolink" defaultValue={item.smpvsamplevideolink} />
                                        </View>
                                    </>}
                                    {item.typeofrequest == "blog" && <>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog Approx Words:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogapproxnumberofwords" defaultValue={item.blogapproxnumberofwords} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog Storyline:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogstoryline" defaultValue={item.blogstoryline} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog Core Message:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogcoremessage" defaultValue={item.blogcoremessage} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog Sample Links:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogsamplelinks" defaultValue={item.blogsamplelinks} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog CTA:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogcta" defaultValue={item.blogcta} />
                                        </View>
                                        <View><Paragraph><Text style={{ fontWeight: "bold" }}>Blog Platform:</Text></Paragraph>
                                            <RenderTextAreaField fieldname="blogplatform" defaultValue={item.blogplatform.join(", ")} />
                                        </View>
                                    </>}
                                </Card.Content>
                            </Card>
                        </View>
                        <View>
                            <Card>
                                <Card.Title title={"Attachments"} left={LeftContent2} />
                                <Card.Content>
                                    {item.avatar.map((attachment, i) => {
                                        let filename = item.avatar[i].split("/")[item.avatar[i].split("/").length - 1];
                                        if (this.getFileType(item.avatar[i]) == "image") {
                                            return <View style={{ margin: 5 }}>
                                                <Image
                                                    onPress={() => {
                                                        this.setState({ isImageViewerVisible: true });
                                                        this.setState({ uri: item.avatar[i] })
                                                    }}
                                                    source={{ uri: item.avatar[i] }}
                                                    style={{ width: 100, height: 100 }}
                                                    PlaceholderContent={<ActivityIndicator />}
                                                />
                                                <Text>{filename}</Text>
                                            </View>
                                        }
                                    }
                                    )}
                                    <ImageView
                                        images={[
                                            {
                                                source: {
                                                    uri: this.state.uri,
                                                },
                                            },
                                        ]}
                                        isVisible={this.state.isImageViewerVisible}
                                        onClose={() => this.setState({ isImageViewerVisible: false })}
                                    />
                                      {this.state.uploadProgress!==null && <ProgressBar progress={this.state.uploadProgress} color={Colors.red800} />}

                                    <Button onPress={() => {
                                        this._pickDocument()
                                    }}>Add a File</Button>
                                </Card.Content>
                            </Card>
                        </View>
                    </ScrollView>
                </>
            );
        }
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

export default Dishdetail;
