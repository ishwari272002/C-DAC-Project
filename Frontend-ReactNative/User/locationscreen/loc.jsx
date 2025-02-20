import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapViewScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      navigation.navigate("home", { location: selectedLocation });
    } else {
      alert("Please select a location on the map");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Location</Text>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.5944, // Latitude of Hinjewadi, Pune
          longitude: 73.7413, // Longitude of Hinjewadi, Pune
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>

      {/* Save Button */}
      <Button title="Save Location" onPress={handleSaveLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
