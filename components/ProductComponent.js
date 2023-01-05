import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartSlice";
const ProductComponent = ({ item }) => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const [additems, setAddItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  return (
    <View>
      <Pressable
        style={{
          borderEndColor: "#AFD8F5",
          borderWidth: 0.1,
          padding: 5,
        }}
      >
        <Image
          style={{
            height: 145,
            borderRadius: 5,
            aspectRatio: 5 / 6,
            marginLeft: 10,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.name.substr(0, 14)}
          </Text>

          <Text style={{ marginTop: 4 }}>
            {item.description.substr(0, 17) + "..."}
          </Text>

          {cart.some((x) => x.id === item.id) ? (
            <Pressable
              style={{
                
                backgroundColor: "#03C03C",
                width:80,
                borderRadius:6,
             
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              
              <Pressable onPress={() => {
                if(additems === 1){
                  dispatch(removeFromCart(item))
                  setSelected(false)
                  setAddItems(0);
                }else{
                  setAddItems((c) => c - 1);
                  dispatch(decrementQuantity(item))

                }
              }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 6,
                  }}
                >
                  {additems}
                </Text>
              </Pressable>

              <Pressable onPress={() => {
                setAddItems((c) => c + 1);
                dispatch(incrementQuantity(item))
              }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setSelectedItem(true);
                  if (additems == 0) {
                    setAddItems((c) => c + 1);
                  }
                  dispatch(addToCart(item));
                }}
                style={{
                  backgroundColor: "#03C03C",
                  padding: 5,

                  borderRadius: 4,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Add To Cart
                </Text>
              </Pressable>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ProductComponent;

const styles = StyleSheet.create({});
