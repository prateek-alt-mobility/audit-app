import { z } from "zod";

const AuditFormValidationSchema = {
  // 2 Wheeler Validation Schema
  "2W": {
    step1: z.object({
      regNo: z.string().min(1, "Registration Number is required"),
      chassisNo: z.string().min(1, "Chassis Number is required"),
      makeAndModel: z.string().min(1, "Make & Model is required"),
      customerName: z.string().min(1, "Customer Name is required"),
      tranche_id: z.string().min(1, "Tranche ID is required"),
      auditLocation: z.string().min(1, "Audit Location is required"),
      current_location: z.string().min(1, "Current Location is required"),
      driverName: z.string().min(1, "Driver Name is required"),
    }),
    step2: z.object({
      display: z.enum(["PASS", "DAMAGED", "MISSING"]),
      dashboard: z.enum(["PASS", "MINOR_DAMAGE", "MAJOR_DAMAGE"]),
      headlight: z.enum(["PASS", "FAIL"]),
      horn: z.enum(["PASS", "FAIL"]),
      seat: z.enum(["PASS", "MINOR_DAMAGE", "MAJOR_DAMAGE"]),
      vehicle_charging: z.enum(["PASS", "FAIL"]),
    }),
    step3: z.object({
      ignition: z.enum(["PASS", "MINOR_ISSUE", "FAIL"]),
      throttle: z.enum(["PASS", "MINOR_ISSUE", "FAIL"]),
      motor: z.enum(["PASS", "DAMAGED", "FAIL"]),
      gear_functionality: z.enum(["PASS", "FAIL"]),
      suspension: z.enum(["PASS", "MINOR_ISSUE", "FAIL"]),
      pick_up: z.enum(["PASS", "MINOR_ISSUE", "FAIL"]),
      brake_wire: z.enum(["PASS", "MINOR_ISSUE", "FAIL"]),
      front_tyre_condition: z.enum(["PASS", "FAIL"]),
      back_tyre_condition: z.enum(["PASS", "FAIL"]),
      tyre_pressure: z.enum(["PASS", "FAIL"]),
    }),
    step4: z.object({
      toolbox: z.enum(["OKAY", "DAMAGED", "NOT_AVAILABLE"]),
      right_side_body: z
        .array(z.string())
        .min(1, "At least one right side body image is required"),
      left_side_body: z
        .array(z.string())
        .min(1, "At least one left side body image is required"),
      front_tyre_side_view: z
        .string()
        .min(1, "Front tyre side view image is required"),
      front_number_plate: z.enum(["OKAY", "DAMAGED", "FADED"]),
      right_indicator: z.enum(["CRACKED", "DAMAGED", "OKAY"]),
      left_indicator: z.enum(["CRACKED", "DAMAGED", "OKAY"]),
      rear_number_plate: z.enum(["OKAY", "DAMAGE", "FADED"]),
      rear_mudguard: z.enum(["CRACKED", "DAMAGED", "OKAY"]),
      front_mudguard: z.enum(["RUSTED", "DAMAGED"]),
      right_orvm: z.enum(["PASS", "DAMAGED", "FAIL"]),
      left_orvm: z.enum(["PASS", "DAMAGED", "FAIL"]),
      back_photo: z.string().min(1, "Back photo is required"),
      battery_box_open_photo: z
        .string()
        .min(1, "Battery box open photo is required"),
      battery_qty: z.enum(["0", "1", "2"]),
      right_tail_light: z.enum(["CRACKED", "DAMAGED", "OKAY"]),
      left_tail_light: z.enum(["CRACKED", "DAMAGED", "OKAY"]),
      battery_box_lock: z.enum(["PASS", "FAIL"]),
    }),
    step5: z.object({
      keys_available: z.enum(["0", "1", "2"]),
      insurance_copy: z.enum(["PASS", "FAIL"]),
      rc_copy: z.enum(["PASS", "FAIL"]),
    }),
    step6: z.object({
      video_360: z.string().min(1, "360 video is required"),
    }),
  },
  // 3 Wheeler Validation Schema
  "3W": {
    step1: z.object({
      regNo: z.string().min(1, "Registration Number is required"),
      chassisNo: z.string().min(1, "Chassis Number is required"),
      makeAndModel: z.string().min(1, "Make & Model is required"),
      customerName: z.string().min(1, "Customer Name is required"),
      tranche_id: z.string().min(1, "Tranche ID is required"),
      auditLocation: z.string().min(1, "Audit Location is required"),
      current_location: z.string().min(1, "Current Location is required"),
      driverName: z.string().min(1, "Driver Name is required"),
    }),
    step2: z.object({
      front_photo: z.string().min(1, "Front photo is required"),
      front_tyre_photo: z.string().min(1, "Front tyre photo is required"),
      front_number_plate: z.enum(["OKAY", "MISSING", "FADE"]),
      front_windshield: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      right_head_light: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      left_head_light: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      right_indicator: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      left_indicator: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      front_mudguard: z.enum(["CRACKED", "MISSING", "OKAY"]),
      wiper: z.enum(["PASS", "FAIL", "DAMAGED"]),
      left_orvm: z.enum(["PASS", "FAIL", "MISSING"]),
      right_orvm: z.enum(["PASS", "FAIL", "MISSING"]),
    }),
    step3: z.object({
      cabin_photo: z.string().min(1, "Cabin photo is required"),
      dashboard_photo: z.string().min(1, "Dashboard photo is required"),
      odometer_photo: z.string().min(1, "Odometer reading photo is required"),
      odometer_reading: z.string().min(1, "Odometer reading is required"),
      gate_lock_left: z.enum(["PASS", "FAIL"]),
      gate_lock_right: z.enum(["PASS", "FAIL"]),
      left_cabin_glass: z.enum(["OKAY", "MISSING", "CRACKED"]),
      right_cabin_glass: z.enum(["OKAY", "MISSING", "CRACKED"]),
      display_meter: z.enum(["PASS", "FAIL"]),
      dashboard: z.enum(["PASS", "MINOR_DAMAGE", "MAJOR_DAMAGE"]),
      seat: z.enum(["PASS", "MINOR_DAMAGE", "MAJOR_DAMAGE"]),
      aux_battery: z.enum(["PASS", "MINOR_DAMAGE", "MAJOR_DAMAGE"]),
      jack_and_pana: z.enum(["YES", "NO"]),
      reverse_button: z.enum(["PASS", "FAIL"]),
      spare_tyre_status: z.enum(["YES", "NO"]),
      spare_tyre_photo: z.string().min(1, "Spare tyre photo is required"),
      fire_extinguisher: z.enum(["YES", "NO"]),
      ignition: z.enum(["PASS", "FAIL"]),
      throttle: z.enum(["PASS", "DAMAGED_BUT_WORKING", "FAIL"]),
      vehicle_running: z.enum(["PASS", "FAIL"]),
      handbrake: z.enum(["PASS", "FAIL"]),
      horn: z.enum(["PASS", "FAIL"]),
      charging_point: z.enum(["PASS", "FAIL", "DAMAGED"]),
      is_charging: z.enum(["PASS", "FAIL", "CHARGER_NOT_AVAILABLE"]),
    }),
    step4: z.object({
      right_side_view: z.string().min(1, "Right side view photo is required"),
      right_tyre: z.string().min(1, "Right tyre photo is required"),
      right_door: z.enum(["PASS", "RUSTED", "DAMAGED"]),
      left_side_view: z.string().min(1, "Left side view photo is required"),
      left_tyre: z.string().min(1, "Left tyre photo is required"),
      left_door: z.enum(["PASS", "RUSTED", "DAMAGED"]),
    }),
    step5: z.object({
      back_photo: z.string().min(1, "Back photo is required"),
      container_box_photo: z.string().min(1, "Container box photo is required"),
      bumper: z.enum(["PASS", "RUSTED", "FAIL"]),
      right_tail_light: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      left_tail_light: z.enum(["CRACKED", "DAMAGE", "OKAY"]),
      cargo_box_left: z.enum(["PASS", "RUSTED", "DENT", "DAMAGED"]),
      cargo_box_right: z.enum(["PASS", "RUSTED", "DENT", "DAMAGED"]),
      cargo_box_back: z.enum(["PASS", "RUSTED", "DENT", "DAMAGED"]),
      rear_number_plate: z.enum(["OKAY", "DAMAGE", "MISSING"]),
      cargo_box_lock: z.enum(["PASS", "FAIL"]),
    }),
    step6: z.object({
      underneath_photo: z.string().min(1, "Underneath photo is required"),
      back_frame_chassis: z.enum(["PASS", "DAMAGED", "WELDED"]),
    }),
    step7: z.object({
      keys_available: z.enum(["0", "1", "2"]),
      insurance_copy: z.enum(["PASS", "FAIL"]),
      rc_copy: z.enum(["PASS", "FAIL"]),
      onboard_charger: z.enum(["PASS", "FAIL"]),
    }),
    step8: z.object({
      video_360: z.string().min(1, "360 video is required"),
    }),
  },
};

export const getValidationSchema = (
  vehicleType: string,
  stepNumber: number
) => {
  type SchemaKey = keyof typeof AuditFormValidationSchema;
  type StepKey = keyof (typeof AuditFormValidationSchema)[SchemaKey];

  if (!vehicleType || !stepNumber) {
    throw new Error("Vehicle Type and Step Number are required");
  }

  const vehicleTypeKey = vehicleType as SchemaKey;
  const stepKey = `step${stepNumber}` as StepKey;

  return AuditFormValidationSchema[vehicleTypeKey][stepKey];
};

export default AuditFormValidationSchema;
