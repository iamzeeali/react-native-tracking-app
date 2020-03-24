import React, { useContext, useCallback } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  // console.log(state);
  useFocusEffect(
    useCallback(() => {
      fetchTracks();
    }, [])
  );

  return (
    <SafeAreaView>
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", {
                  _id: item._id
                })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default TrackListScreen;
