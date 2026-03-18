import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

const { icons } = images;

// copy pasted server data instead of importing from constants
const ALL_SERVERS = [
  { id: '1', name: 'Automatic', country: 'Auto', ping: 12, load: 20, icon: icons.automatic },
  { id: '2', name: 'New York, NY', country: 'United States', ping: 45, load: 65, icon: icons.us },
  { id: '3', name: 'Los Angeles', country: 'United States', ping: 38, load: 40, icon: icons.us },
  { id: '4', name: 'Chicago', country: 'United States', ping: 52, load: 78, icon: icons.us },
  { id: '5', name: 'London', country: 'United Kingdom', ping: 89, load: 55, icon: icons.uk },
  { id: '6', name: 'Manchester', country: 'United Kingdom', ping: 92, load: 30, icon: icons.uk },
  { id: '7', name: 'Moscow', country: 'Russia', ping: 134, load: 45, icon: icons.russia },
  { id: '8', name: 'Stockholm', country: 'Sweden', ping: 78, load: 35, icon: icons.sweden },
  { id: '9', name: 'Gothenburg', country: 'Sweden', ping: 82, load: 22, icon: icons.sweden },
  { id: '10', name: 'Melbourne', country: 'Australia', ping: 210, load: 50, icon: icons.australia },
  { id: '11', name: 'Sydney', country: 'Australia', ping: 198, load: 60, icon: icons.australia },
  { id: '12', name: 'New Delhi', country: 'India', ping: 156, load: 75, icon: icons.india },
  { id: '13', name: 'Mumbai', country: 'India', ping: 145, load: 80, icon: icons.india },
  { id: '14', name: 'Singapore', country: 'Singapore', ping: 167, load: 55, icon: icons.singapore },
];

function getLoadColor(load) {
  if (load < 40) return '#4CAF50';
  if (load < 70) return '#FF9800';
  return '#F44336';
}

export default class Servers extends Component {

  state = {
    search: '',
    selected: '1',
    filter: 'all', // all | recommended | favorites
    favorites: ['2', '5'],
  };

  getFiltered() {
    const { search, filter, favorites } = this.state;
    let list = ALL_SERVERS;
    if (search.trim() != '') {
      list = list.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.country.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter == 'recommended') {
      list = list.filter(s => s.load < 50);
    }
    if (filter == 'favorites') {
      list = list.filter(s => favorites.includes(s.id));
    }
    return list;
  }

  toggleFavorite(id) {
    const { favorites } = this.state;
    if (favorites.includes(id)) {
      this.setState({ favorites: favorites.filter(f => f != id) });
    } else {
      this.setState({ favorites: [...favorites, id] });
    }
  }

  renderServer(item) {
    const { selected, favorites } = this.state;
    const isSelected = selected == item.id;
    const isFav = favorites.includes(item.id);

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => this.setState({ selected: item.id })}
        style={[styles.serverRow, isSelected && styles.serverRowSelected]}
      >
        <Image source={item.icon} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{item.country}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, color: '#888' }}>{item.ping} ms</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#eee', borderRadius: 2, overflow: 'hidden' }}>
              <View style={{ width: item.load / 100 * 40, height: 4, backgroundColor: getLoadColor(item.load), borderRadius: 2 }} />
            </View>
            <Text style={{ fontSize: 11, color: getLoadColor(item.load), marginLeft: 4 }}>{item.load}%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.toggleFavorite(item.id)} style={{ marginLeft: 10, padding: 4 }}>
          <Text style={{ fontSize: 18 }}>{isFav ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
        {isSelected && <Text style={{ fontSize: 18, marginLeft: 6, color: '#0094FC' }}>✓</Text>}
      </TouchableOpacity>
    );
  }

  render() {
    const { search, filter } = this.state;
    const filtered = this.getFiltered();

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>

        {/* header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#000' }}>Server List</Text>
          <Text style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{ALL_SERVERS.length} servers available</Text>
        </View>

        {/* search */}
        <View style={styles.searchBox}>
          <Text style={{ marginRight: 8, fontSize: 16 }}>🔍</Text>
          <TextInput
            style={{ flex: 1, fontSize: 14, color: '#000' }}
            placeholder="Search country or city..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={(t) => this.setState({ search: t })}
          />
          {search != '' && (
            <TouchableOpacity onPress={() => this.setState({ search: '' })}>
              <Text style={{ color: '#aaa', fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* filters */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 12 }}>
          {['all', 'recommended', 'favorites'].map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => this.setState({ filter: f })}
              style={[styles.filterChip, filter == f && styles.filterChipActive]}
            >
              <Text style={{ fontSize: 13, color: filter == f ? '#fff' : '#555', fontWeight: filter == f ? '700' : '400' }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* list */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          {filtered.length == 0
            ? <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Text style={{ fontSize: 40 }}>🌐</Text>
                <Text style={{ fontSize: 16, color: '#888', marginTop: 12 }}>No servers found</Text>
              </View>
            : filtered.map(item => this.renderServer(item))
          }
        </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#0094FC',
    borderColor: '#0094FC',
  },
  serverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  serverRowSelected: {
    borderWidth: 1.5,
    borderColor: '#0094FC',
  },
});
