import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = ({ navigation }) => {
  const [settings, setSettings] = useState({
    killSwitch: true,
    autoConnect: false,
    splitTunneling: false,
    notifications: true,
    darkMode: false,
    dns: 'automatic', // automatic | cloudflare | google | custom
    protocol: 'udp', // udp | tcp | wireguard
    encryption: 'aes256', // aes256 | aes128 | chacha20
    startOnBoot: true,
    ipv6leak: true,
    dnsLeak: true,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const showDNSAlert = () => {
    Alert.alert('DNS Server', 'Choose your preferred DNS', [
      { text: 'Automatic', onPress: () => updateSetting('dns', 'automatic') },
      { text: 'Cloudflare (1.1.1.1)', onPress: () => updateSetting('dns', 'cloudflare') },
      { text: 'Google (8.8.8.8)', onPress: () => updateSetting('dns', 'google') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const showProtocolAlert = () => {
    Alert.alert('VPN Protocol', 'Choose VPN protocol', [
      { text: 'UDP (Recommended)', onPress: () => updateSetting('protocol', 'udp') },
      { text: 'TCP (Stable)', onPress: () => updateSetting('protocol', 'tcp') },
      { text: 'WireGuard (Fast)', onPress: () => updateSetting('protocol', 'wireguard') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const showEncryptionAlert = () => {
    Alert.alert('Encryption', 'Choose encryption strength', [
      { text: 'AES-256 (Strongest)', onPress: () => updateSetting('encryption', 'aes256') },
      { text: 'AES-128 (Faster)', onPress: () => updateSetting('encryption', 'aes128') },
      { text: 'ChaCha20 (Mobile)', onPress: () => updateSetting('encryption', 'chacha20') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const renderToggle = (label, subtitle, key) => {
    return (
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, color: '#000' }}>{label}</Text>
          {subtitle ? <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{subtitle}</Text> : null}
        </View>
        <Switch
          value={settings[key]}
          onValueChange={(v) => updateSetting(key, v)}
          trackColor={{ true: '#0094FC', false: '#ccc' }}
          thumbColor={'#fff'}
        />
      </View>
    );
  };

  const renderSelector = (label, subtitle, value, onPress) => {
    return (
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, color: '#000' }}>{label}</Text>
          {subtitle ? <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{subtitle}</Text> : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: '#0094FC', marginRight: 6, fontWeight: '600' }}>{value}</Text>
          <Text style={{ color: '#aaa' }}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = (title) => {
    return (
      <Text style={{ fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 0.8, paddingHorizontal: 20, paddingBottom: 8, paddingTop: 20 }}>
        {title.toUpperCase()}
      </Text>
    );
  };

  const { dns, protocol, encryption } = settings;
  const dnsLabel = { automatic: 'Automatic', cloudflare: 'Cloudflare', google: 'Google', custom: 'Custom' }[dns];
  const protoLabel = { udp: 'UDP', tcp: 'TCP', wireguard: 'WireGuard' }[protocol];
  const encLabel = { aes256: 'AES-256', aes128: 'AES-128', chacha20: 'ChaCha20' }[encryption];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#000' }}>Settings</Text>
        </View>

        {renderSectionHeader('Connection')}
        <View style={styles.card}>
          {renderToggle('Kill Switch', 'Block internet if VPN drops', 'killSwitch')}
          <View style={styles.divider} />
          {renderToggle('Auto Connect', 'Connect on app launch', 'autoConnect')}
          <View style={styles.divider} />
          {renderToggle('Start on Boot', 'Launch VPN when device starts', 'startOnBoot')}
          <View style={styles.divider} />
          {renderToggle('Split Tunneling', 'Choose which apps use VPN', 'splitTunneling')}
        </View>

        {renderSectionHeader('Protocol & Encryption')}
        <View style={styles.card}>
          {renderSelector('DNS Server', 'Choose DNS resolver', dnsLabel, showDNSAlert)}
          <View style={styles.divider} />
          {renderSelector('VPN Protocol', null, protoLabel, showProtocolAlert)}
          <View style={styles.divider} />
          {renderSelector('Encryption', 'Data protection strength', encLabel, showEncryptionAlert)}
        </View>

        {renderSectionHeader('Privacy & Security')}
        <View style={styles.card}>
          {renderToggle('DNS Leak Protection', 'Prevent DNS leaks', 'dnsLeak')}
          <View style={styles.divider} />
          {renderToggle('IPv6 Leak Protection', 'Block IPv6 traffic', 'ipv6leak')}
        </View>

        {renderSectionHeader('General')}
        <View style={styles.card}>
          {renderToggle('Notifications', 'Connection alerts', 'notifications')}
          <View style={styles.divider} />
          {renderToggle('Dark Mode', 'Switch to dark theme', 'darkMode')}
        </View>

        {/* danger zone */}
        {renderSectionHeader('Account')}
        <View style={[styles.card, { marginBottom: 30 }]}>
          <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Clear Data', 'Clear all cached VPN data?', [{ text: 'Clear', style: 'destructive', onPress: () => { } }, { text: 'Cancel', style: 'cancel' }])}>
            <Text style={{ fontSize: 15, color: '#F44336' }}>Clear Cache & Data</Text>
            <Text style={{ color: '#aaa' }}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={() => navigation.replace('Login')}>
            <Text style={{ fontSize: 15, color: '#F44336' }}>Sign Out</Text>
            <Text style={{ color: '#aaa' }}>›</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
});
