import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import CategoryButtons from "@/components/categoryButtons";
import Listing from "@/components/Listing";
import ListingData from '@/data/destinations.json'
import GrpListingData from '@/data/group.json'
import GrpListing from "@/components/GrpListing";

const Index = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState("All")

  const onCatChanged  =  (category: string) => {
    console.log(category)
    setCategory(category)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'0,0,0,0'}/>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://xsgames.co/randomusers/avatar.php?g=female",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Explore the beautiful World!</Text>
        <View style={styles.searchSectionWrapper}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={18}
              style={{ marginRight: 5, color: Colors.black }}
            />
            <TextInput placeholder="Search..." />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.filterButton}>
            <Ionicons name="options" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <CategoryButtons onCategoryChanged={onCatChanged}/>
        <Listing listing={ListingData} category={category}/>
        <GrpListing listing={GrpListingData} />
        </ScrollView>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
    paddingTop: StatusBar.currentHeight,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterButton:{
    backgroundColor:Colors.primaryColor,
    padding:12,
    marginLeft:12,
    borderRadius:10,
  }
});
