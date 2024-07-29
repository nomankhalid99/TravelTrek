import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Stack, useLocalSearchParams, useRouter } from "expo-router";
  import { ListingProps } from "@/types/ListingTypes";
  import listingData from "@/data/destinations.json";
  import {
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons,
  } from "@expo/vector-icons";
  import Colors from "@/constants/Colors";
  import Animated, {
    SlideInDown,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
  } from "react-native-reanimated";
  
  const { width } = Dimensions.get("window");
  const IMG_HEIGHT = 300;
  
  const ListingDetails = () => {
    const { id } = useLocalSearchParams();
    const listing: ListingProps | undefined = (listingData as ListingProps[]).find(
      (item) => item.id === id
    );
  
    const router = useRouter();
  
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-IMG_HEIGHT, 0, IMG_HEIGHT],
              [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
            ),
          },
          {
            scale: interpolate(
              scrollOffset.value,
              [-IMG_HEIGHT, 0, IMG_HEIGHT],
              [2, 1, 1]
            ),
          },
        ],
      };
    });
  
    if (!listing) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Listing not found</Text>
        </View>
      );
    }
  
    return (
      <>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.white,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Feather name="arrow-left" size={20} />
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.white,
                    padding: 6,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="bookmark-outline" size={20} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.container}>
          <Animated.ScrollView
            ref={scrollRef}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            <Animated.Image
              source={{ uri: listing.image }}
              style={[styles.image, imageAnimatedStyle]}
            />
            <View style={styles.contentWrapper}>
              <Text style={styles.itemTxt}>{listing.name}</Text>
  
              <View style={styles.locationWrapper}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.locationTxt}>{listing.location}</Text>
              </View>
  
              <View style={styles.detailsWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.detailsIcon}>
                    <Ionicons name="time" size={18} color={Colors.primaryColor} />
                  </View>
                  <View>
                    <Text style={styles.detailsTxt}>Duration</Text>
                    <Text style={styles.detailsVal}>{listing.duration} Days</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.detailsIcon}>
                    <FontAwesome
                      name="user"
                      size={18}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.detailsTxt}>Person</Text>
                    <Text style={styles.detailsVal}>{listing.duration}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.detailsIcon}>
                    <Ionicons name="star" size={18} color={Colors.primaryColor} />
                  </View>
                  <View>
                    <Text style={styles.detailsTxt}>Rating</Text>
                    <Text style={styles.detailsVal}>{listing.rating}</Text>
                  </View>
                </View>
              </View>
  
              <Text style={styles.descriptionTxt}>{listing.description}</Text>
            </View>
          </Animated.ScrollView>
        </View>
  
        <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.btn, styles.bookBtn]}
          >
            <Text style={styles.btnTxt}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.btn}>
            <Text style={styles.btnTxt}>${listing.price}</Text>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  };
  
  export default ListingDetails;
  
  const styles = StyleSheet.create({
    image: {
      width: width,
      height: IMG_HEIGHT,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    contentWrapper: {
      padding: 20,
      backgroundColor: Colors.white,
    },
    itemTxt: {
      fontSize: 20,
      fontWeight: "600",
      color: Colors.black,
      letterSpacing: 0.5,
    },
    locationWrapper: {
      flexDirection: "row",
      marginTop: 5,
      marginBottom: 10,
      alignItems: "center",
    },
    locationTxt: {
      fontSize: 14,
      marginLeft: 5,
      color: Colors.black,
    },
    detailsWrapper: {
      flexDirection: "row",
      marginVertical: 20,
      justifyContent: "space-between",
    },
    detailsIcon: {
      backgroundColor: "#F4F4F4",
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 8,
      marginRight: 5,
      alignItems: "center",
    },
    detailsTxt: {
      fontSize: 12,
      color: "#999",
    },
    detailsVal: {
      fontSize: 14,
      fontWeight: "600",
    },
    descriptionTxt: {
      fontSize: 16,
      lineHeight: 25,
      letterSpacing: 0.5,
      color: Colors.black,
    },
    footer: {
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      padding: 20,
      paddingBottom: 30,
      width: width,
    },
    btn: {
      flex: 1,
      backgroundColor: Colors.black,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    btnTxt: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.white,
      textTransform: "uppercase",
    },
    bookBtn: {
      backgroundColor: Colors.primaryColor,
      marginRight: 20,
      flex: 2,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  