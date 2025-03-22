type FieldType = "TEXT" | "RADIO" | "SELECT" | "IMAGE" | "VIDEO";

interface BaseField {
  label: string;
  key: string;
  type: FieldType;
}

interface TextField extends BaseField {
  type: "TEXT";
}

interface RadioField extends BaseField {
  type: "RADIO";
  options: string[];
}

interface SelectField extends BaseField {
  type: "SELECT";
  options: string[];
}

interface ImageField extends BaseField {
  type: "IMAGE";
  quantity?: "multiple";
}

interface VideoField extends BaseField {
  type: "VIDEO";
  limit?: string;
}

type FormField = TextField | RadioField | SelectField | ImageField | VideoField;

interface FormStep {
  step: number;
  title: string;
  fields: FormField[];
}

export const twoWheelerFormData: FormStep[] = [
  {
    step: 1,
    title: "General Info",
    fields: [
      {
        label: "Registration Number",
        key: "regNo",
        type: "TEXT",
      },
      { label: "Chassis Number", key: "chassisNo", type: "TEXT" },
      { label: "Make & Model", key: "makeAndModel", type: "TEXT" },
      { label: "Customer Name", key: "customerName", type: "TEXT" },
      { label: "Tranche ID", key: "tranche_id", type: "TEXT" },
      {
        label: "Location of Audit",
        key: "auditLocation",
        type: "SELECT",
        options: [
          "Fleet Operator Hub",
          "E-Commerce Hub",
          "Driver Home",
          "On-Road",
          "Other",
        ],
      },
      {
        label: "Current Location",
        key: "current_location",
        type: "TEXT",
      },
      { label: "Driver Name", key: "driverName", type: "TEXT" },
    ],
  },
  {
    step: 2,
    title: "Safety & Functionality Inspection",
    fields: [
      {
        label: "Display",
        key: "display",
        type: "RADIO",
        options: ["Pass", "Damaged", "Missing"],
      },
      {
        label: "Dashboard",
        key: "dashboard",
        type: "RADIO",
        options: ["Pass", "Minor Damage", "Major Damage"],
      },
      {
        label: "Headlight",
        key: "headlight",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Horn",
        key: "horn",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Seat",
        key: "seat",
        type: "RADIO",
        options: ["Pass", "Minor Damage", "Major Damage"],
      },
      {
        label: "Vehicle Charging",
        key: "vehicle_charging",
        type: "RADIO",
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
        type: "RADIO",
        options: ["Pass", "Minor Issue", "Fail"],
      },
      {
        label: "Throttle",
        key: "throttle",
        type: "RADIO",
        options: ["Pass", "Minor Issue", "Fail"],
      },
      {
        label: "Motor",
        key: "motor",
        type: "RADIO",
        options: ["Pass", "Damaged", "Fail"],
      },
      {
        label: "Gear Functionality",
        key: "gear_functionality",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Suspension",
        key: "suspension",
        type: "RADIO",
        options: ["Pass", "Minor Issue", "Fail"],
      },
      {
        label: "Pick-up",
        key: "pick_up",
        type: "RADIO",
        options: ["Pass", "Minor Issue", "Fail"],
      },
      {
        label: "Brake Wire",
        key: "brake_wire",
        type: "RADIO",
        options: ["Pass", "Minor Issue", "Fail"],
      },
      {
        label: "Front Tyre Condition",
        key: "front_tyre_condition",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Back Tyre Condition",
        key: "back_tyre_condition",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Tyre Pressure",
        key: "tyre_pressure",
        type: "RADIO",
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
        type: "RADIO",
        options: ["Okay", "Damaged", "Not Available"],
      },
      {
        label: "Right Side Body",
        key: "right_side_body",
        type: "IMAGE",
        quantity: "multiple",
      },
      {
        label: "Left Side Body",
        key: "left_side_body",
        type: "IMAGE",
        quantity: "multiple",
      },
      {
        label: "Front Tyre (BrakeWire Side View)",
        key: "front_tyre_side_view",
        type: "IMAGE",
      },
      {
        label: "Fr. Number plate",
        key: "front_number_plate",
        type: "RADIO",
        options: ["Okay", "Damaged", "Faded"],
      },
      {
        label: "Right Indicator",
        key: "right_indicator",
        type: "RADIO",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Left Indicator",
        key: "left_indicator",
        type: "RADIO",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Rear number plate",
        key: "rear_number_plate",
        type: "RADIO",
        options: ["Okay", "Damaged", "Faded"],
      },
      {
        label: "Rear Mudguard",
        key: "rear_mudguard",
        type: "RADIO",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Front Mudguard",
        key: "front_mudguard",
        type: "RADIO",
        options: ["Rusted", "Damaged"],
      },
      {
        label: "Right ORVM",
        key: "right_orvm",
        type: "RADIO",
        options: ["Pass", "Damaged", "Fail"],
      },
      {
        label: "Left ORVM",
        key: "left_orvm",
        type: "RADIO",
        options: ["Pass", "Damaged", "Fail"],
      },
      {
        label: "Back Photo",
        key: "back_photo",
        type: "IMAGE",
      },
      {
        label: "Battery Box Open Photo",
        key: "battery_box_open_photo",
        type: "IMAGE",
      },
      {
        label: "Battery Qty",
        key: "battery_qty",
        type: "RADIO",
        options: ["0", "1", "2"],
      },
      {
        label: "Right Tail Light",
        key: "right_tail_light",
        type: "RADIO",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Left Tail Light",
        key: "left_tail_light",
        type: "RADIO",
        options: ["Cracked", "Damaged", "Okay"],
      },
      {
        label: "Battery Box Lock",
        key: "battery_box_lock",
        type: "RADIO",
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
        type: "RADIO",
        options: ["0", "1", "2"],
      },
      {
        label: "Insurance Copy",
        key: "insurance_copy",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "RC Copy",
        key: "rc_copy",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 6,
    title: "360 Video",
    fields: [
      {
        label: "360 Video",
        key: "video_360",
        type: "VIDEO",
        limit: "2 mins",
      },
    ],
  },
] as const;

export const threeWheelerFormData: FormStep[] = [
  {
    step: 1,
    title: "General Info",
    fields: [
      {
        label: "Registration Number",
        key: "regNo",
        type: "TEXT",
      },
      { label: "Chassis Number", key: "chassisNo", type: "TEXT" },
      { label: "Make & Model", key: "makeAndModel", type: "TEXT" },
      { label: "Customer Name", key: "customerName", type: "TEXT" },
      { label: "Tranche ID", key: "tranche_id", type: "TEXT" },
      {
        label: "Location of Audit",
        key: "auditLocation",
        type: "SELECT",
        options: [
          "Fleet Operator Hub",
          "E-Commerce Hub",
          "Driver Home",
          "On-Road",
          "Other",
        ],
      },
      {
        label: "Current Location",
        key: "current_location",
        type: "TEXT",
      },
      { label: "Driver Name", key: "driverName", type: "TEXT" },
    ],
  },
  {
    step: 2,
    title: "Front Physical Audit",
    fields: [
      {
        label: "Full Front Photo with Number Plate",
        key: "front_photo",
        type: "IMAGE",
      },
      {
        label: "Front Tyre (Brake Side View)",
        key: "front_tyre_photo",
        type: "IMAGE",
      },
      {
        label: "Front Number plate",
        key: "front_number_plate",
        type: "RADIO",
        options: ["Ok", "Missing", "Fade"],
      },
      {
        label: "Front Windshield glass",
        key: "front_windshield",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Right Head light",
        key: "right_head_light",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Left Head Light",
        key: "left_head_light",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Right Indicator",
        key: "right_indicator",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Left Indicator",
        key: "left_indicator",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Front Mudguard",
        key: "front_mudguard",
        type: "RADIO",
        options: ["Cracked", "Missing", "Ok"],
      },
      {
        label: "Wiper",
        key: "wiper",
        type: "RADIO",
        options: ["Pass", "Fail", "Damaged"],
      },
      {
        label: "Left ORVM",
        key: "left_orvm",
        type: "RADIO",
        options: ["Pass", "Fail", "Missing"],
      },
      {
        label: "Right ORVM",
        key: "right_orvm",
        type: "RADIO",
        options: ["Pass", "Fail", "Missing"],
      },
    ],
  },
  {
    step: 3,
    title: "Cabin Physical Audit",
    fields: [
      {
        label: "Cabin Photo",
        key: "cabin_photo",
        type: "IMAGE",
      },
      {
        label: "Dashboard Photo",
        key: "dashboard_photo",
        type: "IMAGE",
      },
      {
        label: "Odometer Reading Photo",
        key: "odometer_photo",
        type: "IMAGE",
      },
      {
        label: "Odometer Reading",
        key: "odometer_reading",
        type: "TEXT",
      },
      {
        label: "Gate Lock Left",
        key: "gate_lock_left",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Gate Lock Right",
        key: "gate_lock_right",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Left Cabin Side Glass",
        key: "left_cabin_glass",
        type: "RADIO",
        options: ["Ok", "Missing", "Cracked"],
      },
      {
        label: "Right Cabin Side Glass",
        key: "right_cabin_glass",
        type: "RADIO",
        options: ["Ok", "Missing", "Cracked"],
      },
      {
        label: "Display Meter",
        key: "display_meter",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Dashboard",
        key: "dashboard",
        type: "RADIO",
        options: ["Pass", "Minor Damage", "Major Damage"],
      },
      {
        label: "Seat",
        key: "seat",
        type: "RADIO",
        options: ["Pass", "Minor Damage", "Major Damage"],
      },
      {
        label: "Aux. Battery",
        key: "aux_battery",
        type: "RADIO",
        options: ["Pass", "Minor Damage", "Major Damage"],
      },
      {
        label: "Jack & Pana",
        key: "jack_and_pana",
        type: "RADIO",
        options: ["Yes", "No"],
      },
      {
        label: "Reverse Button",
        key: "reverse_button",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Spare Tyre",
        key: "spare_tyre_status",
        type: "RADIO",
        options: ["Yes", "No"],
      },
      {
        label: "Spare Tyre Photo",
        key: "spare_tyre_photo",
        type: "IMAGE",
      },
      {
        label: "Fire Extinguisher",
        key: "fire_extinguisher",
        type: "RADIO",
        options: ["Yes", "No"],
      },
      {
        label: "Ignition",
        key: "ignition",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Throttle",
        key: "throttle",
        type: "RADIO",
        options: ["Pass", "Damaged but working", "Fail"],
      },
      {
        label: "Vehicle Running",
        key: "vehicle_running",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Handbrake",
        key: "handbrake",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Horn",
        key: "horn",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "Vehicle Charging Point",
        key: "charging_point",
        type: "RADIO",
        options: ["Pass", "Fail", "Damaged"],
      },
      {
        label: "Is the vehicle charging",
        key: "is_charging",
        type: "RADIO",
        options: ["Pass", "Fail", "Charger not available"],
      },
    ],
  },
  {
    step: 4,
    title: "Sides Physical Audit",
    fields: [
      {
        label: "Full View Side (Right)",
        key: "right_side_view",
        type: "IMAGE",
      },
      {
        label: "Right Tyre",
        key: "right_tyre",
        type: "IMAGE",
      },
      {
        label: "Right Door",
        key: "right_door",
        type: "RADIO",
        options: ["Pass", "Rusted", "Damaged"],
      },
      {
        label: "Full View Side (Left)",
        key: "left_side_view",
        type: "IMAGE",
      },
      {
        label: "Left Tyre",
        key: "left_tyre",
        type: "IMAGE",
      },
      {
        label: "Left Door",
        key: "left_door",
        type: "RADIO",
        options: ["Pass", "Rusted", "Damaged"],
      },
    ],
  },
  {
    step: 5,
    title: "Back Physical Audit",
    fields: [
      {
        label: "Back Photo",
        key: "back_photo",
        type: "IMAGE",
      },
      {
        label: "Container Box Open Photo",
        key: "container_box_photo",
        type: "IMAGE",
      },
      {
        label: "Bumper / guard",
        key: "bumper",
        type: "RADIO",
        options: ["Pass", "Rusted", "fail"],
      },
      {
        label: "Right Tail Light",
        key: "right_tail_light",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Left Tail Light",
        key: "left_tail_light",
        type: "RADIO",
        options: ["Cracked", "damage", "Ok"],
      },
      {
        label: "Cargo box (Left Side)",
        key: "cargo_box_left",
        type: "RADIO",
        options: ["Pass", "Rusted", "Dent", "Damaged"],
      },
      {
        label: "Cargo box (Right Side)",
        key: "cargo_box_right",
        type: "RADIO",
        options: ["Pass", "Rusted", "Dent", "Damaged"],
      },
      {
        label: "Cargo box (Back Door)",
        key: "cargo_box_back",
        type: "RADIO",
        options: ["Pass", "Rusted", "Dent", "Damaged"],
      },
      {
        label: "Rear number plate",
        key: "rear_number_plate",
        type: "RADIO",
        options: ["Ok", "Damage", "Missing"],
      },
      {
        label: "Cargo Box Lock",
        key: "cargo_box_lock",
        type: "RADIO",
        options: ["Pass", "fail"],
      },
    ],
  },
  {
    step: 6,
    title: "Under the vehicle",
    fields: [
      {
        label: "Photo (Underneath Vehicle)",
        key: "underneath_photo",
        type: "IMAGE",
      },
      {
        label: "Back Frame Chassis",
        key: "back_frame_chassis",
        type: "RADIO",
        options: ["Pass", "Damaged", "Welded"],
      },
    ],
  },
  {
    step: 7,
    title: "Final",
    fields: [
      {
        label: "Keys Available",
        key: "keys_available",
        type: "RADIO",
        options: ["0", "1", "2"],
      },
      {
        label: "Insurance Copy",
        key: "insurance_copy",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "RC Copy",
        key: "rc_copy",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
      {
        label: "On-board Charger",
        key: "onboard_charger",
        type: "RADIO",
        options: ["Pass", "Fail"],
      },
    ],
  },
  {
    step: 8,
    title: "360 Video",
    fields: [
      {
        label: "360 Video",
        key: "video_360",
        type: "VIDEO",
        limit: "2 mins",
      },
    ],
  },
] as const;

// Export types for use in other files
export type { FieldType, FormField, FormStep };
