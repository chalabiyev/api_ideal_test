// import React, {useRef} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   View,
//   Dimensions,
//   Animated,
//   ScrollView,
// } from 'react-native';
// import {makeStyles} from './style';
// import colors from '../../../constants/colors/colors';
// import {globalSpacingStyle} from '../../../constants/space/style';
// import MainButton from '../../../components/Fit/Button/MainButton';
// import {scale} from 'react-native-size-matters';
// import {useNavigation} from '@react-navigation/native';
// const styles = makeStyles();
// const globalStyle = globalSpacingStyle();
// const {width: viewportWidth} = Dimensions.get('window');
// export default function Splash() {
//   const navigation = useNavigation();
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const slides = [
//     {
//       id: '1',
//       image: require('../../../assets/images/SplashImages/Splash1.png'),
//       title: 'Sürətli nağd pul krediti',
//     },
//     {
//       id: '2',
//       image: require('../../../assets/images/SplashImages/Splash2.png'),
//       title: 'Partnyorlardan məhsulların kreditlə əldə olunması',
//     },
//     {
//       id: '3',
//       image: require('../../../assets/images/SplashImages/Splash3.png'),
//       title: '24/7 kredit əldə etmək imkanı',
//     },
//   ];
//   const currentIndex = scrollX.interpolate({
//     inputRange: slides.map((_, i) => i * viewportWidth),
//     outputRange: slides.map((_, i) => i),
//     extrapolate: 'clamp',
//   });

//   return (
//     <>
//       <SafeAreaView style={{backgroundColor: colors.splashBackground}} />
//       <View style={styles.container}>
//         <View style={styles.imageBox}>
//           <Image
//             style={styles.image}
//             resizeMode="contain"
//             source={require('../../../assets/images/Logo.png')}
//           />
//         </View>
//         <View style={globalStyle.space50VT} />
//         <Animated.View
//           style={{
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: 50,
//           }}>
//           {slides.map((slide, index) => {
//             return (
//               <Animated.Text
//                 key={slide.id}
//                 style={{
//                   textAlign: 'center',
//                   fontSize: 20,
//                   fontFamily: 'SourceSans3-SemiBold',
//                   color: colors.blueText,
//                   opacity: currentIndex.interpolate({
//                     inputRange: [index - 1, index, index + 1],
//                     outputRange: [0, 1, 0],
//                     extrapolate: 'clamp',
//                   }),
//                   position: 'absolute',
//                 }}>
//                 {slide.title}
//               </Animated.Text>
//             );
//           })}
//         </Animated.View>

//         <View style={globalStyle.space50VT} />
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           style={{flexGrow: 0, marginBottom: scale(40)}}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {x: scrollX}}}],
//             {useNativeDriver: false},
//           )}
//           scrollEventThrottle={16}>
//           {slides.map((slide, index) => (
//             <View style={styles.slide} key={slide.id}>
//               <Image
//                 style={styles.sliderImage}
//                 resizeMode="contain"
//                 source={slide.image}
//               />
//             </View>
//           ))}
//         </ScrollView>
//         <MainButton
//           text="İdeal Kredit müştəriyəm"
//           onPress={() => navigation.navigate('Login')}
//         />
//         <View style={globalStyle.space10VT} />
//         <MainButton
//           text="İdeal Kredit müştəri deyiləm"
//           onPress={() => navigation.navigate('Register')}
//           color={colors.defaultButtonSkyBlue}
//         />
//       </View>
//     </>
//   );
// }
