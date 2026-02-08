import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key or secret is missing");
}

export const streamClient = StreamChat.getInstance(
  apiKey,
  apiSecret
);

//Create / update Stream user
export const upsertStreamUser = async (userData) => {    //id is must
  try {
    if (!userData.id) {
      throw new Error("Stream user must have an id");
    }
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error creating Stream user:", error.message);
    throw error;
  }
};

// 🔐 Generate Stream token
export const generateStreamToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate Stream token");
  }
  return streamClient.createToken(userId);
};