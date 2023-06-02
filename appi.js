import React from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {horizontal} from 'react-native-swiper-flatlist/src/themes';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const appi = () => (
  <View style={styles.container}>
    <SwiperFlatList
      //vertical
      //autoplay
      //autoplayDelay={2}
      //autoplayLoop
      //index={2}
      //showPagination
      contentContainerStyle={{flexGrow:1}}
      data={colors}
      //data={['1', '2', '3','4']}
      renderItem={({ item }) => (
        <View style={[styles.child, { backgroundColor: item }]}>
          <Text style={styles.text}>{item}</Text>
          <Image
          source={require('./assets/images/about.png')}
          style={{tintColor: 'white'}}
        />
        </View>
      )}
    />
  </View>
  // <View >
  //   <View style={{height: height}}>
  //     <SwiperFlatList
  //       vertical={true}
  //       numColumns={1}
  //       //contentContainerStyle={{flexGrow:1}}
  //       //style={{flex: 1}}
  //       data={['1', '2', '3',"4"]}
  //       //data={colors}
  //       renderItem={({item}) => (
  //         <View style={[styles.child, {backgroundColor: item}]}>
  //         <Text style={styles.text}>{item}</Text>
  //         </View>
  //       )}
  //     />
  //   </View>
  // </View>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {backgroundColor: 'white',flexDirection:'column',flex:1},
  child: {justifyContent: 'center', alignItems: 'center',width},
  // text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default appi;
