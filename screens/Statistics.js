import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const W = Dimensions.get('window').width;

// fake session history — hardcoded copy paste
const HISTORY = [
  { id: 'h1', server: 'New York, NY', date: 'Today, 10:42 AM', duration: '1h 23m', downloaded: '1.2 GB', uploaded: '234 MB', flag: '🇺🇸' },
  { id: 'h2', server: 'London', date: 'Today, 08:15 AM', duration: '45m', downloaded: '580 MB', uploaded: '98 MB', flag: '🇬🇧' },
  { id: 'h3', server: 'Stockholm', date: 'Yesterday, 11:30 PM', duration: '2h 10m', downloaded: '3.4 GB', uploaded: '450 MB', flag: '🇸🇪' },
  { id: 'h4', server: 'Singapore', date: 'Yesterday, 06:00 PM', duration: '30m', downloaded: '210 MB', uploaded: '45 MB', flag: '🇸🇬' },
  { id: 'h5', server: 'New York, NY', date: 'Mar 16, 09:00 AM', duration: '3h 05m', downloaded: '4.8 GB', uploaded: '720 MB', flag: '🇺🇸' },
  { id: 'h6', server: 'Melbourne', date: 'Mar 15, 11:00 PM', duration: '55m', downloaded: '890 MB', uploaded: '123 MB', flag: '🇦🇺' },
  { id: 'h7', server: 'Moscow', date: 'Mar 15, 07:30 AM', duration: '1h 40m', downloaded: '2.1 GB', uploaded: '310 MB', flag: '🇷🇺' },
];

// fake daily data for a bar chart — just heights
const DAILY = [
  { day: 'Mon', dl: 1.2, ul: 0.3 },
  { day: 'Tue', dl: 3.4, ul: 0.6 },
  { day: 'Wed', dl: 0.8, ul: 0.1 },
  { day: 'Thu', dl: 4.8, ul: 1.2 },
  { day: 'Fri', dl: 2.1, ul: 0.4 },
  { day: 'Sat', dl: 5.6, ul: 1.8 },
  { day: 'Sun', dl: 1.9, ul: 0.5 },
];
const MAX_DL = Math.max(...DAILY.map(d => d.dl));
const BAR_MAX_H = 80;

export default class Statistics extends Component {

  state = {
    tab: 'week', // week | month | all
  };

  getTotalDownload() {
    return HISTORY.reduce((acc, h) => {
      const n = parseFloat(h.downloaded);
      const unit = h.downloaded.includes('GB') ? 1 : 0.001;
      return acc + n * unit;
    }, 0).toFixed(1);
  }

  getTotalUpload() {
    return HISTORY.reduce((acc, h) => {
      const n = parseFloat(h.uploaded);
      const unit = h.uploaded.includes('GB') ? 1 : 0.001;
      return acc + n * unit;
    }, 0).toFixed(2);
  }

  render() {
    const { tab } = this.state;
    const totalDL = this.getTotalDownload();
    const totalUL = this.getTotalUpload();

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: '#000' }}>Statistics</Text>
            <Text style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Your VPN usage summary</Text>
          </View>

          {/* summary cards */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 }}>
            <View style={[styles.summaryCard, { marginRight: 8, backgroundColor: '#0094FC' }]}>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>TOTAL DOWNLOADED</Text>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 6 }}>{totalDL} GB</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>This week</Text>
            </View>
            <View style={[styles.summaryCard, { marginLeft: 8, backgroundColor: '#4CAF50' }]}>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>TOTAL UPLOADED</Text>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 6 }}>{totalUL} GB</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>This week</Text>
            </View>
          </View>

          {/* total sessions */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 }}>
            <View style={[styles.miniCard, { marginRight: 8 }]}>
              <Text style={{ fontSize: 11, color: '#888' }}>SESSIONS</Text>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#000', marginTop: 4 }}>{HISTORY.length}</Text>
            </View>
            <View style={[styles.miniCard, { marginHorizontal: 8 }]}>
              <Text style={{ fontSize: 11, color: '#888' }}>AVG SESSION</Text>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#000', marginTop: 4 }}>1h 18m</Text>
            </View>
            <View style={[styles.miniCard, { marginLeft: 8 }]}>
              <Text style={{ fontSize: 11, color: '#888' }}>TOP SERVER</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#000', marginTop: 4 }}>New York</Text>
            </View>
          </View>

          {/* bar chart area */}
          <View style={[styles.card, { marginHorizontal: 20, marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>Daily Usage</Text>
              <View style={{ flexDirection: 'row' }}>
                {['week', 'month', 'all'].map(t => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => this.setState({ tab: t })}
                    style={[styles.tabChip, tab == t && { backgroundColor: '#0094FC' }]}
                  >
                    <Text style={{ fontSize: 11, color: tab == t ? '#fff' : '#888', fontWeight: '600' }}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* manual bar chart — no chart library */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: BAR_MAX_H + 30 }}>
              {DAILY.map((d, i) => {
                const dlH = (d.dl / MAX_DL) * BAR_MAX_H;
                const ulH = (d.ul / MAX_DL) * BAR_MAX_H;
                return (
                  <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: BAR_MAX_H }}>
                      <View style={{ width: 8, height: dlH, backgroundColor: '#0094FC', borderRadius: 4, marginRight: 2 }} />
                      <View style={{ width: 8, height: ulH, backgroundColor: '#4CAF50', borderRadius: 4 }} />
                    </View>
                    <Text style={{ fontSize: 10, color: '#888', marginTop: 6 }}>{d.day}</Text>
                  </View>
                );
              })}
            </View>

            {/* legend */}
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#0094FC', marginRight: 4 }} />
                <Text style={{ fontSize: 12, color: '#888' }}>Download</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#4CAF50', marginRight: 4 }} />
                <Text style={{ fontSize: 12, color: '#888' }}>Upload</Text>
              </View>
            </View>
          </View>

          {/* session history */}
          <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#000', marginBottom: 12 }}>Session History</Text>
            {HISTORY.map(h => (
              <View key={h.id} style={styles.historyRow}>
                <Text style={{ fontSize: 26 }}>{h.flag}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>{h.server}</Text>
                  <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{h.date} · {h.duration}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 12, color: '#0094FC' }}>⬇ {h.downloaded}</Text>
                  <Text style={{ fontSize: 12, color: '#4CAF50', marginTop: 3 }}>⬆ {h.uploaded}</Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  miniCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  tabChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 4,
    backgroundColor: '#f0f0f0',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
});
