import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Action');
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [btnPressed, setBtnPressed] = useState(false);

  const categories = ['Action', 'Sci-Fi', 'Drama', 'Anime', 'Thriller', 'Documentary'];

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&auto=format&fit=crop&q=80',
              }}
              style={styles.logoImage}
            />
            <Text style={styles.brandTitle}>CINEVERSE</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.7}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>✦ NEXT-GEN STREAMING PLATFORM</Text>
          </View>

          <Text style={styles.heroTitle}>Experience Cinema Without Limits</Text>
          <Text style={styles.heroDescription}>
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

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10M+</Text>
              <Text style={styles.statLabel}>Active Viewers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9 ★</Text>
              <Text style={styles.statLabel}>User Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4K HDR</Text>
              <Text style={styles.statLabel}>Dolby Sound</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCategory}>CATEGORIES</Text>
          <Text style={styles.sectionTitle}>Explore Trending Genres</Text>
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
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
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
            <Text style={styles.sectionTitle}>Unmatched Entertainment Features</Text>
          </View>

          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={styles.featureCardTitle}>Ultra HD & Spatial Sound</Text>
                <Text style={styles.featureCardDesc}>
                  Immerse yourself with crystal-clear 4K HDR resolution and Dolby Atmos surround acoustics.
                </Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={styles.featureCardTitle}>AI Smart Movie Curator</Text>
                <Text style={styles.featureCardDesc}>
                  Engineered recommendations that adapt to your personal mood, watch history, and preference.
                </Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={styles.featureCardTitle}>Offline Download & Sync</Text>
                <Text style={styles.featureCardDesc}>
                  Download movies seamlessly and enjoy uninterrupted playback on flights or remote trips.
                </Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1518173946687-a4c8a383592e?w=500&auto=format&fit=crop&q=80',
                }}
                style={styles.featureCardImage}
              />
              <View style={styles.featureCardBody}>
                <Text style={styles.featureCardTitle}>Exclusive World Premieres</Text>
                <Text style={styles.featureCardDesc}>
                  Gain VIP early access to red-carpet movie premieres and exclusive original productions.
                </Text>
              </View>
            </View>
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

          <TouchableOpacity
            style={[styles.ctaButton, btnPressed && styles.ctaButtonPressed]}
            activeOpacity={0.8}
            onPressIn={() => setBtnPressed(true)}
            onPressOut={() => setBtnPressed(false)}
          >
            <Text style={styles.ctaButtonText}>Get Started Now</Text>
          </TouchableOpacity>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Browse Full Catalog →</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerBrandRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&auto=format&fit=crop&q=80',
              }}
              style={styles.footerLogo}
            />
            <Text style={styles.footerBrandText}>CINEVERSE MOBILE</Text>
          </View>

          <View style={styles.footerLinksRow}>
            <TouchableOpacity style={styles.footerLinkTouch}>
              <Text style={styles.footerLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity style={styles.footerLinkTouch}>
              <Text style={styles.footerLinkText}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity style={styles.footerLinkTouch}>
              <Text style={styles.footerLinkText}>Support</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>
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
    backgroundColor: '#0B0E14',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
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
    borderBottomColor: '#1F2937',
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
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  proBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  loginButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  loginButtonText: {
    color: '#F8FAFC',
    fontSize: 13,
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
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 40,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#94A3B8',
    lineHeight: 23,
    marginBottom: 24,
  },
  heroBannerContainer: {
    width: '100%',
    height: 220,
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
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 32,
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
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#1F2937',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
    color: '#FFFFFF',
  },
  categoryScroll: {
    marginBottom: 32,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  categoryChipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresGrid: {
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    flexDirection: 'column',
  },
  featureCardImage: {
    width: '100%',
    height: 140,
  },
  featureCardBody: {
    padding: 16,
  },
  featureCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  featureCardDesc: {
    fontSize: 13,
    fontWeight: '400',
    color: '#94A3B8',
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
    marginBottom: 40,
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
    fontSize: 24,
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
  ctaButton: {
    width: '100%',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  ctaButtonPressed: {
    backgroundColor: '#4F46E5',
    transform: [{ scale: 0.98 }],
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#A5B4FC',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    paddingTop: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
  },
  footerBrandText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLinkTouch: {
    paddingHorizontal: 4,
  },
  footerLinkText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  footerDot: {
    color: '#334155',
    marginHorizontal: 8,
    fontSize: 10,
  },
  copyrightText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '400',
  },
});
