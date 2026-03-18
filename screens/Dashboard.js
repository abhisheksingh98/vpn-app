import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

const { icons } = images;
const W = Dimensions.get('window').width;

// all hardcoded, no theme
const BLUE = '#0094FC';
const GRAY = '#888';
const GREEN = '#4CAF50';
const RED = '#F44336';
const WHITE = '#fff';
const BLACK = '#000';

export default class Dashboard extends Component {

  state = {
    connected: false,
    server: 'New York, NY',
    ip: '185.220.101.45',
    uploadSpeed: '2.4 MB/s',
    downloadSpeed: '18.7 MB/s',
    sessionTime: 0,
    dataSent: 0,
    dataReceived: 0,
    killSwitch: true,
    timer: null,
  };

  componentDidMount() {
    // start timer if somehow connected
    if (this.state.connected) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  startTimer() {
    const timer = setInterval(() => {
      this.setState(prev => ({
        sessionTime: prev.sessionTime + 1,
        dataSent: prev.dataSent + Math.random() * 0.05,
        dataReceived: prev.dataReceived + Math.random() * 0.2,
      }));
    }, 1000);
    this.setState({ timer });
  }

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({ timer: null, sessionTime: 0, dataSent: 0, dataReceived: 0 });
  }

  toggleConnect() {
    const { connected } = this.state;
    if (connected) {
      this.stopTimer();
      this.setState({ connected: false, ip: '185.220.101.45' });
    } else {
      this.startTimer();
      this.setState({
        connected: true,
        ip: '10.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255) + '.1'
      });
    }
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  formatData(mb) {
    if (mb > 1024) return (mb / 1024).toFixed(2) + ' GB';
    return mb.toFixed(1) + ' MB';
  }

  render() {
    const { connected, server, ip, uploadSpeed, downloadSpeed, sessionTime, dataSent, dataReceived, killSwitch } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 22, fontWeight: '700', color: BLACK }}>Dashboard</Text>
              <Text style={{ fontSize: 13, color: GRAY }}>Monitor your VPN connection</Text>
            </View>
            <TouchableOpacity
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              <Text>👤</Text>
            </TouchableOpacity>
          </View>

          {/* big connection card */}
          <View style={styles.bigCard}>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.statusCircle, { borderColor: connected ? GREEN : '#ccc' }]}>
                <View style={[styles.innerCircle, { backgroundColor: connected ? GREEN : '#ddd' }]} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: connected ? GREEN : GRAY, marginTop: 8 }}>
                  {connected ? 'PROTECTED' : 'UNPROTECTED'}
                </Text>
              </View>

              <Text style={{ fontSize: 13, color: GRAY, marginTop: 12 }}>Current Server</Text>
              <Text style={{ fontSize: 17, fontWeight: '700', color: BLACK, marginTop: 4 }}>{server}</Text>
              <Text style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>IP: {ip}</Text>

              <TouchableOpacity
                style={[styles.connectBtn, { backgroundColor: connected ? RED : BLUE }]}
                onPress={() => this.toggleConnect()}
              >
                <Text style={{ color: WHITE, fontWeight: '700', fontSize: 15 }}>
                  {connected ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* stats row */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 16 }}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Text style={{ fontSize: 11, color: GRAY }}>SESSION TIME</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: BLACK, marginTop: 4 }}>{this.formatTime(sessionTime)}</Text>
            </View>
            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Text style={{ fontSize: 11, color: GRAY }}>CURRENT PING</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: connected ? GREEN : GRAY, marginTop: 4 }}>
                {connected ? Math.floor(Math.random() * 30 + 10) + ' ms' : '-- ms'}
              </Text>
            </View>
          </View>

          {/* speed row */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 12 }}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Text style={{ fontSize: 11, color: GRAY }}>⬆ UPLOAD</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: BLUE, marginTop: 4 }}>
                {connected ? uploadSpeed : '0 B/s'}
              </Text>
            </View>
            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Text style={{ fontSize: 11, color: GRAY }}>⬇ DOWNLOAD</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: BLUE, marginTop: 4 }}>
                {connected ? downloadSpeed : '0 B/s'}
              </Text>
            </View>
          </View>

          {/* data usage */}
          <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
            <View style={styles.dataCard}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: BLACK, marginBottom: 12 }}>Data Usage This Session</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 11, color: GRAY }}>SENT</Text>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: BLUE, marginTop: 4 }}>{this.formatData(dataSent)}</Text>
                </View>
                <View style={{ width: 1, backgroundColor: '#eee' }} />
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 11, color: GRAY }}>RECEIVED</Text>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: GREEN, marginTop: 4 }}>{this.formatData(dataReceived)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* quick settings */}
          <View style={{ paddingHorizontal: 20, marginTop: 12, marginBottom: 30 }}>
            <View style={styles.dataCard}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: BLACK, marginBottom: 16 }}>Quick Settings</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 14, color: BLACK }}>Kill Switch</Text>
                  <Text style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>Block traffic if VPN drops</Text>
                </View>
                <Switch
                  value={killSwitch}
                  onValueChange={(v) => this.setState({ killSwitch: v })}
                  trackColor={{ true: BLUE, false: '#ccc' }}
                />
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bigCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statusCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  connectBtn: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  dataCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
});
