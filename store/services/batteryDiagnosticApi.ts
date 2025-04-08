import { api } from './api';
import { ApprovalRequest, ApprovalResponse } from './interfaces/batteryTestApproval.interface';
import { TestResultsResponse } from './interfaces/batteryTestResults.interface';
import { Approval, RunTestRequest, TestRun, TestRunResponse } from './interfaces/batteryTestRun.interface';
import { BatteryTest, BatteryTestsResponse } from './interfaces/batteryTests.interface';

/**
 * Custom hook to poll a test run until it completes
 * 
 * @example
 * // In your component:
 * const { data, isLoading } = useGetBatteryTestRunByIdQuery('test-id');
 * 
 * // Start polling when a test is run
 * React.useEffect(() => {
 *   if (data?.status === TestStatus.Pending) {
 *     const intervalId = setInterval(() => {
 *       refetch();
 *       if (data?.status === TestStatus.Success || data?.status === TestStatus.Failed) {
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
    getBatteryTests: builder.query<BatteryTest[], void>({
      query: () => ({
        url: '/battery/battery-diagnostic-tool/tests',
        method: 'GET',
      }),
      // Transform the response to extract the data array
      transformResponse: (response: BatteryTestsResponse) => response.data,
    }),

    // Run a battery diagnostic test
    runBatteryTest: builder.mutation<TestRun, RunTestRequest>({
      query: (requestData) => ({
        url: '/battery/battery-diagnostic-tool/run-test',
        method: 'POST',
        body: requestData,
      }),
      // Transform the response to extract the data
      transformResponse: (response: TestRunResponse) => response.data,
    }),

    // Get a specific test run by ID
    getBatteryTestRunById: builder.query<TestRun, string>({
      query: (testRunId) => ({
        url: `/battery/battery-diagnostic-tool/test/${testRunId}`,
        method: 'GET',
      }),
      // Transform the response to extract the data
      transformResponse: (response: TestRunResponse) => response.data,
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
    approveTest: builder.mutation<Approval, ApprovalRequest>({
      query: (requestData) => ({
        url: '/battery/battery-diagnostic-tool/test/approve',
        method: 'POST',
        body: requestData,
      }),
      // Transform the response to extract the data
      transformResponse: (response: ApprovalResponse) => response.data,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetBatteryTestsQuery,
  useRunBatteryTestMutation,
  useGetBatteryTestRunByIdQuery,
  useGetAllTestResultsQuery,
  useApproveTestMutation,
} = batteryDiagnosticApi; 