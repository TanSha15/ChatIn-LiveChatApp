import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


//SIGNUP-----------------------------------------------------------------------------------------
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 3) {
      return res.status(400).json({ message: "Password too short" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists!" });
    }


    const avatar = `https://ui-avatars.com/api/?name=${fullName}`

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: avatar,
    });

    //create in stream app also-----------------
    try {
      await upsertStreamUser({
        id:newUser._id.toString(),
        name:fullName,
        image:newUser.profilePic || ""
      })
      console.log(`Stream user created for id:${newUser.fullName}`)
    } catch (error) {
      console.error("error while upserting user in controller section(signup)")
    }
    //-------------------------------------------

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });


    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss error
      sameSite: "strict",  //prevent csrf attack
      secure: process.env.NODE_ENV !== "development",
    });

    //SUCCESS send userData
    res.status(201).json({
        success : true,
        user : newUser
    });

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Error while creating user!" });
  }
};

//LOGIN--------------------------------------------------------------------------------------
export const login = async (req, res) => {
  try {
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({message : "Invalid! fields are not allowed"});
    }
    const user  = await User.findOne({email});

    if(!user){
      return res.status(401).json({message : "Invalid credentials!"});
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if(!isPasswordCorrect){
      return res.status(401).json({message : "Invalid email or password!"})
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });


    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss error
      sameSite: "strict",  //prevent csrf attack
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({success:true,user,token})
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ message: "Error while logging user!" });
  }
};

//LOGOUT--------------------------------------------------------------------------------------
export const logout = async (req, res) => {
  try {
    await res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful!",
  });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ message: "Error while logout user!" });
  }
};


//ONBOARDING----------------------------------------------------------------------------------------------
export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
    } = req.body;

    // Correct validation
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true,  //set onBoarding true
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // update Stream user here (optional)----------------------------
    try {
      await upsertStreamUser({
        id:updatedUser._id.toString(),
        name:updatedUser.fullName,
        image:updatedUser.profilePic || ""
      })
      console.log(`Stream user updated for:${updatedUser.fullName}`)
    } catch (error) {
      console.error("error while upserting user in controller section(onboarding)")
    }
    //------------------------------------------------

    res.status(200).json({
      success: true,
      message: "Onboarding done successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in onboarding controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while onboarding user",
    });
  }
};