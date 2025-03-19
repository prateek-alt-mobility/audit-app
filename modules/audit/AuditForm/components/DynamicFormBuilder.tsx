import { useAppSelector } from "@/store/hooks";
import { Text, View } from "react-native";

interface DynamicFormBuilderProps {}
const formData = [
  {
    step: 1,
    title: "General Info",
    fields: [
      {
        label: "Registration Number",
        key: "registration_number",
        type: "text",
      },
      { label: "Chassis Number", key: "chassis_number", type: "text" },
      { label: "Make & Model", key: "make_model", type: "text" },
      { label: "Customer Name", key: "customer_name", type: "text" },
      { label: "Tranche ID", key: "tranche_id", type: "text" },
      {
        label: "Location of Audit",
        key: "location_of_audit",
        type: "single-select",
        options: [
          "Fleet Operator Hub",
          "E-Commerce Hub",
          "Driver Home",
          "On-Road",
          "Other",
        ],
      },
      { label: "Current Location", key: "current_location", type: "text" },
      { label: "Driver Name", key: "driver_name", type: "text" },
      { label: "Date & Time", key: "date_time", type: "text" },
    ],
  },
  {
    step: 2,
    title: "Safety & Functionality Inspection",
    fields: [
      {
        label: "Display",
        key: "display",
        type: "single-select",
        options: ["Pass", "Damaged", "Missing"],
      },
      {
        label: "Dashboard",
        key: "dashboard",
        type: "single-select",
        options: ["Pass", "Minorly Damaged", "Majorly Damaged"],
      },
      {
        label: "Headlight",
        key: "headlight",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "Horn",
        key: "horn",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "Seat",
        key: "seat",
        type: "single-select",
        options: ["Pass", "Minorly Damaged", "Majorly Damaged"],
      },
      {
        label: "Vehicle Charging",
        key: "vehicle_charging",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 3,
    title: "Performance Inspection",
    fields: [
      {
        label: "Ignition",
        key: "ignition",
        type: "single-select",
        options: ["Pass", "Had Minor Issues", "Fail"],
      },
      {
        label: "Throttle",
        key: "throttle",
        type: "single-select",
        options: ["Pass", "Had Minor Issues", "Fail"],
      },
      {
        label: "Motor",
        key: "motor",
        type: "single-select",
        options: ["Pass", "Was Damaged", "Fail"],
      },
      {
        label: "Gear Functionality",
        key: "gear_functionality",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "Suspension",
        key: "suspension",
        type: "single-select",
        options: ["Pass", "Had Minor Issues", "Fail"],
      },
      {
        label: "Pick-up",
        key: "pick_up",
        type: "single-select",
        options: ["Pass", "Had Minor Issues", "Fail"],
      },
      {
        label: "Brake Wire",
        key: "brake_wire",
        type: "single-select",
        options: ["Pass", "Had Minor Issues", "Fail"],
      },
      {
        label: "Front Tyre Condition",
        key: "front_tyre_condition",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "Back Tyre Condition",
        key: "back_tyre_condition",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "Tyre Pressure",
        key: "tyre_pressure",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 4,
    title: "Physical Audit",
    fields: [
      {
        label: "ToolBox",
        key: "toolbox",
        type: "single-select",
        options: ["Okay", "Damaged", "Not Available"],
      },
      {
        label: "Right Side Body",
        key: "right_side_body",
        type: "photo",
        quantity: "multiple",
      },
      {
        label: "Left Side Body",
        key: "left_side_body",
        type: "photo",
        quantity: "multiple",
      },
      {
        label: "Front Tyre (BrakeWire Side View)",
        key: "front_tyre_side_view",
        type: "photo",
      },
      {
        label: "Fr. Number plate",
        key: "front_number_plate",
        type: "single-select",
        options: ["Okay", "Damaged", "Faded"],
      },
      {
        label: "Right Indicator",
        key: "right_indicator",
        type: "single-select",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Left Indicator",
        key: "left_indicator",
        type: "single-select",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Rear number plate",
        key: "rear_number_plate",
        type: "single-select",
        options: ["Okay", "Damaged", "Faded"],
      },
      {
        label: "Rear Mudguard",
        key: "rear_mudguard",
        type: "single-select",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Front Mudguard",
        key: "front_mudguard",
        type: "single-select",
        options: ["Rusted", "Damaged"],
      },
      {
        label: "Right ORVM",
        key: "right_orvm",
        type: "single-select",
        options: ["Pass", "Damaged", "Fail"],
      },
      {
        label: "Left ORVM",
        key: "left_orvm",
        type: "single-select",
        options: ["Pass", "Damaged", "Fail"],
      },
      { label: "Back Photo", key: "back_photo", type: "photo" },
      {
        label: "Battery Box Open Photo",
        key: "battery_box_open_photo",
        type: "photo",
      },
      {
        label: "Battery Qty",
        key: "battery_qty",
        type: "single-select",
        options: ["0", "1", "2"],
      },
      {
        label: "Right Tail Light",
        key: "right_tail_light",
        type: "single-select",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Left Tail Light",
        key: "left_tail_light",
        type: "single-select",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Battery Box Lock",
        key: "battery_box_lock",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 5,
    title: "Accessories & Documents",
    fields: [
      {
        label: "Keys Available",
        key: "keys_available",
        type: "single-select",
        options: ["0", "1", "2"],
      },
      {
        label: "Insurance Copy",
        key: "insurance_copy",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
      {
        label: "RC Copy",
        key: "rc_copy",
        type: "single-select",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 6,
    title: "Final Submission",
    fields: [
      { label: "360 Video", key: "video_360", type: "video", limit: "2 mins" },
      { label: "Comment", key: "comment", type: "text" },
      { label: "Task", key: "task", type: "text" },
    ],
  },
];

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = () => {
  const currentStep = useAppSelector((state) => state.audit.currentStep);

  // Find the current step data (step numbers in formData are 1-based, while currentStep is 0-based)
  const currentStepData = formData.find((step) => step.step === currentStep);

  if (!currentStepData) {
    return null;
  }

  return (
    <View>
      <View>
        <Text className="text-2xl font-semibold mb-4">
          {currentStepData.title}
        </Text>
        {currentStepData.fields.map((field) => (
          <Text key={field.key}>{field.label}</Text>
        ))}
      </View>
    </View>
  );
};

DynamicFormBuilder.displayName = "DynamicFormBuilder";
export default DynamicFormBuilder;
