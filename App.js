import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import SwiperFlatList from 'react-native-swiper-flatlist';

const {height, width} = Dimensions.get('window');

const App = () => {
  const VideoRef = useRef(null);
  const [currIndex, setIndex] = useState(0);
  // const [video, setVideo] = useState([]);
  // const [isReady, setIsReady] = useState();

  // const onBuffer = e => {
  //   console.log('buffering...', e);
  // };

  // const onError = e => {
  //   console.log('error raised', e);
  // };

  const [response, setResponse] = useState([]);
  // const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    loginpage();
  }, []);

  const loginpage = async () => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    await fetch(`https://sessionway.com/api/explore/getCategoryStories`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        load: 1,
      }),
      headers: headers,
    })
      .then(Response => Response.json())
      .then(Response => {
        console.log('ResponseResponseResponseResponse', Response.body.stories);
        setResponse(Response.body.stories);
      })
      .catch(error => {
        console.error('ERROR FOUND---->>>>' + error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          height,
          resizeMode: 'contain',
          flex: 1,
        }}>
        {item.story_type == 'video' ? (
          <Video
            source={{uri: item.story_url}}
            style={styles.backgroundVideo}
            resizeMode="contain"
            repeat={true}
            preload="auto"
            bufferConfig={{
              minBufferMs: 1000,
              // maxBufferMs: 3000,
              // bufferForPlaybackMs: 2500,
              // bufferForPlaybackAfterRebufferMs: 5000
            }}
          />
        ) : (
          ''
        )}
        {item.story_type == 'image' ? (
          <Image
            source={{uri: item.thumbnail_url}}
            style={styles.backgroundVideo}
            resizeMode="contain"
          />
        ) : (
          ''
        )}

        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./assets/icons/other.png')}
              style={styles.profileImageStyle}
            />
            <Text style={{marginHorizontal: 8, color: 'white'}}>User .</Text>
            <TouchableOpacity>
              <Text style={{color: 'white'}}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text numberOfLines={1} style={{flex: 1, color: 'grey'}}>
              bla bla bla bla bla bla bla bla bla bla{' '}
            </Text>
            <TouchableOpacity>
              <Text style={{color: 'grey'}}>More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{...styles.flexHorizontal, marginVertical: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./assets/icons/sms.png')}
              style={{tintColor: 'grey'}}
            />
            <Image
              source={require('./assets/icons/lock.png')}
              style={{tintColor: 'grey', marginHorizontal: 8}}
            />
            <Image
              source={require('./assets/icons/sms.png')}
              style={{tintColor: 'grey'}}
            />
            <Image
              source={require('./assets/icons/lock.png')}
              style={{tintColor: 'grey', marginHorizontal: 8}}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('./assets/icons/sms.png')}
                style={{tintColor: 'white', height: 15, width: 15}}
              />
              <Text style={{marginLeft: 4, color: 'grey'}}>94.5k</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('./assets/icons/lock.png')}
                style={{
                  tintColor: 'white',
                  height: 15,
                  width: 15,
                  marginLeft: 4,
                }}
              />
              <Text style={{marginLeft: 4, color: 'grey'}}>112</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onChangeIndex = ({index}) => {
    setIndex(index);
  };

  console.log(response);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" />
      <SwiperFlatList
        vertical={true}
        data={response}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.toString()}
        onChangeIndex={onChangeIndex}
      />
      <View style={{position: 'absolute', top: 40, left: 16}}>
        <Text style={styles.textStyles}>Reels</Text>
      </View>

      <View style={{position: 'absolute', top: 40, right: 16}}>
        <Image
          source={require('./assets/icons/Edit.png')}
          style={{tintColor: 'white'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    height: height,
    width: width,
  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 16,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profileImageStyle: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
  },
});

export default App;
