import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Force delete if already exists (safe in dev with nodemon + ESM)
if (mongoose.models.message) {
  delete mongoose.models.message;
}

const Message = mongoose.model("message", messageSchema);
export default Message;
