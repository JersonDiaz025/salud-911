import { useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import apiRequest from "@/util/request";

export default function HomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [centers, setCenters] = useState<{ latitude: number; longitude: number }[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [nearestCenter, setNearestCenter] = useState<{ latitude: number; longitude: number } | null>(null);

  const [region, setRegion] = useState({
    latitude: 18.7357, 
    longitude: -70.1627,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const getCenterData = async () => {
    try {
      const result = await apiRequest("", "GET", "/center");
      if (result?.data) {
        const formattedCenters = result.data.map((center: any) => ({
          latitude: parseFloat(center?.latitude), 
          longitude: parseFloat(center?.longitude) 
        }));
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
        console.error('Permission to access location was denied');
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
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      }

      if (centers.length > 0) {
        let nearest = centers.reduce((prev, curr) => {
          let prevDistance = Math.sqrt(
            Math.pow(prev.latitude - location.coords.latitude, 2) +
            Math.pow(prev.longitude - location.coords.longitude, 2)
          );
          let currDistance = Math.sqrt(
            Math.pow(curr.latitude - location.coords.latitude, 2) +
            Math.pow(curr.longitude - location.coords.longitude, 2)
          );
          return currDistance < prevDistance ? curr : prev;
        });
        setNearestCenter(nearest);
      }
    }
  }, [location, centers]);

 
useEffect(() => {
  console.log(nearestCenter, "this is the route")
}, [nearestCenter]);

  return (
    <View style={{ flex: 1 }}>
      <MapView ref={mapRef} style={styles.map} region={region} showsUserLocation={true}>
        {centers.map((center, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: center.latitude, longitude: center.longitude }}
            pinColor="red"
          />
        ))}

        {location && nearestCenter?.latitude && nearestCenter?.longitude && (
          <MapViewDirections
            origin={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
            destination={{ latitude: nearestCenter.latitude, longitude: nearestCenter.longitude }}
            apikey={`${process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY}`}
            strokeWidth={4}
            strokeColor="green"
            onReady={() => mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } })}
          
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
