import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import AppButton from './AppButton';
import { theme } from '../theme/theme';

export default function CartItem({ item, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} $</Text>
        <AppButton title="Удалить" variant="danger" onPress={onRemove} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.sm,
    marginRight: theme.spacing.md,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
});
