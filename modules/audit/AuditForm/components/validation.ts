import { z } from "zod";

// 2 Wheel Validation Schema
export const step1ValidationSchema_2Wheel = z.object({
  regNo: z.string().min(1, "Registration Number is required"),
  chassisNo: z.string().min(1, "Chassis Number is required"),
  makeAndModel: z.string().min(1, "Make & Model is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  tranche_id: z.string().min(1, "Tranche ID is required"),
  auditLocation: z.string().min(1, "Audit Location is required"),
  current_location: z.string().min(1, "Current Location is required"),
});

// 3 Wheel Validation Schema
