import { axiosInstance } from "./axios";


export const signupData = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

/* ONBOARDING */

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

/*GETFRIENDS AND RECOMMENDED USER*/
export const getUserFriends = async()=>{
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export const getRecommendedUsers = async()=>{
  const response = await axiosInstance.get("/users");
  return response.data;
}

export const getOutgoingFriendReqs = async()=>{
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}