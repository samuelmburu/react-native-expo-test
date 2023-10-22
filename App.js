import React, {useEffect, useState} from'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {countriesData} from './countriesData';

const BASE_URL = 'https://countriesnow.space/api/v0.1/countries'


export default function App() {
  /**@type {Array<{country:string, cities:object}>[]} */
  const [countriesData, setCountriesData] = useState([{country:'', cities: {}}]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchCountriesData() {
    // setIsLoading(true);
    fetch(BASE_URL)
    .then((response) => response.json())
    .then((json)=> {
      console.log(json.data[0]);
      setIsLoading(false);
      const {data} =  json;

      // @ts-ignore
      setCountriesData(/**@type {Array<{country:string, cities:object}>} */ data)
    })
    .catch((error) => console.log(error));
  }

  useEffect(()=>{
    fetchCountriesData();
  },[]);

  return (
    <FlatList
    data={countriesData}
    contentContainerStyle={styles.container}
    refreshing={isLoading}
    keyExtractor={(item,index)=> `${item.country}_${index}`}
    renderItem={({item},index)=> (
      <View><Text style={styles.text}>{item.country}</Text></View>
      // <Text style={styles.text}>
      //   <Text style={{color:'cyan'}}>{JSON.stringify(item)||"poop"}</Text>
      //   <Text>First part and {item.iso3} - </Text>
      //   <Text>second part</Text>
      // </Text>
    )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#483D8B'
  },
  text: {
    fontSize: 18,
    margin: 5,
    color: '#fff'
  },
});