import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthenticatedUser: builder.query({
      query: () => "user",
      providesTags: ["AuthUser"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "post",
        body: { ...credentials },
      }),
    }),
    socialMediaLogin: builder.mutation({
      query: (credentials) => ({
        url: "auth/social/google",
        method: "post",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "post",
        body: { ...credentials },
      }),
    }),
    forgetPass: builder.mutation({
      query: (credentials) => ({
        url: "auth/forgot-password",
        method: "post",
        body: { ...credentials },
      }),
    }),
    verifyPhone: builder.mutation({
      query: (credentials) => ({
        url: "auth/verify/phone",
        method: "post",
        body: { ...credentials },
      }),
    }),
    resendOTP: builder.mutation({
      query: (credentials) => ({
        url: "auth/verify/phone/resend",
        method: "post",
        body: { ...credentials },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "auth/reset-password",
        method: "post",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetAuthenticatedUserQuery,
  useLoginMutation,
  useSocialMediaLoginMutation,
  useRegisterMutation,
  useForgetPassMutation,
  useVerifyPhoneMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
} = authApiSlice;
