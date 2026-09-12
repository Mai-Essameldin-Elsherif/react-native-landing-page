import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CustomCard from '../components/CustomCard';
import CustomButton from '../components/CustomButton';
import { useMovieStore } from '../src/store/useMovieStore';

export default function ExploreScreen() {
  const { movies, removeMovie } = useMovieStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Persisted Movie Catalog</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomCard>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.details}>Genre: {item.genre} | Rating: {item.rating}</Text>
            <CustomButton title="Remove" onPress={() => removeMovie(item.id)} type="danger" />
          </CustomCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  movieTitle: { fontSize: 18, fontWeight: 'bold' },
  details: { color: '#666', marginVertical: 5 },
});
