import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { GrpListingProps } from "@/types/ListingTypes";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const GrpListing = ({ listing }: { listing: GrpListingProps[] }) => {
  const renderItems = ({ item }: { item: GrpListingProps }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={styles.itemTxt}>{item.name}</Text>
          <View style={styles.ratingWrapper}>
            <Ionicons name="star" size={20} color={Colors.primaryColor}/>
            <Text style={styles.ratingTxt}>{item.rating}</Text>
            <Text style={styles.reviewTxt}>({item.reviews})</Text>
          </View> 
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={styles.titleTxt}>Top Travel Groups</Text>
      <FlatList
        data={listing}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GrpListing;

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemTxt:{
    fontSize:14,
    fontWeight:'600',
    color:Colors.black,
    marginBottom:8
  },
  ratingWrapper:{
    flexDirection:"row",
    alignItems:"center"
  },
  ratingTxt:{
    fontSize:14,
    fontWeight:"600",
    color:Colors.black,
    marginLeft:5,
  },
  reviewTxt:{
    fontSize:14,
    color:"#999"
  }
});
