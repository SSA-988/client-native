import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../components/Category";

import { StatusBar } from "expo-status-bar";
import Carousel from "../components/Carousel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );
  const { width } = Dimensions.get("window");

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();
    console.log("blue tooth", coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };
  const [images, setImages] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       "https://99e7-2401-4900-1c5b-642a-5ccc-1473-f246-5ffd.in.ngrok.io/categories"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setImages(data));
  //   };

  //   fetchData();
  // }, []);
  const types = [
    {
      id: "0",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/rwnkrdtnusqdkyjssahq",
      name: "Biriyani",
    },
    {
      id: "1",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/qwrkgxefwzjergtzowsc",
      name: "Dessert",
    },
    {
      id: "2",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/uckbx3rr87jhakb81mbs",
      name: "Burger",
    },
    {
      id: "3",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/z9xmu9pb65lcbt3wepud",
      name: "Salad",
    },
    {
      id: "4",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/m7osxfhdon2opecztidb",
      name: "Sandwiches",
    },
    {
      id: "0",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/rwnkrdtnusqdkyjssahq",
      name: "Biriyani",
    },
  ];

  // console.log(images)
  return (
    <>
      <SafeAreaView>
        {/* <StatusBar /> */}
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{displayCurrentAddress}</Text>
          <AntDesign name="down" size={24} color="black" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              margin: 10,
              padding: 10,
              borderColor: "#C0C0C0",
              borderRadius: 7,
            }}
          >
            <TextInput
              style={{ fontSize: 17 }}
              placeholder="Search for Restaurant item or more"
            />
            <AntDesign name="search1" size={24} color="#E52B50" />
          </View>
          <Ionicons
            style={{ marginRight: 10 }}
            name="person"
            size={24}
            color="black"
          />
        </View>

        <Carousel />

        <View style={{ padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Categories</Text>
        </View>

        <FlatList
          numColumns={3}
          data={types}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Product")}
              style={{
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,

                  resizeMode: "contain",
                }}
                //  source={{ uri:`${BASE_URL}/${item.image}`}}
                source={{ uri: item.image }}
              />
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#00A877",
            width: "90%",
            padding: 13,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 30,
            position: "absolute",
            borderRadius: 8,
            left: 20,
            bottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                {cart.length} items | {total}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 3,
                  color: "white",
                }}
              >
                Extra Charges may Apply!
              </Text>
            </View>

            <Pressable onPress={() => navigation.navigate("Cart")}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                View Cart
              </Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
