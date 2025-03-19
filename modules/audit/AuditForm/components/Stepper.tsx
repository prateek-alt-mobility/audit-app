import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateStep } from "@/store/slices/audit"; // Make sure this action exists
import React from "react";
import { Pressable, Text, View } from "react-native";

interface StepConfig {
  id: string;
  label: string;
  number: number;
  icon?: string; // Optional icon for future use
}

const stepConfig: StepConfig[] = [
  { id: "a7x9d2", label: "General Info", number: 1 },
  { id: "b3k5m8", label: "Safety & Functionality", number: 2 },
  { id: "c4n6p1", label: "Performance", number: 3 },
  { id: "d8r2t5", label: "Physical Audit", number: 4 },
  { id: "e9w4y7", label: "Accessories & Documents", number: 5 },
  { id: "f1h3j6", label: "360 Video", number: 6 },
];

const Stepper = () => {
  const currentStep = useAppSelector((state) => state.audit.currentStep);
  const dispatch = useAppDispatch();

  const handleStepClick = (step: number) => {
    dispatch(updateStep(step));
  };

  return (
    <View className="px-4 py-0">
      <View className="flex-row justify-between relative">
        {/* Progress line */}
        <View className="absolute top-3 left-[18px] right-[18px] h-0.5 bg-gray-200">
          <View
            className="h-full bg-black"
            style={{
              width: `${((currentStep - 1) / (stepConfig.length - 1)) * 100}%`,
            }}
          />
        </View>

        {/* Steps */}
        {stepConfig.map(({ id, number, label }) => (
          <Pressable
            key={id}
            onPress={() => handleStepClick(number)}
            className="items-center"
          >
            <View
              className={`w-6 h-6 rounded-full items-center justify-center border-2 ${
                number <= currentStep
                  ? "bg-black border-black"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  number <= currentStep ? "text-white" : "text-gray-400"
                }`}
              >
                {number < currentStep ? "✓" : number}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Stepper;
