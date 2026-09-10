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
} from 'react-native';
import { getMovies } from '../src/services/api';
import { useTheme } from '../src/context/ThemeContext';
import CustomCard from '../src/components/CustomCard';
import LoadingSpinner from '../src/components/LoadingSpinner';

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
  const { theme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loadTime, setLoadTime] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const start = Date.now();

    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const data = await getMovies(10);
        if (isMounted) {
          const mappedMovies = data.map((item, index) => ({
            id: item.id.toString(),
            title: item.title,
            genre: ['Sci-Fi', 'Action', 'Drama', 'Thriller', 'Anime', 'Horror'][index % 6],
            rating: (8.0 + (index % 15) * 0.1).toFixed(1),
            year: (2010 + index).toString(),
          }));
          setMovies(mappedMovies);
          setLoadTime(Date.now() - start);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMovies =
    activeFilter === 'All'
      ? movies
      : movies.filter((m) => m.genre === activeFilter);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <View style={styles.headerSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ AXIOS GET CATALOG & FILTERS</Text>
          </View>
          <Text style={[styles.screenTitle, { color: theme.text }]}>Movie Catalog</Text>
          <Text style={[styles.screenSubtitle, { color: theme.textMuted }]}>
            Browse thousands of curated titles fetched via Axios instance with useEffect.
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
                style={[
                  styles.filterChip,
                  { backgroundColor: theme.chipBg, borderColor: theme.cardBorder },
                  activeFilter === f && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: theme.textMuted },
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
            <Text style={styles.sectionLabel}>MOVIE LIST (AXIOS GET)</Text>
            {loadTime && (
              <Text style={styles.loadTimeText}>Axios loaded in {loadTime}ms</Text>
            )}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {activeFilter === 'All' ? 'All Movies' : activeFilter} ({filteredMovies.length})
          </Text>

          {loading ? (
            <LoadingSpinner message="Fetching Axios Movie Catalog..." />
          ) : (
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity activeOpacity={0.75}>
                  <CustomCard style={styles.movieRow}>
                    <View style={styles.movieRankBox}>
                      <Text style={styles.movieRank}>#{index + 1}</Text>
                    </View>
                    <View style={styles.movieInfo}>
                      <Text style={[styles.movieTitle, { color: theme.text }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <View style={styles.movieMeta}>
                        <View style={styles.genreTag}>
                          <Text style={styles.genreTagText}>{item.genre}</Text>
                        </View>
                        <Text style={[styles.movieYear, { color: theme.textMuted }]}>{item.year}</Text>
                      </View>
                    </View>
                    <View style={styles.ratingBox}>
                      <Text style={styles.ratingStar}>★</Text>
                      <Text style={styles.ratingValue}>{item.rating}</Text>
                    </View>
                  </CustomCard>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <CustomCard style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                    No movies found for this genre.
                  </Text>
                </CustomCard>
              }
            />
          )}
        </View>

        <View style={styles.sectionListSection}>
          <Text style={styles.sectionLabel}>CURATED COLLECTIONS</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Browse by Category</Text>

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
              <TouchableOpacity activeOpacity={0.75}>
                <CustomCard style={styles.sectionMovieCard}>
                  <View style={styles.sectionMovieLeft}>
                    <Text style={[styles.sectionMovieTitle, { color: theme.text }]}>{item.title}</Text>
                    <Text style={[styles.sectionMovieStat, { color: theme.textMuted }]}>{item.stat}</Text>
                  </View>
                  <View style={styles.genreTagSmall}>
                    <Text style={styles.genreTagSmallText}>{item.genre}</Text>
                  </View>
                </CustomCard>
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
  filterSection: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
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
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterRow: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  filterChipText: {
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
  },
  movieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
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
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
    textTransform: 'capitalize',
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
    fontSize: 12,
    fontWeight: '500',
  },
  ratingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  ratingValue: {
    color: '#FCD34D',
    fontSize: 15,
    fontWeight: '800',
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
  },
  emptyText: {
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
    padding: 14,
  },
  sectionMovieLeft: {
    flex: 1,
    marginRight: 8,
  },
  sectionMovieTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionMovieStat: {
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
