import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BASE_URL } from "../url";

const Category = ({ item }) => {
  return (
    <View>
      <Image
        style={{width:100,height:100,borderRadius:7}}
        source={{ uri:`${BASE_URL}/${item.image}`}}
      />
      <Text>{item.name}</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
