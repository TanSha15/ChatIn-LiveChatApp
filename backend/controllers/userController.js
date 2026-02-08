import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

//GET FRIENDS LISTS------------------------------------------------------------------------------------
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getFriends usercontroller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while getting Friends user",
    });
  }
};

//GET RECOMMENDED USERS-------------------------------------------------------------------------------
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const RecommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current users friedns  //HERER ADDED $->_
        { isOnboarded: true },
      ],
    });

    res.status(200).json(RecommendedUsers);
  } catch (error) {
    console.error("Error in getRecommended user controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while recommending user",
    });
  }
};

//SEND FRIEND REQUEST---------------------------------------------------------------------------------

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    //prervent sending request to myself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "Can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "Receipent not found!" });
    }

    //check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    //check if request already exist
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend Request already exist between you two" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in getRecommended user controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while recommending user",
    });
  }
};

//accept Friend request--------------------------------------------------------------------------------
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest)
      return res.status(404).json({ message: "Friend request Not found" });

    //verify the current user is the recipient
    if (friendRequest.recipient.toString() != req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept the request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to other's friends array
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });

  } catch (error) {
    console.error(
      "Error in acceptFriendRequest usercontroller:",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "Error while accepting friend request user",
    });
  }
};

//get Friend requests list------------------------------------------------------------------------------
export const getFriendRequests = async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage",
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic nativeLanguage profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("Error in showing list usercontroller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while showing friendrequests user",
    });
  }
};

//get outgoing friends requests-------------------------------------------------------------------------
export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName ProfilePic nativeLanguage learningLanguage",
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in showing list usercontroller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while showing friendrequests user",
    });
  }
};