import * as React from "react";
import {
  Image,
  BackHandler,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
export const HomeScreen = ({ navigation }) => {
  const ItemMenu = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigationPath);
        }}
      >
        <ImageBackground
          style={{
            height: 200,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginHorizontal: 10,
          }}
          imageStyle={{ opacity: 0.8 }}
          resizeMode="contain"
          source={require("../assets/images/cloud/cloud-red.png")}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("../assets/images/gif/under-water.gif")}
      >
        <Button
          onPress={() => BackHandler.exitApp()}
          style={{ alignSelf: "flex-start" }}
          icon={({ size, color }) => (
            <Image
              source={require("../assets/images/back-icon.png")}
              style={{ width: 50, height: 50, marginTop: 15 }}
            />
          )}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <FlatList
            horizontal
            data={[
              {
                title: "Learn Number",
                key: "item1",
                navigationPath: "LearnNumbers",
              },
              {
                title: "Practice",
                key: "item2",
                navigationPath: "NumberQuiz",
              },
              {
                title: "Count Numbers",
                key: "item4",
                navigationPath: "CountNumbers",
              },
            ]}
            renderItem={({ item }) => <ItemMenu item={item} />}
            keyExtractor={(item) => item.key.toString()}
          />
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  menuText: {
    fontSize: 35,
    color: "yellow",
    fontFamily: "Rancho_400Regular",
    flexWrap: "wrap",
  },
});
