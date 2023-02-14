import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [keyword, setKeyword] = useState(0);
  const [convertFrom, setConvertFrom] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [answer, setAnswer] = useState(0);

  const myHeaders = new Headers();
    myHeaders.append("apikey", "CAA2Q27NidMUOgRgxVPD5tgIhazvV2IP");

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => fetchConvert(), []);

  const fetchConvert = () => {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)  
      .then(response => response.json())
      .then(result => setConvertFrom(result.symbols))
      .catch(error => {
        Alert.alert('Error', error);
    });
  }

  const getRepositories = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${keyword}`, requestOptions)  
      .then(response => response.json())
      .then(result => setAnswer(result.result))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
        <Text
          style={{fontSize: 18, fontWeight: "bold", margin: 20}}>Tulos: {answer.toFixed(2)}€
        </Text>
        <View style={styles.picker}>
            <TextInput
              style={{fontSize: 18, width: 70}}
              placeholder='Amount'
              value={keyword}
              onChangeText={amount => setKeyword(amount)} 
            />
            <Picker
              style={{width: 300, height: 200}}
              mode="dropdown"
              selectedValue={selectedCurrency}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCurrency(itemValue)
              }>
              {Object.keys(convertFrom).map((key) => {
                  return (<Picker.Item label={convertFrom[key]} value={key} key={key}/>) 
              })}
            </Picker>
        </View>
        <View style={{margin: 20}}>
          <Button title="Convert" onPress={getRepositories} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
