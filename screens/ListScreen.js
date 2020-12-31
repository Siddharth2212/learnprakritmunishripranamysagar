import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Button, Appbar, Title, ActivityIndicator, Colors } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
            data: "",
            page: 1,
            searchQuery: "",
            showSearch: false,
            count: 1,
            inProgressNetworkReq: false,
            result: null
        };
  }

  async _handlePressButtonAsync(videoid) {
    let result = await WebBrowser.openBrowserAsync('https://www.youtube.com/watch?v='+videoid);
  };

  componentDidMount() {
    var playlistid = this.props.route.params.playlistid;
    console.log("__hereeeee");
    console.log(playlistid);
    this.fetchMoreData(playlistid);
}

async fetchMoreData(playlistid) {

    if (!this.state.inProgressNetworkReq) {
      console.log("also here");
        //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
        //more than once
        this.setState({
          inProgressNetworkReq: true
        });
        // const data = await DataCall.getvideos(playlistid);
        const data = {
          "kind": "youtube#playlistItemListResponse",
          "etag": "2rC3azXQUNIow2kFAzeXf6guJY4",
          "items": [
            {
              "kind": "youtube#playlistItem",
              "etag": "ogAcWzFzNo73zQZ1TlhsWbeCdiM",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy4yODlGNEE0NkRGMEEzMEQy",
              "snippet": {
                "publishedAt": "2018-11-14T07:27:46Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइय सिक्खा - भाग १ | प्राकृत कक्षा | मुनि श्री प्रणम्यसागर जी | परिचय एवं वर्णमाला #Day1",
                "description": "परम पूज्य मुनि श्री हमारी मूल भाषा प्राकृत का एक परिचय देते हुए कहते हैं कि यह एक बोली भाषा है। (पागद भासा मूलं) ।यह भाषा हिंदी भाषा की जन्नी है । हमारे सारे प्राचीन ग्रंथ आचार्य कुंदकुंद स्वामी द्वारा रचित ग्रंथ समयसार जी आदि प्राकृत भाषा में लिखे गए हैं। कई विदेशी भाषाओं में भी इसका उपयोग देखा जाता है । यह एक बहुत ही सरल भाषा है जिसको कोई भी पढ़ सकता है, सीख सकता है , सिखा सकता है ।हम अपने जीवन में कई शब्द प्राकृत भाषा के उपयोग करते हैं । णमोकार मंत्र भी प्राकृत में ही है। केवल शब्दों के रूपांतरण से हम सब प्राकृत भाषा सीख सकते हैं ।प्राकृत भाषा आर्या छंद में उपयोग करी जाती है। इस भाषा को सीखने से हम अपनी संस्कृति से जुड़ पाएँगे।अपनी भाषा बोलने से हमारे व्यवहार में प्रेम भाव और स्नेह बना रहता है । \n\nपूज्य श्री का उद्देश्य है इस भाषा को जन जन तक पहुँचाया जाये और सभी को सिखाइ जाए। \n\n“प्राकृत हमारी दादी माँ है \nसंस्कृत पिता महा हैं\nअपभ्रंस हमारे पिता हैं \nअंग्रेज़ी हमारी पत्नी है “\n\nअधिक जानकारी के लिए: https://prakritvidya.com",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/7Ymey9OadwY/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/7Ymey9OadwY/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/7Ymey9OadwY/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/7Ymey9OadwY/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  },
                  "maxres": {
                    "url": "https://i.ytimg.com/vi/7Ymey9OadwY/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 0,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "7Ymey9OadwY"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "-utW0c7SsQWbTMywr78HUcdY5ww",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy41NkI0NEY2RDEwNTU3Q0M2",
              "snippet": {
                "publishedAt": "2018-11-14T07:27:46Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइय सिक्खा - भाग १ | प्राकृत कक्षा | मुनि श्री प्रणम्यसागर  जी | गिनती एवं शब्द नियमवाली #Day2",
                "description": "पूज्य मुनि श्री द्वारा प्राकृत भाषा में ५० तक संख्या का पाठ कराया गया। मुनि श्री ने पढ़ाया की हिंदी के अनेक शब्द प्राकृत से उत्पन्न हुए हैं जिन्हें हम रोज़ उपयोग में लेते हैं ।जैसे चौदह, तेरह ये सभी शब्द प्राकृत भाषा के शब्द हैं। मुनि श्री ने णमोकार मंत्र एवं चत्तारी दंडक का सही उच्चारण कराया और उनसे सम्बंधित प्रश्न उत्तर प्राकृत भाषा में कराए।प्राकृत में शब्दों का रूपांतरण करने के लिए कुछ आसान नियमावली सिखाई। प्राकृत की कुछ गाथाएँ अर्थ सहित समझाईं गई। अंत में २४ तीर्थंकरों के नाम एवं चिन्ह प्राकृत में कराए।\n\nअधिक जानकारी के लिए: https://prakritvidya.com",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/Ya0Y3tG4kts/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/Ya0Y3tG4kts/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/Ya0Y3tG4kts/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/Ya0Y3tG4kts/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  },
                  "maxres": {
                    "url": "https://i.ytimg.com/vi/Ya0Y3tG4kts/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 1,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "Ya0Y3tG4kts"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "0_6CJg6o54UHs_5nywb_U5NekDU",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy4wMTcyMDhGQUE4NTIzM0Y5",
              "snippet": {
                "publishedAt": "2018-12-29T11:53:34Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइय सिक्खा - भाग १ | प्राकृत कक्षा | तीर्थंकरों के नाम व चिंह | मुनि श्री प्रणम्यसागर जी  #Day3",
                "description": "अधिक जानकारी के लिए: https://prakritvidya.com",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/QCWT_iSP3-s/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/QCWT_iSP3-s/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/QCWT_iSP3-s/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/QCWT_iSP3-s/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  },
                  "maxres": {
                    "url": "https://i.ytimg.com/vi/QCWT_iSP3-s/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 2,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "QCWT_iSP3-s"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "Xap6FqWgqnTAC006GfTgj63-34w",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy41MjE1MkI0OTQ2QzJGNzNG",
              "snippet": {
                "publishedAt": "2018-12-29T11:53:41Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइय सिक्खा - भाग १ | प्राकृत कक्षा | गति एवं  व्याकरण अभ्यास -1 | मुनि श्री प्रणम्यसागर जी #Day4",
                "description": "प्राकृत में गति किसे कहते हैं? कौन-कौन सी होती हैं? उनके नाम क्या हैं? साथ ही साथ इस वीडियो के माध्यम से हम सीखेंगे प्राकृत की व्याकरण।\n\nसर्वप्रथम जो पाइय सिक्खा पुस्तक में पृष्ठ संख्या  20  पर अभ्यास 1में जो व्याकरण दी गई  है इसे सीखते है। जिस प्रकार संस्कृत में सर्वनाम शब्द धातु रूप एवम विभक्ति चक्र चलते हैं उसी प्रकार प्राकृत में भी चलते हैं। \n\nप्रायः संस्कृत में तीन वचन होते है लेकिन प्राकृत में दो वचन होते है। एकवचन एवम बहुवचन ।महाराज श्री द्वारा सरलता से सर्वनाम शब्दो, धातु रूप, अव्यय शब्दों एवम विभक्ति चक्र का प्रयोग करके वाक्य रचना सिखाई जा रही है। \n\nअभ्यास 1 में प्रथमा विभक्ति एवम द्वितीया विभक्ति एवम प्रथम पुरुष या अन्य पुरुष का प्रयोग सिखाया जा रहा है।\n\nअधिक जानकारी के लिए: https://prakritvidya.com\n\nContributed by: Neha Jain, Rewari",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/PLA0nvIlT1U/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/PLA0nvIlT1U/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/PLA0nvIlT1U/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/PLA0nvIlT1U/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  },
                  "maxres": {
                    "url": "https://i.ytimg.com/vi/PLA0nvIlT1U/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 3,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "PLA0nvIlT1U"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "kkyqa_fLh5nx0qTEHvTQCVmA9F8",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy4xMkVGQjNCMUM1N0RFNEUx",
              "snippet": {
                "publishedAt": "2019-01-05T12:34:36Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइए सिक्खा - भाग १ | प्राकृत कक्षा | अभ्यास १, २ के वाक्य प्रयोग | मुनि श्री प्रणम्यसागर जी #Day05",
                "description": "आओ सीखें सर्वनाम शब्दों, अव्यय शब्दों, संज्ञा शब्दों, क्रिया पद रूप का प्रयोग करके प्राकृत में वाक्य रचना कैसे की जाती है?\n\nइस वीडियो के माध्यम से हम  अव्यय शब्दों का प्रयोग करके प्राकृत में वाक्य रचना कैसे की जाती है? इसे सीखेंगे।\nसर्वप्रथम हमें यह ध्यान रखना चाहिए क्रिया हमेशा कर्ता के अनुसार ही लगती है यदि कर्ता प्रथम पुरुष एकवचन का है तो क्रिया भी प्रथम पुरुष एक वचन की ही लगेगी। \nक्रियापद- हस, पढ, चल, लिह, गच्छ इत्यादि सभी क्रियाएं होती हैं।\nजैसे- वह जाता है।\n          सो गच्छदि।\n  यहाँ 'वह' कर्ता है जो कि प्रथम पुरुष एकवचन का है । 'जाता है' एक क्रिया है इसमें क्रिया प्रथम पु0 एकवचन की लगाने पर ' गच्छदि' बन जाता है। प्रथम पुरुष को अन्य पुरुष भी कहा जाता है।\nतो आइए मध्यम पुरुष के वाक्य कैसे बनते है? इस वीडियो के माध्यम से सीखते हैं।\n\nअधिक जानकारी के लिए: https://prakritvidya.com\nContributed by: Neha Jain, Rewari\nDate: 18th September 2018",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/wahBIq7Lr0E/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/wahBIq7Lr0E/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/wahBIq7Lr0E/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/wahBIq7Lr0E/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 4,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "wahBIq7Lr0E"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "kA0wmdcKFHVoCRU5Aw2-UAX8lLo",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy4wOTA3OTZBNzVEMTUzOTMy",
              "snippet": {
                "publishedAt": "2019-01-05T12:34:36Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "पाइए सिक्खा-भाग १ | प्राकृत कक्षा | अभ्यास २,३ के वाक्य प्रयोग। मुनि श्री प्रणम्यसागर जी #Day06",
                "description": "आइये इस वीडियो में हम सीखेंगे प्राकृत में मध्यम पु0 एवं उत्तम पु0 के वाक्यों को कैसे बनाएंगे?\nमध्यम पु0 के एकवचन की क्रिया में 'सि' एवं बहुवचन की क्रिया में 'ह' लगाने पर वाक्य मध्यम पु0 का बन जाता है।\nजैसे- तुम लिखते हो।\nयहाँ 'तुम' कर्ता है। 'लिखना' क्रिया है। 'लिह' में 'सि' जोड़ने पर वाक्य मध्यम पु0 एकवचन का बन जायेगा।\nतुमं लिहसि।\nयदि मध्यम पु0 बहुवचन का वाक्य बनाना है ।\nजैसे- तुम दोनों चलते हो।\n     प्राकृत में सर्वनाम शब्द 'तुम दोनों' का 'तुम्हे'  एवं क्रिया 'चल' में 'ह' लग जायेगा\nतुम्हे चलह यह वाक्य बनेगा।\nउत्तम पु0 के वाक्यों में 'आमि' एवं 'आमो' जोड़ने पर उत्तम पु0 का वाक्य बन जाता है।\nजैसे- मैं पीता हूँ।\nयहाँ 'मैं' उत्तम पु0 एक0  का  सर्वनाम शब्द है 'पिब' में 'आमि' जोड़ने पर 'पिबामि' बन जायेगा।\n अहं पिबामि  यह वाक्य बनेगा।\nएक बात ध्यान रखने योग्य है संज्ञा शब्द हमेशा प्रथम पु0 के ही होते है।\n\nअधिक जानकारी के लिए: https://prakritvidya.com\nContributed by: Neha Jain, Rewari\nDate: 19th September 2018",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/Jvt4lcprJe0/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/Jvt4lcprJe0/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/Jvt4lcprJe0/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/Jvt4lcprJe0/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 5,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "Jvt4lcprJe0"
                }
              }
            },
            {
              "kind": "youtube#playlistItem",
              "etag": "Ypge0HtqLlq4kR4wxezwIkgBWCs",
              "id": "UExPUmU1RURmTjZTb2RMUU8tTWtoX0tMUTkzcnNINy1DQy41MzJCQjBCNDIyRkJDN0VD",
              "snippet": {
                "publishedAt": "2019-01-31T09:16:58Z",
                "channelId": "UC5jEi4Sn4yzvXUB2gWLminQ",
                "title": "प्राकृत भाषा में प्रवचन । प्राकृत दीक्षांत समारोह | Prakrit Language Pravachan",
                "description": "जय जिणिन्द बंधुओ,\n\nप्राकृत दीक्षांत समारोह में प्राकृत मर्मज्ञ मुनि श्री 108 प्रणम्य सागर जी द्वारा प्राकृत भाषा में प्रवचन दिया गया।\n\n- मुनि श्री कहते हैं कि प्राकृत भाषा महिला की तरह सरल और कोमल होती है।\n- अनेक आचार्यों द्वारा प्राकृत भाषा में अनेक ग्रंथों की रचनाएं हुई हैं।\n- आचार्य कुन्दकुन्द देव ने समयसार, पंचास्तिकाय, नियमसार आदि अनेक ग्रंथों की रचना प्राकृत भाषा में की है।\n- इस वीडियो में मुनि श्री द्वारा प्राकृत भाषा से अवगत कराया गया है।",
                "thumbnails": {
                  "default": {
                    "url": "https://i.ytimg.com/vi/RNDOk-EA0wU/default.jpg",
                    "width": 120,
                    "height": 90
                  },
                  "medium": {
                    "url": "https://i.ytimg.com/vi/RNDOk-EA0wU/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                  },
                  "high": {
                    "url": "https://i.ytimg.com/vi/RNDOk-EA0wU/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                  },
                  "standard": {
                    "url": "https://i.ytimg.com/vi/RNDOk-EA0wU/sddefault.jpg",
                    "width": 640,
                    "height": 480
                  },
                  "maxres": {
                    "url": "https://i.ytimg.com/vi/RNDOk-EA0wU/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                  }
                },
                "channelTitle": "Muni Shri Pranamya Sagar Ji Ke Bhakt",
                "playlistId": "PLORe5EDfN6SodLQO-Mkh_KLQ93rsH7-CC",
                "position": 6,
                "resourceId": {
                  "kind": "youtube#video",
                  "videoId": "RNDOk-EA0wU"
                }
              }
            }
          ],
          "pageInfo": {
            "totalResults": 7,
            "resultsPerPage": 25
          }
        };
        console.log("__ahoeaephapegeaggaiepggage");
        console.log(data);
        this.setState({
            data: data,
            inProgressNetworkReq: false
        });
    }
}

  render() {
    if(this.state.data!==""){
      return (
        <><Appbar.Header>
        <Appbar.BackAction onPress={() => {this.props.navigation.goBack(null)}} />
      </Appbar.Header>
        <ScrollView style={styles.container}>
          {
      this.state.data.items.map((u, i) => {
        var imageuri = "https://i.ytimg.com/vi/AM0_W6QpdYQ/mqdefault.jpg";
        if(u.snippet && u.snippet.thumbnails && u.snippet.thumbnails.medium && u.snippet.thumbnails.medium){
          imageuri = u.snippet.thumbnails.medium.url;
        }
        return (
          <Card>
          <Card.Content>
        <Title>{u.snippet.title}</Title>
            {/* <Paragraph>{u.snippet.description}</Paragraph> */}
          </Card.Content>
          <Card.Cover source={{ uri: u.snippet.thumbnails.standard.url }} />
          <Card.Actions>
            <Button onPress={()=>this._handlePressButtonAsync(u.snippet.resourceId.videoId)}>Watch Video</Button>
          </Card.Actions>
        </Card>
        );
      })
    }
        </ScrollView>
       </>
        );
    }
    else{
      return <>
      <Appbar.Header>
          <Appbar.Content title="" />
      </Appbar.Header>
      <View style={{flex: 1, alignContent: "center", justifyContent: "center"}}>
          <ActivityIndicator animating={true} color={Colors.red800} />
      </View>
      </>
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});

export default HomeScreen;
