import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SectionList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const INITIAL_MOVIES = [
  { id: '1', title: 'Inception', genre: 'Sci-Fi', rating: '9.0', year: '2010' },
  { id: '2', title: 'The Dark Knight', genre: 'Action', rating: '9.5', year: '2008' },
  { id: '3', title: 'Interstellar', genre: 'Sci-Fi', rating: '8.6', year: '2014' },
  { id: '4', title: 'Parasite', genre: 'Thriller', rating: '8.5', year: '2019' },
  { id: '5', title: 'The Godfather', genre: 'Drama', rating: '9.2', year: '1972' },
  { id: '6', title: 'Spirited Away', genre: 'Anime', rating: '8.6', year: '2001' },
  { id: '7', title: 'Mad Max: Fury Road', genre: 'Action', rating: '8.1', year: '2015' },
  { id: '8', title: 'Get Out', genre: 'Horror', rating: '7.8', year: '2017' },
];

const SECTION_DATA = [
  {
    sectionId: 'trending',
    title: '🔥 Trending Now',
    data: [
      { id: 't1', title: 'Oppenheimer', stat: '4.8M views this week', genre: 'Drama' },
      { id: 't2', title: 'Dune: Part Two', stat: '3.2M views this week', genre: 'Sci-Fi' },
      { id: 't3', title: 'Poor Things', stat: '2.1M views this week', genre: 'Drama' },
    ],
  },
  {
    sectionId: 'new',
    title: '✨ New Arrivals',
    data: [
      { id: 'n1', title: 'Alien: Romulus', stat: 'Added 3 days ago', genre: 'Sci-Fi' },
      { id: 'n2', title: 'Longlegs', stat: 'Added 1 week ago', genre: 'Thriller' },
      { id: 'n3', title: 'The Substance', stat: 'Added 2 weeks ago', genre: 'Horror' },
    ],
  },
  {
    sectionId: 'classics',
    title: '🏆 All-Time Classics',
    data: [
      { id: 'c1', title: 'Schindler\'s List', stat: 'IMDb Top 10', genre: 'Drama' },
      { id: 'c2', title: '2001: A Space Odyssey', stat: 'IMDb Top 20', genre: 'Sci-Fi' },
      { id: 'c3', title: 'Pulp Fiction', stat: 'IMDb Top 10', genre: 'Thriller' },
    ],
  },
];

const QUICK_FILTERS = ['All', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Anime', 'Horror'];

export default function ExploreScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loadTime, setLoadTime] = useState(null);

  useEffect(() => {
    const start = Date.now();
    const timer = setTimeout(() => {
      setMovies(INITIAL_MOVIES);
      setLoading(false);
      setLoadTime(Date.now() - start);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredMovies =
    activeFilter === 'All'
      ? movies
      : movies.filter((m) => m.genre === activeFilter);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={styles.headerSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ DISCOVER & EXPLORE</Text>
          </View>
          <Text style={styles.screenTitle}>Movie Catalog</Text>
          <Text style={styles.screenSubtitle}>
            Browse thousands of curated titles across all genres.
          </Text>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionLabel}>QUICK FILTERS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {QUICK_FILTERS.map((f) => (
              <Pressable
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === f && styles.filterChipTextActive,
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.flatListSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>MOVIE LIST</Text>
            {loadTime && (
              <Text style={styles.loadTimeText}>Loaded in {loadTime}ms</Text>
            )}
          </View>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'All' ? 'All Movies' : activeFilter} ({filteredMovies.length})
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6366F1" />
              <Text style={styles.loadingText}>Fetching catalog...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.movieRow} activeOpacity={0.7}>
                  <View style={styles.movieRankBox}>
                    <Text style={styles.movieRank}>#{index + 1}</Text>
                  </View>
                  <View style={styles.movieInfo}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <View style={styles.movieMeta}>
                      <View style={styles.genreTag}>
                        <Text style={styles.genreTagText}>{item.genre}</Text>
                      </View>
                      <Text style={styles.movieYear}>{item.year}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingStar}>★</Text>
                    <Text style={styles.ratingValue}>{item.rating}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No movies found for this genre.</Text>
                </View>
              }
            />
          )}
        </View>

        <View style={styles.sectionListSection}>
          <Text style={styles.sectionLabel}>CURATED COLLECTIONS</Text>
          <Text style={styles.sectionTitle}>Browse by Category</Text>

          <SectionList
            sections={SECTION_DATA}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.sectionMovieCard} activeOpacity={0.75}>
                <View style={styles.sectionMovieLeft}>
                  <Text style={styles.sectionMovieTitle}>{item.title}</Text>
                  <Text style={styles.sectionMovieStat}>{item.stat}</Text>
                </View>
                <View style={styles.genreTagSmall}>
                  <Text style={styles.genreTagSmallText}>{item.genre}</Text>
                </View>
              </TouchableOpacity>
            )}
            SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          />
        </View>
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
  filterSection: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  sectionLabel: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterRow: {
    paddingHorizontal: 20,
  },
  filterChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  filterChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  filterChipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  flatListSection: {
    marginBottom: 32,
  },
  loadTimeText: {
    color: '#4ADE80',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 12,
  },
  movieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  movieRankBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  movieRank: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '800',
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreTag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  genreTagText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  movieYear: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '500',
  },
  ratingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  ratingBaseline: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingValue: {
    color: '#FCD34D',
    fontSize: 15,
    fontWeight: '800',
  },
  ratingMax: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '500',
  },
  ratingStr: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  ratingStar: {
    color: '#FCD34D',
    fontSize: 12,
    marginBottom: 1,
  },
  emptyContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#111827',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  emptyText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionListSection: {
    paddingBottom: 10,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#1E1B4B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#312E81',
  },
  sectionHeaderText: {
    color: '#A5B4FC',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sectionMovieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  sectionMovieLeft: {
    flex: 1,
    marginRight: 8,
  },
  sectionMovieTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionMovieStat: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  genreTagSmall: {
    backgroundColor: '#312E81',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  genreTagSmallText: {
    color: '#A5B4FC',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionSeparator: {
    height: 8,
  },
});
