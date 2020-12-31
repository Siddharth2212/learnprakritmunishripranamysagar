import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, StyleSheet, StatusBar, ImageBackground, TouchableHighlight, Text } from 'react-native'
import { Container, Header, Content, View, } from 'native-base'
import Style from '@Theme/Style'

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      },
      image: {
        width: 320,
        height: 320,
        marginVertical: 32,
      },
      text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
      },
      title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
      },
  });
const slides = [
    {
      key: 'heart',
      title: 'Plan',
      text: 'We carefully curate each and everything based on your likes and opinions', 
      image: require('./icons/slide1.png'),
      imageStyle: styles.image,
    },
    {
      key: 'curricular',
      title: 'Create',
      text: 'We create everything with utmost care.',
      image: require('./icons/slide2.png'),
      imageStyle: styles.image,
    },
    {
      key: 'activities',
      title: 'Post',
      text: 'We schedule and post the approved designs on the desired social media platforms.',
      image: require('./icons/slide3.png'),
      imageStyle: styles.image,
    },
    {
      key: 'tracking',
      title: 'Measure',
      text: 'We also monitor the ongoing activities and create infograhics.',
      image: require('./icons/slide4.png'),
      imageStyle: styles.image,
    },
    {
      key: 'tracking',
      title: 'Optimize',
      text: 'You will also be assigned an account manager who will ensure all your needs.',
      image: require('./icons/slide5.png'),
      imageStyle: styles.image,
    }
  ];

  
 
export default class App extends React.Component {
    constructor(props){  
        super(props);  
        this.state = {  
            showRealApp: false
                  }  
      }  
      _renderItem = ({item}) => {
        return (
          <View
            style={[
              styles.slide,
              {
                backgroundColor: item.bg,
              },
            ]}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      };
  render() {
    var {navigate } = this.props.navigation
    if (this.state.showRealApp) {
      return <App />;
    } else {
        return <Container style={Style.bgMainIntro}>
        <StatusBar backgroundColor="#101E3D" animated barStyle="light-content" />
        <AppIntroSlider style={{margin: 12}} renderItem={this._renderItem} data={slides} onDone={function(){
navigate("Login");
        }}/>
      </Container>    }
  }
}