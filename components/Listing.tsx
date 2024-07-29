import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListingProps } from "@/types/ListingTypes";
import Colors from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
  listing: ListingProps[];
  category: string;
};

const Listing = ({ listing, category }: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Update Listing");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderItems = ({ item }: any) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 200, height: 200 }}
            />
            <View style={styles.bookmark}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={Colors.white}
              />
            </View>
            <Text style={styles.itemTxt} ellipsizeMode="tail" numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.LocPrcWrapper}>
              <View style={styles.locationWrapper}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>
              <Text style={styles.priceTxt}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View>
      <FlatList
        data={loading ? [] : listing}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  bookmark: {
    position: "absolute",
    top: 185,
    right: 30,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemTxt: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 30,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLocationTxt: {
    fontSize: 12,
    marginLeft: 5,
  },
  LocPrcWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceTxt: {
    fontSize: 12,
    color: Colors.primaryColor,
  },
});
