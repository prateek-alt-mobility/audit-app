import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Battery specific selectors
export const useBatterySerialNumber = () => useAppSelector((state) => state.battery.serialNumber);
export const useBatteryData = () => useAppSelector((state) => state.battery.batteryData);

export default useAppDispatch;
