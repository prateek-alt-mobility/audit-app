import { ApprovalStatus, TestStatus, TestType } from './batteryEnums';

export interface BatteryTest {
  id: string;
  test_name: string;
  test_description: string;
  test_type: TestType;
  test_ran_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface TestRunResponse {
  statusCode: 200;
  status: 'success';
  message: 'Success';
  data: TestRun;
}

export interface Approval {
  id: string;
  test_id: string;
  approved_by: string;
  status: ApprovalStatus;
  created_at: string;
  updated_at: string;
}

export interface TestRun {
  id: string;
  device_id: string;
  test_id: string;
  test_type: TestType;
  status: TestStatus;
  created_at: string;
  updated_at: string;
  test: BatteryTest;
  approval: Approval | null;
}

export interface RunTestRequest {
  device_id: string;
  test_id: string;
} 