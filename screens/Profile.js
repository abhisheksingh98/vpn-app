import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// hardcoded plan data instead of coming from a store
const PLAN_DATA = {
  name: 'Premium',
  expires: 'April 18, 2027',
  devices: 5,
  devicesUsed: 2,
  bandwidth: 'Unlimited',
};

const BADGES = [
  { icon: '🛡️', label: '1 Year Protected' },
  { icon: '⚡', label: 'Power User' },
  { icon: '🌍', label: 'Global Traveler' },
];

const Profile = ({ navigation }) => {
  const [profileData] = useState({
    name: 'Abhishek Singh',
    email: 'abhishek@example.com',
    joinDate: 'January 2024',
    totalSessions: 142,
    totalData: '48.6 GB',
  });

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const renderInfoRow = (label, value) => {
    return (
      <View style={styles.infoRow}>
        <Text style={{ fontSize: 13, color: '#888' }}>{label}</Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>{value}</Text>
      </View>
    );
  };

  const { name, email, joinDate, totalSessions, totalData } = profileData;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* avatar header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 36, fontWeight: '700', color: '#fff' }}>
              {name.charAt(0)}
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#000', marginTop: 12 }}>{name}</Text>
          <Text style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{email}</Text>
          <View style={styles.premiumBadge}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#fff' }}>⭐ {PLAN_DATA.name}</Text>
          </View>
        </View>

        {/* badges */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, marginTop: 4 }}>
          {BADGES.map((b, i) => (
            <View key={i} style={[styles.badge, i > 0 && { marginLeft: 10 }]}>
              <Text style={{ fontSize: 20 }}>{b.icon}</Text>
              <Text style={{ fontSize: 10, color: '#555', marginTop: 4, textAlign: 'center' }}>{b.label}</Text>
            </View>
          ))}
        </View>

        {/* plan info */}
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <Text style={styles.sectionLabel}>YOUR PLAN</Text>
          <View style={styles.card}>
            {renderInfoRow('Plan', PLAN_DATA.name)}
            <View style={styles.divider} />
            {renderInfoRow('Expires', PLAN_DATA.expires)}
            <View style={styles.divider} />
            {renderInfoRow('Bandwidth', PLAN_DATA.bandwidth)}
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={{ fontSize: 13, color: '#888' }}>Devices</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
                  {PLAN_DATA.devicesUsed}/{PLAN_DATA.devices}
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                  {Array.from({ length: PLAN_DATA.devices }).map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginLeft: 2,
                        backgroundColor: i < PLAN_DATA.devicesUsed ? '#0094FC' : '#ddd',
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
              style={{ paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center' }}
              onPress={() => Alert.alert('Upgrade', 'This would open upgrade flow')}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#0094FC' }}>Upgrade Plan →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <Text style={styles.sectionLabel}>LIFETIME STATS</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Text style={{ fontSize: 11, color: '#888' }}>MEMBER SINCE</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000', marginTop: 6 }}>{joinDate}</Text>
            </View>
            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Text style={{ fontSize: 11, color: '#888' }}>TOTAL SESSIONS</Text>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#0094FC', marginTop: 6 }}>{totalSessions}</Text>
            </View>
          </View>
          <View style={[styles.statCard, { marginTop: 12 }]}>
            <Text style={{ fontSize: 11, color: '#888' }}>TOTAL DATA PROTECTED</Text>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#4CAF50', marginTop: 6 }}>{totalData}</Text>
          </View>
        </View>

        {/* account actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.actionRow}>
              <Text style={{ fontSize: 15, color: '#000' }}>Edit Profile</Text>
              <Text style={{ color: '#aaa' }}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.actionRow}>
              <Text style={{ fontSize: 15, color: '#000' }}>Change Password</Text>
              <Text style={{ color: '#aaa' }}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.actionRow}>
              <Text style={{ fontSize: 15, color: '#000' }}>Privacy Policy</Text>
              <Text style={{ color: '#aaa' }}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.actionRow}>
              <Text style={{ fontSize: 15, color: '#000' }}>Terms of Service</Text>
              <Text style={{ color: '#aaa' }}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.actionRow} onPress={handleLogout}>
              <Text style={{ fontSize: 15, color: '#F44336', fontWeight: '600' }}>Sign Out</Text>
              <Text style={{ color: '#F44336' }}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ textAlign: 'center', fontSize: 12, color: '#ccc', marginBottom: 20 }}>VPN App v1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0094FC',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0094FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  premiumBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 10,
  },
  badge: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
