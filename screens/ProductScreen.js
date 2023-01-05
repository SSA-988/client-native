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
import { addToCart, decrementQuantity, removeFromCart } from "../redux/CartSlice";
import ProductComponent from "../components/ProductComponent";
import { useNavigation } from "@react-navigation/native";

const ProductScreen = () => {
  const [selected, setSelected] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [additems, setAddItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(cart);
  const types = [
    {
      id: "0",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/rwnkrdtnusqdkyjssahq",
      name: "Biriyani",
      items: [
        {
          id: "0",
          name: "Farmhouse",
          description:
            "Delightful combination of onion, capsicum, tomato & grilled mushroom",
          price: 390,
          image: "https://images.dominos.co.in/farmhouse.png",
          veg: true,
        },
        {
          id: "1",
          name: "Pepper Barbecue Chicken",
          description:
            "Pepper barbecue chicken for that extra zing,  with melting cheese & soft paneer fillings to satisfy all your indulgent cravings",
          price: 429,
          image: "https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg",
          veg: false,
        },
        {
          id: "2",
          name: "Paneer Paratha Pizza",
          description:
            "An epic fusion of paratha and pizza with melting cheese & soft paneer fillings to satisfy all your indulgent cravings",
          price: 209,
          image: "https://images.dominos.co.in/Paneer.jpg",
          veg: true,
        },
        {
          id: "3",
          name: "The 4 Cheese Pizza",
          description:
            "Cheese Overloaded pizza with 4 different varieties of cheese and 4 times the cheese of a normal pizza, including a spicy hit of Ghost",
          price: 529,
          image: "https://images.dominos.co.in/PIZ0171.jpg",
          veg: true,
        },
        {
          id: "4",
          name: "Chicken Maximus",
          description:
            "Loaded to the Max with Chicken Tikka, Chicken Keema, Chicken Sausage and a double dose of grilled Chicken Rashers",
          price: 645,
          image: "https://images.dominos.co.in/PIZ5158_1.jpg",
          veg: false,
        },
        {
          id: "5",
          name: "The Cheese Dominator",
          description:
            "Loaded with 1 Pound of Mozzarella and gooey Liquid Cheese on a Classic Large Pizza topped with a generous helping of herb sprinkle",
          price: 459,
          image: "https://images.dominos.co.in/PIZ0170.jpg",
          vef: true,
        },

        {
          id: "7",
          name: "Mexican Green Wave",
          description:
            "Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno",
          price: 459,
          image: "https://images.dominos.co.in/new_mexican_green_wave.jpg",
          veg: true,
        },
        {
          id: "8",
          name: "Indi Tandoori Paneer",
          description:
            "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo",
          price: 349,
          image: "https://images.dominos.co.in/IndianTandooriPaneer.jpg",
          veg: true,
        },
        {
          id: "9",
          name: "Chicken Dominator",
          description:
            "Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers",
          price: 599,
          image: "https://images.dominos.co.in/new_chicken_dominator.jpg",
          veg: false,
        },
        {
          id: "10",
          name: "Chicken Maximus",
          description:
            "Loaded to the Max with Chicken Tikka, Chicken Keema, Chicken Sausage and a double dose of grilled Chicken Rashers.",
          price: 699,
          image: "https://images.dominos.co.in/PIZ5158_1.jpg",
          veg: false,
        },
        {
          id: "11",
          name: "Chicken Fiesta",
          description:
            "Grilled chicken rashers, peri-peri chicken, onion & capsicum, a complete fiesta",
          price: 599,
          image: "https://images.dominos.co.in/new_chicken_fiesta.jpg",
          veg: false,
        },
      ],
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
    {
      id: "3",
      image:
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/z9xmu9pb65lcbt3wepud",
      name: "Salad",
    },
  ];
  return (
    <>
    <SafeAreaView style={{ flexDirection: "row" }}>
      <View style={{ height: 900, width: 100, backgroundColor: "#E0E0E0" }}>
        <ScrollView>
          {types.map((item, i) => (
            <Pressable
              onPress={() => setSelected(item.items)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Image
                style={{ width: 70, height: 70, borderRadius: 35 }}
                //  source={{ uri:`${BASE_URL}/${item.image}`}}
                source={{ uri: item.image }}
              />
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View>
        {true ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={selected}
            renderItem={({ item }) => (
              <ProductComponent item={item}/>
            )}
          />
        ) : null}
        <Text>hello world</Text>
      </View>
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

            <Pressable
              onPress={() =>
                navigation.navigate("Cart")
              }
            >
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

export default ProductScreen;

const styles = StyleSheet.create({});
