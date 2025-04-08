import { ApprovalStatus } from './batteryEnums';
import { Approval } from './batteryTestRun.interface';

export interface ApprovalRequest {
  testId: string;
  approvedBy: string;
  status: ApprovalStatus;
}

export interface ApprovalResponse {
  statusCode: 200;
  status: 'success';
  message: 'Success';
  data: Approval;
} 