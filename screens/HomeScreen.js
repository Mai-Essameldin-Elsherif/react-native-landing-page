import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { getMovies } from '../src/services/api';
import { useTheme } from '../src/context/ThemeContext';
import CustomButton from '../src/components/CustomButton';
import CustomCard from '../src/components/CustomCard';
import LoadingSpinner from '../src/components/LoadingSpinner';

export default function HomeScreen() {
  const { theme, toggleTheme, themeMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('Action');
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [apiMovies, setApiMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const categories = ['Action', 'Sci-Fi', 'Drama', 'Anime', 'Thriller', 'Documentary'];

  useEffect(() => {
    let isMounted = true;
    const fetchApiMovies = async () => {
      try {
        setLoadingMovies(true);
        const data = await getMovies(6);
        if (isMounted) {
          setApiMovies(data);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setLoadingMovies(false);
        }
      }
    };

    fetchApiMovies();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.cardBorder }]}>
          <View style={styles.brandRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&auto=format&fit=crop&q=80',
              }}
              style={styles.logoImage}
            />
            <Text style={[styles.brandTitle, { color: theme.text }]}>CINEVERSE</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>

          <View style={styles.headerActionRow}>
            <TouchableOpacity
              style={[styles.themeToggleButton, { backgroundColor: theme.chipBg, borderColor: theme.cardBorder }]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={[styles.themeToggleText, { color: theme.text }]}>
                {themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: theme.chipBg, borderColor: theme.cardBorder }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.loginButtonText, { color: theme.text }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ NEXT-GEN STREAMING PLATFORM</Text>
          </View>

          <Text style={[styles.heroTitle, { color: theme.text }]}>Experience Cinema Without Limits</Text>
          <Text style={[styles.heroDescription, { color: theme.textMuted }]}>
            Stream thousands of 4K Ultra HD movies, award-winning series, and exclusive live events directly on all your favorite devices.
          </Text>

          <View style={styles.heroBannerContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1000&auto=format&fit=crop&q=80',
              }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlayBadge}>
              <Text style={styles.overlayTitle}>NEW RELEASE</Text>
              <Text style={styles.overlaySubtitle}>Starlight: Beyond Horizons (4K)</Text>
            </View>
          </View>

          <CustomCard style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10M+</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>Active Viewers</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9 ★</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>User Rating</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4K HDR</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>Dolby Sound</Text>
            </View>
          </CustomCard>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCategory}>AXIOS LIVE STREAM API</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Axios Titles</Text>
        </View>

        {loadingMovies ? (
          <LoadingSpinner message="Fetching Axios HTTP movies..." />
        ) : (
          <View style={styles.apiGrid}>
            {apiMovies.map((movie) => (
              <CustomCard key={movie.id} style={styles.apiCard}>
                <View style={styles.apiCardHeader}>
                  <Text style={styles.apiBadge}>ID #{movie.id}</Text>
                  <Text style={styles.apiRating}>★ 4.9</Text>
                </View>
                <Text style={[styles.apiTitle, { color: theme.text }]} numberOfLines={1}>
                  {movie.title}
                </Text>
                <Text style={[styles.apiBody, { color: theme.textMuted }]} numberOfLines={2}>
                  {movie.body}
                </Text>
              </CustomCard>
            ))}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCategory}>CATEGORIES</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore Trending Genres</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.categoryChip,
                  { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
                  isActive && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: theme.textMuted },
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionCategory}>WHY CHOOSE US</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Unmatched Entertainment Features</Text>
          </View>

          <View style={styles.featuresGrid}>
            <CustomCard style={styles.featureCardPadding}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={[styles.featureCardTitle, { color: theme.text }]}>Ultra HD & Spatial Sound</Text>
                <Text style={[styles.featureCardDesc, { color: theme.textMuted }]}>
                  Immerse yourself with crystal-clear 4K HDR resolution and Dolby Atmos surround acoustics.
                </Text>
              </View>
            </CustomCard>

            <CustomCard style={styles.featureCardPadding}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={[styles.featureCardTitle, { color: theme.text }]}>AI Smart Movie Curator</Text>
                <Text style={[styles.featureCardDesc, { color: theme.textMuted }]}>
                  Engineered recommendations that adapt to your personal mood, watch history, and preference.
                </Text>
              </View>
            </CustomCard>
          </View>
        </View>

        <View style={styles.ctaCard}>
          <View style={styles.ctaHeaderRow}>
            <View style={styles.ctaBadge}>
              <Text style={styles.ctaBadgeText}>SPECIAL OFFER</Text>
            </View>
          </View>

          <Text style={styles.ctaTitle}>Start Your 30-Day Free Trial</Text>
          <Text style={styles.ctaSubtitle}>
            Unlock instant access to the world's largest streaming library. Cancel anytime with a single tap.
          </Text>

          <View style={styles.planToggleRow}>
            <Pressable
              onPress={() => setSelectedPlan('monthly')}
              style={[
                styles.planOption,
                selectedPlan === 'monthly' && styles.planOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.planOptionText,
                  selectedPlan === 'monthly' && styles.planOptionTextActive,
                ]}
              >
                Monthly ($9.99/mo)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedPlan('yearly')}
              style={[
                styles.planOption,
                selectedPlan === 'yearly' && styles.planOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.planOptionText,
                  selectedPlan === 'yearly' && styles.planOptionTextActive,
                ]}
              >
                Annual ($79.99/yr)
              </Text>
            </Pressable>
          </View>

          <CustomButton
            title="Get Started Now"
            variant="primary"
            size="large"
            style={styles.customCtaBtn}
          />
        </View>

        <View style={[styles.footer, { borderTopColor: theme.cardBorder }]}>
          <View style={styles.footerBrandRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&auto=format&fit=crop&q=80',
              }}
              style={styles.footerLogo}
            />
            <Text style={[styles.footerBrandText, { color: theme.textMuted }]}>CINEVERSE MOBILE</Text>
          </View>

          <Text style={[styles.copyrightText, { color: theme.textMuted }]}>
            © 2026 CineVerse Mobile Inc. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 34,
    height: 34,
    borderRadius: 8,
    marginRight: 10,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  proBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  headerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  themeToggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  loginButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  loginButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: 'flex-start',
  },
  tagBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    marginBottom: 16,
  },
  tagBadgeText: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 24,
  },
  heroBannerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 24,
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  overlayTitle: {
    color: '#6366F1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  overlaySubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38BDF8',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 28,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionCategory: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  apiGrid: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  apiCard: {
    marginBottom: 12,
  },
  apiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  apiBadge: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '800',
  },
  apiRating: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
  },
  apiTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  apiBody: {
    fontSize: 12,
    lineHeight: 18,
  },
  categoryScroll: {
    marginBottom: 28,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresGrid: {
    paddingHorizontal: 20,
  },
  featureCardPadding: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureCardImage: {
    width: '100%',
    height: 140,
  },
  featureCardBody: {
    padding: 16,
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  featureCardDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  ctaCard: {
    marginHorizontal: 20,
    backgroundColor: '#1E1B4B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#4338CA',
    alignItems: 'center',
    marginBottom: 32,
  },
  ctaHeaderRow: {
    marginBottom: 12,
  },
  ctaBadge: {
    backgroundColor: '#312E81',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ctaBadgeText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: '#C7D2FE',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  planToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#312E81',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    width: '100%',
  },
  planOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planOptionActive: {
    backgroundColor: '#4F46E5',
  },
  planOptionText: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '600',
  },
  planOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  customCtaBtn: {
    width: '100%',
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
  },
  footerBrandText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  copyrightText: {
    fontSize: 11,
    fontWeight: '400',
  },
});
