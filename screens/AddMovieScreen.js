import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const GENRES = ['Action', 'Sci-Fi', 'Drama', 'Anime', 'Thriller', 'Documentary', 'Comedy', 'Horror'];
const RATINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function AddMovieScreen() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [addedMovies, setAddedMovies] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!genre) newErrors.genre = 'Please select a genre';
    if (!rating) newErrors.rating = 'Please select a rating';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newMovie = { id: Date.now().toString(), title, genre, rating, director, year };
    setAddedMovies((prev) => [newMovie, ...prev]);
    setTitle('');
    setGenre('');
    setRating('');
    setDirector('');
    setYear('');
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ CONTRIBUTE TO THE CATALOG</Text>
          </View>
          <Text style={styles.screenTitle}>Add a New Movie</Text>
          <Text style={styles.screenSubtitle}>
            Submit your favorite films to enrich the CineVerse community catalog.
          </Text>
        </View>

        {submitted && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>✓ Movie added to catalog successfully!</Text>
          </View>
        )}

        <View style={styles.formCard}>
          <Text style={styles.formSectionLabel}>REQUIRED DETAILS</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Movie Title *</Text>
            <TextInput
              style={[styles.textInput, errors.title && styles.textInputError]}
              placeholder="e.g. Interstellar"
              placeholderTextColor="#475569"
              value={title}
              onChangeText={(val) => {
                setTitle(val);
                if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
              }}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Genre *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {GENRES.map((g) => (
                <Pressable
                  key={g}
                  onPress={() => {
                    setGenre(g);
                    if (errors.genre) setErrors((e) => ({ ...e, genre: undefined }));
                  }}
                  style={[styles.chip, genre === g && styles.chipActive]}
                >
                  <Text style={[styles.chipText, genre === g && styles.chipTextActive]}>
                    {g}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            {errors.genre && <Text style={styles.errorText}>{errors.genre}</Text>}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Rating (1–10) *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {RATINGS.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => {
                    setRating(r);
                    if (errors.rating) setErrors((e) => ({ ...e, rating: undefined }));
                  }}
                  style={[styles.ratingChip, rating === r && styles.ratingChipActive]}
                >
                  <Text style={[styles.chipText, rating === r && styles.chipTextActive]}>
                    {r}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
          </View>

          <Text style={styles.formSectionLabel}>OPTIONAL DETAILS</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Director</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Christopher Nolan"
              placeholderTextColor="#475569"
              value={director}
              onChangeText={setDirector}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Release Year</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 2014"
              placeholderTextColor="#475569"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Movie →</Text>
          </TouchableOpacity>
        </View>

        {addedMovies.length > 0 && (
          <View style={styles.addedSection}>
            <Text style={styles.addedSectionTitle}>Recently Added</Text>
            {addedMovies.map((movie) => (
              <View key={movie.id} style={styles.addedMovieCard}>
                <View style={styles.addedMovieTop}>
                  <Text style={styles.addedMovieTitle}>{movie.title}</Text>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>★ {movie.rating}</Text>
                  </View>
                </View>
                <View style={styles.addedMovieMeta}>
                  <View style={styles.genreTag}>
                    <Text style={styles.genreTagText}>{movie.genre}</Text>
                  </View>
                  {movie.director ? (
                    <Text style={styles.addedMovieDetail}>Dir. {movie.director}</Text>
                  ) : null}
                  {movie.year ? (
                    <Text style={styles.addedMovieDetail}>{movie.year}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  tagBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  tagBadgeText: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 21,
  },
  successBanner: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#052E16',
    borderWidth: 1,
    borderColor: '#166534',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  successText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '700',
  },
  formCard: {
    marginHorizontal: 20,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 24,
  },
  formSectionLabel: {
    color: '#6366F1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 16,
    marginTop: 4,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#0B0E14',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '500',
  },
  textInputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  chipRow: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  chip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ratingChip: {
    backgroundColor: '#1E293B',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  addedSection: {
    paddingHorizontal: 20,
  },
  addedSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  addedMovieCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 10,
  },
  addedMovieTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addedMovieTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingBadgeText: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '800',
  },
  addedMovieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#312E81',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  genreTagText: {
    color: '#A5B4FC',
    fontSize: 11,
    fontWeight: '700',
  },
  addedMovieDetail: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
});
