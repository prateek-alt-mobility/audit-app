import { TestType } from './batteryEnums';

export interface Threshold {
  id: string;
  parameter: 'charge_ah';
  min_value: number;
  max_value: number;
  unit: 'Ah';
  created_at: string;
  updated_at: string;
}

export interface BatteryTest {
  id: string;
  test_name: string;
  test_description: string;
  test_type: TestType;
  test_ran_time: string | null;
  thresholds: Threshold[];
  created_at: string;
  updated_at: string;
}

export interface BatteryTestsResponse {
  statusCode: 200;
  status: 'success';
  message: 'Success';
  data: BatteryTest[];
} 