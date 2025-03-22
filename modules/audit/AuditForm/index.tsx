import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DynamicFormBuilder from "./components/DynamicFormBuilder";
import Stepper from "./components/Stepper";

const AuditForm: React.FC = () => {
  const { vehicleType } = useLocalSearchParams();
  const stepConfig = {
    "2W": [
      { id: "a7x9d2", label: "General Info", number: 1 },
      { id: "b3k5m8", label: "Safety & Functionality", number: 2 },
      { id: "c4n6p1", label: "Performance", number: 3 },
      { id: "d8r2t5", label: "Physical Audit", number: 4 },
      { id: "e9w4y7", label: "Accessories & Documents", number: 5 },
      { id: "f1h3j6", label: "360 Video", number: 6 },
    ],
    "3W": [
      { id: "a7x9d2", label: "General Info", number: 1 },
      { id: "b3k5m8", label: "Front Physical Audit", number: 2 },
      { id: "d8r2t5", label: "Cabin Physical Audit", number: 3 },
      { id: "c4n6p1", label: "Sides Physical Audit", number: 4 },
      { id: "e9w4y7", label: "Back Physical Audit", number: 5 },
      { id: "f1h3j6", label: "Underbody Physical Audit", number: 6 },
      { id: "g2k4l7", label: "Accessories & Documents", number: 7 },
      { id: "h5m8n9", label: "360 Video", number: 8 },
    ],
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: `${vehicleType} Audit`,
          headerShown: false,
        }}
      />
      <Stepper
        stepConfig={stepConfig[vehicleType as keyof typeof stepConfig]}
      />

      <View className="flex-1 pt-4">
        <DynamicFormBuilder vehicleType={vehicleType as string} />
      </View>
    </SafeAreaView>
  );
};

AuditForm.displayName = "AuditForm";
export default AuditForm;
