import { api } from './api';

// Define types for audit data
interface Audit {
  id: string;
  vehicleType: string;
  date: string;
  status: string;
  notes?: string;
  // Add other fields as needed
}

interface AuditFormData {
  vehicleType: string;
  notes?: string;
  // Add other fields as needed
}

// Extend the base API with audit-specific endpoints
export const auditApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all audits
    getAudits: builder.query<Audit[], void>({
      query: () => '/audits',
      // You can add transformResponse if needed
      // transformResponse: (response: any) => response.data,
    }),
    
    // Get a single audit by ID
    getAuditById: builder.query<Audit, string>({
      query: (id) => `/audits/${id}`,
      // transformResponse: (response: any) => response.data,
    }),
    
    // Create a new audit
    createAudit: builder.mutation<Audit, AuditFormData>({
      query: (auditData) => ({
        url: '/audits',
        method: 'POST',
        body: auditData,
      }),
      // Optimistically update the cache
      // This is optional but can improve UX
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data: newAudit } = await queryFulfilled;
          
          // Update the getAudits cache with the new audit
          dispatch(
            auditApi.util.updateQueryData('getAudits', undefined, (draft) => {
              draft.push(newAudit);
            })
          );
        } catch {
          // If the mutation fails, the cache will not be updated
        }
      },
    }),
    
    // Update an existing audit
    updateAudit: builder.mutation<Audit, { id: string; data: Partial<AuditFormData> }>({
      query: ({ id, data }) => ({
        url: `/audits/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // Optimistically update the cache
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        // Optimistic update for getAuditById
        const patchResult = dispatch(
          auditApi.util.updateQueryData('getAuditById', id, (draft) => {
            Object.assign(draft, data);
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
    
    // Delete an audit
    deleteAudit: builder.mutation<void, string>({
      query: (id) => ({
        url: `/audits/${id}`,
        method: 'DELETE',
      }),
      // Optimistically update the cache
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // Optimistic update for getAudits
        const patchResult = dispatch(
          auditApi.util.updateQueryData('getAudits', undefined, (draft) => {
            const index = draft.findIndex((audit) => audit.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAuditsQuery,
  useGetAuditByIdQuery,
  useCreateAuditMutation,
  useUpdateAuditMutation,
  useDeleteAuditMutation,
} = auditApi; 