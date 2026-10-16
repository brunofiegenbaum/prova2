import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Como no material do Roveda: SafeAreaProvider na raiz, Stack para navegação.
export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: "#2758c8" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }} />
    </SafeAreaProvider>
  );
}
