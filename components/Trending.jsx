import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { icons } from "../constants";

const TrendingItem = ({ activeItem, item }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = (text) => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };
  return (
    <View className="bg-black-100 rounded-xl m-2.5 ">
      <TouchableOpacity
        className="relative flex justify-center items-center"
        activeOpacity={0.7}
        onPress={() => speak(item.title)}
      >
        <ImageBackground
          source={{
            uri: item.thumbnail,
          }}
          className="w-[146px] h-36 rounded-t-xl  overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text className="py-1.5 px-1 text-sm text-gray-100 font-semibold">
        {item.title}
      </Text>
    </View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  const renderGridItem = ({ item }) => (
    <View style={{ flex: 1, paddingHorizontal: 8 }}>
      <TrendingItem activeItem={activeItem} item={item} />
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderGridItem}
      keyExtractor={(item) => item.$id}
      numColumns={2}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    />
  );
};

export default Trending;
