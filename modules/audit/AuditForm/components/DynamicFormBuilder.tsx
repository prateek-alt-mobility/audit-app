import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { Text, View } from "react-native";
import formDataJson from "./formData.json";

interface DynamicFormBuilderProps {}

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = () => {
  const currentStep = useAppSelector((state) => state.audit.currentStep);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Find the current step data
  const currentStepData = formDataJson.formData.find(
    (step) => step.step === currentStep
  );

  if (!currentStepData) {
    return null;
  }

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "TEXT":
        return (
          <Input
            key={field.key}
            label={field.label}
            placeholder={`Enter ${field.label}`}
            value={formValues[field.key] || ""}
            onChange={(value) => handleInputChange(field.key, value)}
          />
        );
      case "RADIO":
        return (
          <RadioButton
            key={field.key}
            title={field.label}
            options={field.options.map((option: string) => ({
              label: option,
              value: option,
            }))}
            selectedValue={formValues[field.key] || ""}
            onSelect={(value) => handleInputChange(field.key, value)}
          />
        );
      case "IMAGE":
        return (
          <View key={field.key}>
            <Text className="text-base font-medium mb-2">{field.label}</Text>
            <Text className="text-gray-500">
              Image upload component will go here
            </Text>
          </View>
        );
      case "VIDEO":
        return (
          <View key={field.key}>
            <Text className="text-base font-medium mb-2">{field.label}</Text>
            <Text className="text-gray-500">
              Video upload component will go here
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="px-4">
      <Text className="text-2xl font-semibold mb-6">
        {currentStepData.title}
      </Text>
      {currentStepData.fields.map((field) => renderField(field))}
    </View>
  );
};

DynamicFormBuilder.displayName = "DynamicFormBuilder";
export default DynamicFormBuilder;
