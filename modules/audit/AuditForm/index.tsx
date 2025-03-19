import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DynamicFormBuilder from "./components/DynamicFormBuilder";
import Stepper from "./components/Stepper";

const AuditForm: React.FC = () => {
  const { vehicleType } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: `${vehicleType} Audit`,
          headerShown: false,
        }}
      />
      <Stepper />
      <ScrollView className="flex-1 p-4">
        <DynamicFormBuilder />
      </ScrollView>
    </SafeAreaView>
  );
};

AuditForm.displayName = "AuditForm";
export default AuditForm;
