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
  options: Array<{
    label: string;
    value: string;
  }>;
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Missing", value: "MISSING" },
        ],
      },
      {
        label: "Dashboard",
        key: "dashboard",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor damage", value: "MINOR_DAMAGE" },
          { label: "Major damage", value: "MAJOR_DAMAGE" },
        ],
      },
      {
        label: "Headlight",
        key: "headlight",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Horn",
        key: "horn",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Seat",
        key: "seat",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor damage", value: "MINOR_DAMAGE" },
          { label: "Major damage", value: "MAJOR_DAMAGE" },
        ],
      },
      {
        label: "Vehicle Charging",
        key: "vehicle_charging",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor issue", value: "MINOR_ISSUE" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Throttle",
        key: "throttle",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor issue", value: "MINOR_ISSUE" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Motor",
        key: "motor",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Gear Functionality",
        key: "gear_functionality",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Suspension",
        key: "suspension",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor issue", value: "MINOR_ISSUE" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Pick-up",
        key: "pick_up",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor issue", value: "MINOR_ISSUE" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Brake Wire",
        key: "brake_wire",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor issue", value: "MINOR_ISSUE" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Front Tyre Condition",
        key: "front_tyre_condition",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Back Tyre Condition",
        key: "back_tyre_condition",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Tyre Pressure",
        key: "tyre_pressure",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Not available", value: "NOT_AVAILABLE" },
        ],
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
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Faded", value: "FADED" },
        ],
      },
      {
        label: "Right Indicator",
        key: "right_indicator",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Left Indicator",
        key: "left_indicator",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Rear number plate",
        key: "rear_number_plate",
        type: "RADIO",
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Damaged", value: "DAMAGE" },
          { label: "Faded", value: "FADED" },
        ],
      },
      {
        label: "Rear Mudguard",
        key: "rear_mudguard",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Front Mudguard",
        key: "front_mudguard",
        type: "RADIO",
        options: [
          { label: "Rusted", value: "RUSTED" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Right ORVM",
        key: "right_orvm",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Left ORVM",
        key: "left_orvm",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ],
      },
      {
        label: "Right Tail Light",
        key: "right_tail_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Left Tail Light",
        key: "left_tail_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Battery Box Lock",
        key: "battery_box_lock",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ],
      },
      {
        label: "Insurance Copy",
        key: "insurance_copy",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "RC Copy",
        key: "rc_copy",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Missing", value: "MISSING" },
          { label: "Fade", value: "FADE" },
        ],
      },
      {
        label: "Front Windshield glass",
        key: "front_windshield",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Right Head light",
        key: "right_head_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Left Head Light",
        key: "left_head_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Right Indicator",
        key: "right_indicator",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Left Indicator",
        key: "left_indicator",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Front Mudguard",
        key: "front_mudguard",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Missing", value: "MISSING" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Wiper",
        key: "wiper",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Left ORVM",
        key: "left_orvm",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
          { label: "Missing", value: "MISSING" },
        ],
      },
      {
        label: "Right ORVM",
        key: "right_orvm",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
          { label: "Missing", value: "MISSING" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Gate Lock Right",
        key: "gate_lock_right",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Left Cabin Side Glass",
        key: "left_cabin_glass",
        type: "RADIO",
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Missing", value: "MISSING" },
          { label: "Cracked", value: "CRACKED" },
        ],
      },
      {
        label: "Right Cabin Side Glass",
        key: "right_cabin_glass",
        type: "RADIO",
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Missing", value: "MISSING" },
          { label: "Cracked", value: "CRACKED" },
        ],
      },
      {
        label: "Display Meter",
        key: "display_meter",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Dashboard",
        key: "dashboard",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor damage", value: "MINOR_DAMAGE" },
          { label: "Major damage", value: "MAJOR_DAMAGE" },
        ],
      },
      {
        label: "Seat",
        key: "seat",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor damage", value: "MINOR_DAMAGE" },
          { label: "Major damage", value: "MAJOR_DAMAGE" },
        ],
      },
      {
        label: "Aux. Battery",
        key: "aux_battery",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Minor damage", value: "MINOR_DAMAGE" },
          { label: "Major damage", value: "MAJOR_DAMAGE" },
        ],
      },
      {
        label: "Jack & Pana",
        key: "jack_and_pana",
        type: "RADIO",
        options: [
          { label: "Yes", value: "YES" },
          { label: "No", value: "NO" },
        ],
      },
      {
        label: "Reverse Button",
        key: "reverse_button",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Spare Tyre",
        key: "spare_tyre_status",
        type: "RADIO",
        options: [
          { label: "Yes", value: "YES" },
          { label: "No", value: "NO" },
        ],
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
        options: [
          { label: "Yes", value: "YES" },
          { label: "No", value: "NO" },
        ],
      },
      {
        label: "Ignition",
        key: "ignition",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Throttle",
        key: "throttle",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged but working", value: "DAMAGED_BUT_WORKING" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Vehicle Running",
        key: "vehicle_running",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Handbrake",
        key: "handbrake",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Horn",
        key: "horn",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Vehicle Charging Point",
        key: "charging_point",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Is the vehicle charging",
        key: "is_charging",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
          { label: "Charger not available", value: "CHARGER_NOT_AVAILABLE" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Damaged", value: "DAMAGED" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Damaged", value: "DAMAGED" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "Right Tail Light",
        key: "right_tail_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Left Tail Light",
        key: "left_tail_light",
        type: "RADIO",
        options: [
          { label: "Cracked", value: "CRACKED" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Okay", value: "OKAY" },
        ],
      },
      {
        label: "Cargo box (Left Side)",
        key: "cargo_box_left",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Dent", value: "DENT" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Cargo box (Right Side)",
        key: "cargo_box_right",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Dent", value: "DENT" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Cargo box (Back Door)",
        key: "cargo_box_back",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Rusted", value: "RUSTED" },
          { label: "Dent", value: "DENT" },
          { label: "Damaged", value: "DAMAGED" },
        ],
      },
      {
        label: "Rear number plate",
        key: "rear_number_plate",
        type: "RADIO",
        options: [
          { label: "Okay", value: "OKAY" },
          { label: "Damage", value: "DAMAGE" },
          { label: "Missing", value: "MISSING" },
        ],
      },
      {
        label: "Cargo Box Lock",
        key: "cargo_box_lock",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Damaged", value: "DAMAGED" },
          { label: "Welded", value: "WELDED" },
        ],
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
        options: [
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ],
      },
      {
        label: "Insurance Copy",
        key: "insurance_copy",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "RC Copy",
        key: "rc_copy",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
      },
      {
        label: "On-board Charger",
        key: "onboard_charger",
        type: "RADIO",
        options: [
          { label: "Pass", value: "PASS" },
          { label: "Fail", value: "FAIL" },
        ],
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
