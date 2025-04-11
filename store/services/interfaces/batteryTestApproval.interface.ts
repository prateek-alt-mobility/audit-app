import { ApprovalStatus } from './batteryEnums';

export interface ApprovalRequest {
  result_id: string;
  approved_by: string;
  status: ApprovalStatus;
} 