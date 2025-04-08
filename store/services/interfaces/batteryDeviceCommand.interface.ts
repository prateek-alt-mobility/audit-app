// Interface for device command details

export interface CommandDetailItem {
  count: number;
  set_on: string;
}

export interface CommandDetailData {
  is_start: boolean;
  lease_days: CommandDetailItem;
  discharge_ah: CommandDetailItem;
  charge_ah: CommandDetailItem;
}

export interface CommandDetailResponse {
  statusCode: number;
  status: string;
  message: string;
  data: CommandDetailData;
} 