import { RandomUser } from "@/lib/randomUser";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  user: RandomUser;
};

const ProfileCard = ({ user }: Props) => {
  return (
    <View style={styles.card}>
      {/* 🖼️ Profile Image */}
      <Image source={{ uri: user.picture.large }} style={styles.image} />

      {/* 👤 Name */}
      <Text style={styles.name}>
        {user.name.title} {user.name.first} {user.name.last}
      </Text>

      {/* 📧 Email */}
      <Text style={styles.info}>{user.email}</Text>

      {/* 📱 Phone */}
      <Text style={styles.info}>{user.phone}</Text>

      {/* 📍 Location */}
      <Text style={styles.location}>
        {user.location.city}, {user.location.country}
      </Text>

      {/* 🎂 Age */}
      <Text style={styles.age}>Age: {user.dob.age}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",

    // shadow
    elevation: 4,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    fontSize: 14,
    color: "gray",
  },

  location: {
    marginTop: 5,
    fontSize: 14,
  },

  age: {
    marginTop: 5,
    fontWeight: "bold",
  },
});