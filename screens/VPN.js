import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { images, theme, rgba, servers } from "../constants";
const { icons } = images;
const { SIZES, COLORS } = theme;

const VPN = () => {
  const [connected, setConnected] = useState(false);
  const [server, setServer] = useState(null);
  const [show, setShow] = useState(false);
  const [automatic] = useState({
    name: "Automatic",
    icon: icons.automatic,
  });

  const handleConnect = () => {
    setConnected(!connected);
  };

  const handleServer = (server) => {
    setServer(server);
    setConnected(false);
    setShow(false);
  };

  const renderServer = () => {
    const connection = server || automatic;

    return (
      <View style={styles.serverRow}>
        <Image source={connection.icon} style={styles.serverIcon} />
        <Text style={styles.serverName}>{connection.name}</Text>
        <Image source={icons.dropdown} style={styles.dropdownIcon} />
      </View>
    );
  };

  const renderServersModal = () => {
    const connection = server || automatic;

    return (
      <Modal visible={show} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShow(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Pick your Server</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {servers.map((item) => {
                const isConnected = connection.name === item.name;
                const checkIcon = icons[isConnected ? "checked" : "unchecked"];
                return (
                  <TouchableOpacity
                    key={`server-${item.name}`}
                    onPress={() => handleServer(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.serverItem}>
                      <View style={styles.serverItemLeft}>
                        <Image source={item.icon} style={styles.serverIcon} />
                        <Text style={styles.serverItemName}>{item.name}</Text>
                      </View>
                      <Image source={checkIcon} style={styles.checkIcon} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VPN</Text>
      </View>

      {/* Status + Toggle */}
      <View style={styles.centerContent}>
        {/* Connection status badge */}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {connected ? "Connected" : "Disconnected"}
          </Text>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: connected
                  ? COLORS.success
                  : rgba(COLORS.gray, 0.5),
              },
            ]}
          />
        </View>

        {/* VPN icon */}
        <Image
          style={styles.vpnImage}
          source={icons[connected ? "online" : "offline"]}
        />

        {/* Connect button */}
        <TouchableOpacity
          style={[
            styles.connectButton,
            connected
              ? styles.connectButtonOutlined
              : styles.connectButtonFilled,
          ]}
          activeOpacity={0.85}
          onPress={() => handleConnect()}
        >
          <Text
            style={[
              styles.connectButtonText,
              connected && styles.connectButtonTextDark,
            ]}
          >
            {connected ? "DISCONNECT" : "CONNECT NOW"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Server picker */}
      <TouchableOpacity
        style={styles.serversBar}
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        {renderServer()}
      </TouchableOpacity>

      {renderServersModal()}
    </SafeAreaView>
  );
};

export default VPN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.h3,
  },
  headerTitle: {
    fontSize: SIZES.title,
    fontWeight: "600",
    color: COLORS.black,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statusText: {
    fontSize: SIZES.subtitle,
    fontWeight: "600",
    color: COLORS.gray,
    lineHeight: SIZES.h3,
  },
  statusDot: {
    width: SIZES.base,
    height: SIZES.base,
    borderRadius: SIZES.base / 2,
    marginLeft: SIZES.small,
  },
  vpnImage: {
    width: 180,
    height: 180,
    marginVertical: 20,
  },
  connectButton: {
    width: SIZES.width / 2,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  connectButtonFilled: {
    backgroundColor: COLORS.primary,
  },
  connectButtonOutlined: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.black,
  },
  connectButtonText: {
    fontSize: SIZES.caption,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 1,
  },
  connectButtonTextDark: {
    color: COLORS.black,
  },
  serversBar: {
    width: SIZES.width,
    height: SIZES.base * 9,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: SIZES.base / 2,
    elevation: 4,
  },
  serverRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  serverName: {
    fontSize: SIZES.subtitle,
    color: COLORS.black,
    marginHorizontal: SIZES.padding / 2,
  },
  serverIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: rgba(COLORS.gray, 0.2),
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    maxHeight: SIZES.height * 0.6,
  },
  modalTitle: {
    fontSize: SIZES.subtitle,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: SIZES.padding,
  },
  serverItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  serverItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  serverItemName: {
    fontSize: SIZES.subtitle,
    color: COLORS.black,
    paddingHorizontal: SIZES.h3,
  },
  checkIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
