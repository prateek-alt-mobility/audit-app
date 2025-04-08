import { TestRun } from './batteryTestRun.interface';

export interface TestResultsResponse {
  statusCode: 200;
  status: 'success';
  message: 'Success';
  data: TestRun[];
} 