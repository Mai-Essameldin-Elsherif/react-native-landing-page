import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { addMovieApi, updateMovieApi, deleteMovieApi } from '../src/services/api';
import { useTheme } from '../src/context/ThemeContext';
import CustomButton from '../src/components/CustomButton';
import CustomCard from '../src/components/CustomCard';
import CustomInput from '../src/components/CustomInput';
import LoadingSpinner from '../src/components/LoadingSpinner';

const GENRES = ['Action', 'Sci-Fi', 'Drama', 'Anime', 'Thriller', 'Documentary', 'Comedy', 'Horror'];
const RATINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function AddMovieScreen() {
  const { theme } = useTheme();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [addedMovies, setAddedMovies] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Movie Title is required';
    if (!genre) newErrors.genre = 'Please select a genre';
    if (!rating) newErrors.rating = 'Please select a rating';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const moviePayload = { title, genre, rating, director, year };

      if (editingId) {
        await updateMovieApi(editingId, moviePayload);
        setAddedMovies((prev) =>
          prev.map((m) => (m.id === editingId ? { ...m, ...moviePayload } : m))
        );
        setEditingId(null);
      } else {
        const responseData = await addMovieApi(moviePayload);
        const newMovie = {
          id: responseData.id ? responseData.id.toString() : Date.now().toString(),
          ...moviePayload,
        };
        setAddedMovies((prev) => [newMovie, ...prev]);
      }

      setTitle('');
      setGenre('');
      setRating('');
      setDirector('');
      setYear('');
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      Alert.alert('Error', 'Failed to communicate with Axios server.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
    setRating(movie.rating);
    setDirector(movie.director || '');
    setYear(movie.year || '');
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovieApi(id);
      setAddedMovies((prev) => prev.filter((m) => m.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTitle('');
        setGenre('');
        setRating('');
        setDirector('');
        setYear('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete movie from Axios server.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ AXIOS HTTP POST / PUT / DELETE</Text>
          </View>
          <Text style={[styles.screenTitle, { color: theme.text }]}>
            {editingId ? 'Edit Movie (Axios PUT)' : 'Add a New Movie'}
          </Text>
          <Text style={[styles.screenSubtitle, { color: theme.textMuted }]}>
            Submit your favorite films to enrich the CineVerse community catalog via Axios instance.
          </Text>
        </View>

        {submitted && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>
              ✓ Movie {editingId ? 'updated' : 'added'} successfully via Axios HTTP request!
            </Text>
          </View>
        )}

        <CustomCard style={styles.formCard}>
          <Text style={styles.formSectionLabel}>REQUIRED DETAILS</Text>

          <CustomInput
            label="Movie Title *"
            placeholder="e.g. Interstellar"
            value={title}
            onChangeText={(val) => {
              setTitle(val);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
            error={errors.title}
          />

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: theme.text }]}>Genre *</Text>
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
                  style={[
                    styles.chip,
                    { backgroundColor: theme.chipBg, borderColor: theme.cardBorder },
                    genre === g && styles.chipActive,
                  ]}
                >
                  <Text style={[styles.chipText, { color: theme.textMuted }, genre === g && styles.chipTextActive]}>
                    {g}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            {errors.genre && <Text style={styles.errorText}>{errors.genre}</Text>}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: theme.text }]}>Rating (1–10) *</Text>
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
                  style={[
                    styles.ratingChip,
                    { backgroundColor: theme.chipBg, borderColor: theme.cardBorder },
                    rating === r && styles.ratingChipActive,
                  ]}
                >
                  <Text style={[styles.chipText, { color: theme.textMuted }, rating === r && styles.chipTextActive]}>
                    {r}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
          </View>

          <Text style={styles.formSectionLabel}>OPTIONAL DETAILS</Text>

          <CustomInput
            label="Director"
            placeholder="e.g. Christopher Nolan"
            value={director}
            onChangeText={setDirector}
          />

          <CustomInput
            label="Release Year"
            placeholder="e.g. 2014"
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
            maxLength={4}
          />

          {submitting ? (
            <LoadingSpinner message="Sending Axios request..." />
          ) : (
            <CustomButton
              title={editingId ? 'Update Movie (Axios PUT) →' : 'Submit Movie (Axios POST) →'}
              variant="primary"
              size="medium"
              onPress={handleSubmit}
            />
          )}
        </CustomCard>

        {addedMovies.length > 0 && (
          <View style={styles.addedSection}>
            <Text style={[styles.addedSectionTitle, { color: theme.text }]}>Catalog Items (Axios Synced)</Text>
            {addedMovies.map((movie) => (
              <CustomCard key={movie.id} style={styles.addedMovieCard}>
                <View style={styles.addedMovieTop}>
                  <Text style={[styles.addedMovieTitle, { color: theme.text }]}>{movie.title}</Text>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>★ {movie.rating}</Text>
                  </View>
                </View>

                <View style={styles.addedMovieMeta}>
                  <View style={styles.genreTag}>
                    <Text style={styles.genreTagText}>{movie.genre}</Text>
                  </View>
                  {movie.director ? (
                    <Text style={[styles.addedMovieDetail, { color: theme.textMuted }]}>
                      Dir. {movie.director}
                    </Text>
                  ) : null}
                  {movie.year ? (
                    <Text style={[styles.addedMovieDetail, { color: theme.textMuted }]}>
                      {movie.year}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleEdit(movie)}
                  >
                    <Text style={styles.actionBtnText}>✏️ Edit (PUT)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(movie.id)}
                  >
                    <Text style={styles.actionBtnText}>🗑 Delete</Text>
                  </TouchableOpacity>
                </View>
              </CustomCard>
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
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 14,
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
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
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
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ratingChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  addedSection: {
    paddingHorizontal: 20,
  },
  addedSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  addedMovieCard: {
    marginBottom: 12,
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
    marginBottom: 12,
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
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10,
  },
  editBtn: {
    backgroundColor: '#312E81',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
