// import { useState } from "react";
// import { Text, View, Button, ScrollView, Pressable, TextInput, StyleSheet, Image } from "react-native";

// export default function Index() {
//   const [timesPressed, setTimesPressed] = useState(0);
//   const [text, setText] = useState("");

//   const onPressFunction = () => {
//     alert('Button Pressed!');
//   };
//   return (
//     <ScrollView>
//       {/* <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//     > */}
//       <Text>Hello World !!!</Text>
//       <Button title="Click Me" onPress={() => alert('Button Pressed!')} />
      

//       <Pressable onPress={onPressFunction}>
//         <Text>Press Me</Text>
//       </Pressable>
      
//       <Pressable
//           onPress={() => {
//             setTimesPressed(current => current + 1);
//           }}
//           style={({pressed}) => [
//             {
//               backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
//             },
//             styles.wrapperCustom,
//           ]}>
//           {({pressed}) => (
//             <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
//           )}
//         </Pressable>

//         <Text>Times Pressed: {timesPressed}</Text>

//       {[...Array(100)].map((_, i) => (
//         // <Text key={i}>Item {i + 1}</Text>
//         <View key={i}
//         style= {{
//           height: 100,
//           backgroundColor: i % 2 === 0 ? 'lightblue' : 'lightgray',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//           <Text>Item {i + 1}</Text>
//         </View>
//       ))}
//       <TextInput
//         keyboardType="default"
//         placeholder="Enter text"
//         value={text}
//         onChangeText={(value) => {
//           setText(value);
//         }}
//         onFocus={() => console.log('Input focused')}
//         onBlur={() => console.log('Input blurred')}
//       />

//       <Image
//         source={{ uri: 'https://www.appcoda.com/content/images/size/w1280/format/webp/wordpress/2015/04/react-native.png' }}
//         style={{ height: 200, width: 200 }}
//       />
      
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   wrapperCustom: {
//     padding: 12,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bqw',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6qwq',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29ddcsdc',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53ac28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa9sdc7f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96ds-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <Text>
            header
          </Text>
        }
        ListFooterComponent={
          <Text>
            Footer
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{width:100}} />}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;