import { TestType } from './batteryEnums';

export enum TestStatus {
  NotStarted = 'NotStarted',
  Success = 'Success',
  Failed = 'Failed',
  Pending = 'Pending'
}

export interface BatteryTest {
  test_id: string;
  test_name: string;
  test_description: string;
  test_type: TestType;
  status: TestStatus;
}

export interface BatteryTestsResponse {
  statusCode: 200;
  status: 'success';
  message: 'Success';
  data: BatteryTest[];
} 