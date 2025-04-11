import { api } from './api';
import { StartDeviceResponse } from './interfaces/batteryDevice.interface';
import { CommandDetailData, CommandDetailResponse } from './interfaces/batteryDeviceCommand.interface';
import { ApprovalRequest } from './interfaces/batteryTestApproval.interface';
import { TestResultsResponse } from './interfaces/batteryTestResults.interface';
import { RunTestRequest, SimpleSuccessResponse, TestResultIdData, TestResultIdResponse, TestRun } from './interfaces/batteryTestRun.interface';
import { BatteryTest, BatteryTestsResponse } from './interfaces/batteryTests.interface';

/**
 * Custom hook to poll a test run until it completes
 * 
 * @example
 * // In your component:
 * const { data, isLoading } = useGetTestResultIdQuery('test-id');
 * 
 * // Start polling when a test is run
 * React.useEffect(() => {
 *   if (data?.status === "Pending") {
 *     const intervalId = setInterval(() => {
 *       refetch();
 *       if (data?.status === "Success" || data?.status === "Failed") {
 *         clearInterval(intervalId);
 *       }
 *     }, 5000);
 *     
 *     return () => clearInterval(intervalId);
 *   }
 * }, [data, refetch]);
 */

// Extend the base API with battery diagnostic specific endpoints
export const batteryDiagnosticApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all battery diagnostic tests
    getBatteryTests: builder.query<BatteryTest[], string | undefined>({
      query: (batterySerialNumber) => 
        batterySerialNumber 
          ? `/battery/battery-diagnostic-tool/tests/${batterySerialNumber}`
          : `/battery/battery-diagnostic-tool/tests`,
      // Transform the response to extract the data array
      transformResponse: (response: BatteryTestsResponse) => response.data,
    }),

    // Run a battery diagnostic test
    runBatteryTest: builder.mutation<SimpleSuccessResponse, RunTestRequest>({
      query: (requestData) => ({
        url: '/battery/battery-diagnostic-tool/run-test',
        method: 'POST',
        body: requestData,
      }),
      // No need to transform the response as we want to return the entire object
    }),

    // Get a test result by ID 
    getTestResultId: builder.mutation<TestResultIdData, string>({
      query: (testRunId) => ({
        url: `/battery/battery-diagnostic-tool/test/${testRunId}`,
        method: 'GET',
      }),
      // Transform the response to extract the data
      transformResponse: (response: TestResultIdResponse) => response.data,
    }),

    // Get all test results for a specific test
    getAllTestResults: builder.query<TestRun[], string>({
      query: (testId) => ({
        url: `/battery/battery-diagnostic-tool/test/${testId}/results`,
        method: 'GET',
      }),
      // Transform the response to extract the data array
      transformResponse: (response: TestResultsResponse) => response.data,
    }),

    // Approve or reject a test
    approveTest: builder.mutation<SimpleSuccessResponse, ApprovalRequest>({
      query: (requestData) => ({
        url: '/battery/battery-diagnostic-tool/test/approve',
        method: 'POST',
        body: requestData,
      }),
      // No need to transform the response as we want to return the entire object
    }),

    // Start a battery device by ID
    startBattery: builder.mutation<{ message: string }, string>({
      query: (deviceId) => ({
        url: `/battery/battery-diagnostic-tool/start-device/${deviceId}`,
        method: 'POST',
      }),
      // Transform the response to extract the message
      transformResponse: (response: StartDeviceResponse) => ({
        message: response.message,
      }),
    }),

    // Get device command details by ID
    getDeviceCommandDetail: builder.query<CommandDetailData, string>({
      query: (commandId) => ({
        url: `/battery/device/command-detail/${commandId}`,
        method: 'GET',
      }),
      // Transform the response to extract the data
      transformResponse: (response: CommandDetailResponse) => response.data,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetBatteryTestsQuery,
  useRunBatteryTestMutation,
  useGetTestResultIdMutation,
  useGetAllTestResultsQuery,
  useApproveTestMutation,
  useGetDeviceCommandDetailQuery,
  useStartBatteryMutation,
} = batteryDiagnosticApi;