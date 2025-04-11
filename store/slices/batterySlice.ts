import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BatteryState {
  serialNumber: string;
  batteryData: {
    plantCode?: string;
    modelNo?: string;
    serialNumber?: string;
    date?: string;
    bmsModelNo?: string;
    bmsNumber?: string;
    softwareVersion?: string;
  };
  testResultIds: Record<string, string>; // Store test result IDs by test ID
  isLoading: boolean;
  error: string | null;
}

const initialState: BatteryState = {
  serialNumber: "",
  batteryData: {},
  testResultIds: {},
  isLoading: false,
  error: null,
};

const batterySlice = createSlice({
  name: "battery",
  initialState,
  reducers: {
    setSerialNumber: (state, action: PayloadAction<string>) => {
      state.serialNumber = action.payload;
    },
    setBatteryData: (state, action: PayloadAction<BatteryState["batteryData"]>) => {
      state.batteryData = action.payload;
    },
    setTestResultId: (state, action: PayloadAction<{ testId: string; resultId: string }>) => {
      const { testId, resultId } = action.payload;
      state.testResultIds[testId] = resultId;
    },
  
   
    parseQRCodeData: (state, action: PayloadAction<string>) => {
      const qrData = action.payload;
      
      try {
        // Extract data from QR code format
        const plantCodeMatch = qrData.match(/Plant COde - ([^\n]+)/);
        const modelNoMatch = qrData.match(/Model No - ([^\n]+)/);
        const serialNumberMatch = qrData.match(/Serial Number - ([^\n]+)/);
        const dateMatch = qrData.match(/Date - ([^\n]+)/);
        const bmsModelNoMatch = qrData.match(/BMS Model No. -([^\n]+)/);
        const bmsNumberMatch = qrData.match(/BMS Number - ([^\n]+)/);
        const softwareVersionMatch = qrData.match(/Software Vr - ([^\n]+)/);
        
        // Update state with extracted data
        state.batteryData = {
          plantCode: plantCodeMatch ? plantCodeMatch[1].trim() : undefined,
          modelNo: modelNoMatch ? modelNoMatch[1].trim() : undefined,
          serialNumber: serialNumberMatch ? serialNumberMatch[1].trim() : undefined,
          date: dateMatch ? dateMatch[1].trim() : undefined,
          bmsModelNo: bmsModelNoMatch ? bmsModelNoMatch[1].trim() : undefined,
          bmsNumber: bmsNumberMatch ? bmsNumberMatch[1].trim() : undefined,
          softwareVersion: softwareVersionMatch ? softwareVersionMatch[1].trim() : undefined,
        };
        
        // Set the serial number separately for easy access
        if (serialNumberMatch) {
          state.serialNumber = serialNumberMatch[1].trim();
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
        state.error = "Failed to parse QR code data";
      }
    },
    clearBatteryData: (state) => {
      state.serialNumber = "";
      state.batteryData = {};
      state.testResultIds = {};
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setSerialNumber, 
  setBatteryData, 
  setTestResultId,

  parseQRCodeData, 
  clearBatteryData, 
  setError, 
  clearError 
} = batterySlice.actions;

export default batterySlice.reducer; 