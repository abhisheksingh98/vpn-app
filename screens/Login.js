import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPass: false,
      loading: false,
    };
  }

  handleLogin() {
    const { email, password } = this.state;
    if (email == '') {
      Alert.alert('Error', 'please enter email');
      return;
    }
    if (password == '') {
      Alert.alert('Error', 'please enter password');
      return;
    }
    this.setState({ loading: true });
    // fake delay
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigation.navigate('MainTabs');
    }, 1500);
  }

  handleGoogle() {
    Alert.alert('Google Login', 'Google login not implemented yet');
  }

  render() {
    const { email, password, showPass, loading } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 80 }}>

            {/* logo area */}
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
              <View style={{
                width: 80, height: 80, borderRadius: 40,
                backgroundColor: '#0094FC',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>V</Text>
              </View>
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#000' }}>Welcome Back</Text>
              <Text style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Sign in to continue to VPN App</Text>
            </View>

            {/* email */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputBox}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={(t) => this.setState({ email: t })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* password */}
            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
            <View style={styles.inputBox}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={(t) => this.setState({ password: t })}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => this.setState({ showPass: !showPass })}>
                <Text style={{ color: '#0094FC', fontSize: 13 }}>{showPass ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }}>
              <Text style={{ color: '#0094FC', fontSize: 13 }}>Forgot password?</Text>
            </TouchableOpacity>

            {/* login btn */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && { opacity: 0.6 }]}
              onPress={() => this.handleLogin()}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
              <Text style={{ marginHorizontal: 12, color: '#aaa', fontSize: 13 }}>OR</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
            </View>

            {/* google */}
            <TouchableOpacity
              style={styles.googleBtn}
              onPress={() => this.handleGoogle()}
            >
              <Text style={{ fontSize: 18, marginRight: 10 }}>🔵</Text>
              <Text style={{ color: '#333', fontSize: 15, fontWeight: '600' }}>Continue with Google</Text>
            </TouchableOpacity>

            {/* signup */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32, marginBottom: 20 }}>
              <Text style={{ color: '#888', fontSize: 14 }}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={{ color: '#0094FC', fontSize: 14, fontWeight: '700' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  loginBtn: {
    backgroundColor: '#0094FC',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#0094FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
});
