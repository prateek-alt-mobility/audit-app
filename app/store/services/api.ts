import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for our API responses
interface Post {
  id: number;
  title: string;
  body: string;
}

// Create the API service
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    // Get a single post
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    // Create a new post
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation } = api;

export default api;
