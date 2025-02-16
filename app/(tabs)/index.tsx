import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import apiRequest from "@/util/request";
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';



export default function HomeScreen() {
  const [centers, setCenters] = useState<{ latitude: number; longitude: number }[]>([]);
  const [region, setRegion] = useState({
    latitude: 18.7357, 
    longitude: -70.1627,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getCenterData = async () => {
    try {
      const result = await apiRequest("", "GET", "/center");
      if (result?.data) {
        const formattedCenters = result.data.map((center: any) => ({
          latitude: parseFloat(center?.latitude), 
          longitude: parseFloat(center?.longitude) 
        }))
  
        setCenters(formattedCenters);
      }
    } catch (error) {
      console.error("Error fetching centers:", error);
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  

  useEffect(() => {
    getCenterData();

  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [location]);

  useEffect(() => {
  console.log(centers)
  }, [centers]);
  

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <MapView style={styles.map} region={region}>
       {centers.map((center, index) => (
          <Marker
            key={index}
            coordinate={{ latitude:  center?.latitude, longitude: center?.longitude }}
            pinColor="red" 
          />
        ))}
       
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
