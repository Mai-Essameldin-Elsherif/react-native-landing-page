import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useMovieStore } from '../src/store/useMovieStore';

export default function AddMovieScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const addMovie = useMovieStore((state) => state.addMovie);

  const handleSubmit = () => {
    if (!title || !genre || !rating) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    addMovie({ title, genre, rating });
    setTitle('');
    setGenre('');
    setRating('');
    Alert.alert('Success', 'Movie added to persistent storage!');
    navigation.navigate('Explore');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Movie</Text>
      <CustomInput label="Title" value={title} onChangeText={setTitle} placeholder="e.g. Inception" />
      <CustomInput label="Genre" value={genre} onChangeText={setGenre} placeholder="e.g. Action" />
      <CustomInput label="Rating" value={rating} onChangeText={setRating} placeholder="e.g. 8.5" keyboardType="numeric" />
      <CustomButton title="Save Movie" onPress={handleSubmit} type="primary" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
