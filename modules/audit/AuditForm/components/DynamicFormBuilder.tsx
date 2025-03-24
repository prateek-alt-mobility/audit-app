import Dropdown from "@/components/Dropdown";
import ImageInput from "@/components/ImageInput";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { threeWheelerFormData, twoWheelerFormData } from "./formData";

interface DynamicFormBuilderProps {
  vehicleType: string;
}
const failureStates = [
  "DAMAGED",
  "MISSING",
  "FAIL",
  "DAMAGE",
  "CRACKED",
  "RUSTED",
  "DENT",
  "MINOR_DAMAGE",
  "MAJOR_DAMAGE",
];
// Create a dynamic Zod schema based on the form fields
const createDynamicSchema = (fields: any[]) => {
  const schemaFields: Record<string, any> = {};

  fields.forEach((field) => {
    switch (field.type) {
      case "TEXT":
        schemaFields[field.key] = z
          .string()
          .min(1, `${field.label} is required`);
        break;
      case "RADIO":
        schemaFields[field.key] = z
          .string()
          .min(1, `Please select a ${field.label}`);
        break;
      case "SELECT":
        schemaFields[field.key] = z
          .string()
          .min(1, `Please select a ${field.label}`);
        break;
      case "IMAGE":
        schemaFields[field.key] = z.array(z.string()).optional();
        break;
      case "VIDEO":
        schemaFields[field.key] = z.string().optional();
        break;
    }
  });

  return z.object(schemaFields);
};

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  vehicleType,
}) => {
  const currentStep = useAppSelector((state) => state.audit.currentStep);

  // Find the current step data
  const currentStepData =
    vehicleType === "2W"
      ? twoWheelerFormData.find((step) => step.step === currentStep)
      : threeWheelerFormData.find((step) => step.step === currentStep);

  if (!currentStepData) {
    return null;
  }

  // Create dynamic schema for current step
  const schema = createDynamicSchema(currentStepData.fields);
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: currentStepData.fields.reduce(
      (acc: Record<string, any>, field) => {
        acc[field.key] = field.type === "IMAGE" ? [] : "";
        return acc;
      },
      {}
    ),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Handle form submission here
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "TEXT":
        return (
          <Controller
            key={field.key}
            control={control}
            name={field.key}
            render={({ field: { onChange, value } }) => (
              <Input
                label={field.label}
                placeholder={`Enter ${field.label}`}
                value={value}
                onChange={onChange}
                error={errors[field.key]?.message as string}
              />
            )}
          />
        );
      case "RADIO":
        return (
          <Controller
            key={field.key}
            control={control}
            name={field.key}
            render={({ field: { onChange, value } }) => (
              <View>
                <RadioButton
                  title={field.label}
                  options={field.options}
                  selectedValue={value}
                  onSelect={onChange}
                  error={errors[field.key]?.message as string}
                />
                {failureStates.includes(value) && (
                  <Controller
                    control={control}
                    name={`${field.key}_images`}
                    render={({
                      field: { onChange: onImageChange, value: images },
                    }) => (
                      // <ImageUpload
                      //   label={`${field.label} Images`}
                      //   value={images}
                      //   onChange={onImageChange}
                      //   error={errors[`${field.key}_images`]?.message as string}
                      //   multiple={true}
                      // />
                      <ImageInput
                        label={`${field.label} Images`}
                        value={images}
                        onChange={(newImages) => {
                          console.log("Selected images:", newImages);
                          onImageChange(newImages);
                        }}
                        error={errors[`${field.key}_images`]?.message as string}
                        multiple={true}
                      />
                    )}
                  />
                )}
              </View>
            )}
          />
        );
      case "SELECT":
        return (
          <Controller
            key={field.key}
            control={control}
            name={field.key}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label={field.label}
                options={field.options}
                value={value}
                onSelect={(val) => onChange(val.toString())}
                placeholder={`Select ${field.label}`}
                error={errors[field.key]?.message as string}
              />
            )}
          />
        );
      case "IMAGE":
        return (
          <Controller
            key={field.key}
            control={control}
            name={field.key}
            render={({ field: { onChange, value } }) => (
              <ImageUpload
                label={field.label}
                value={value}
                onChange={onChange}
                error={errors[field.key]?.message as string}
                multiple={field.quantity === "multiple"}
              />
            )}
          />
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1">
        <View className="px-4">
          <Text className="text-2xl font-bold mb-6">
            {currentStepData.title}
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {currentStepData.fields.map((field) => renderField(field))}
        </ScrollView>

        <View className="p-4">
          <TouchableOpacity
            className="bg-black py-4 rounded-xl"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center font-semibold">
              Save & Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

DynamicFormBuilder.displayName = "DynamicFormBuilder";
export default DynamicFormBuilder;
