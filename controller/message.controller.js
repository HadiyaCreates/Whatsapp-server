// // import Message from "../model/Message.js"
// // import Conversation from "../model/Conversation.js";
// // export const newMessage = async(request,response)=>{
// //   try {
// //     const newMessage = new Message(request.body);

// //     await newMessage.save();
// //     await Conversation.findByIdAndUpdate(request.body.conversation,{message:request.body.text})

// //     return response.status(200).json('Message has been sent successfully')
// //   } catch (error) {
// //         return res.status(500).json({ message: error.message });
// //   }
// // }
// // export const getMessage = async(request,response)=>{
// //   try {
// //     const message = await Message.find({conversationId:request.params.id});

// //     return response.status(200).json(message);
// //   } catch (error) {
// //         return res.status(500).json({ message: error.message });
// //   }
// // }

// import Message from "../model/Message.js"
// import Conversation from "../model/Conversation.js"

// export const newMessage = async (request, response) => {
//   try {
//     const newMessage = new Message(request.body)
//     await newMessage.save()
//     await Conversation.findByIdAndUpdate(
//       request.body.conversationId,
//       { message: request.body.text }
//     )
//     return response.status(200).json('Message has been sent successfully')
//   } catch (error) {
//     return response.status(500).json({ message: error.message })
//   }
// }

// export const getMessage = async (request, response) => {
//   try {
//     const message = await Message.find({ conversationId: request.params.id })
//     return response.status(200).json(message)
//   } catch (error) {
//     return response.status(500).json({ message: error.message })
//   }
// }
import Message from "../model/Message.js";
import Conversation from "../model/Conversation.js";

// export const newMessage = async (request, response) => {
//   try {
//     // Log the incoming request body
//     console.log("📥 Incoming message payload:", request.body);

//     // Validate required fields
//     const { conversationId, senderId, receiverId, text } = request.body;
//     if (!conversationId || !senderId || !receiverId || !text) {
//       return response.status(400).json({ message: "Missing required fields" });
//     }

//     // Save the new message
//     const newMessage = new Message({
//       conversationId,
//       senderId,
//       receiverId,
//       text,
//     });

//     await newMessage.save();

//     // Update the last message in the conversation
//     const updated = await Conversation.findByIdAndUpdate(
//       conversationId,
//       { message: text },
//       { new: true }
//     );

//     console.log("✅ Conversation updated:", updated);

//     return response.status(200).json("Message has been sent successfully");
//   } catch (error) {
//     console.error("❌ Error in newMessage:", error);
//     return response.status(500).json({ message: error.message });
//   }
// };
export const newMessage = async (request, response) => {
  try {
    const { conversationId, senderId, receiverId, text, type } = request.body;

    if (!conversationId || !senderId || !receiverId || !text) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    // Save message with type
    const newMessage = new Message({
      conversationId,
      senderId,
      receiverId,
      text,
      type: type || 'text', // default to 'text' if not provided
    });

    await newMessage.save();

    // Update last message in conversation
    const updated = await Conversation.findByIdAndUpdate(
      conversationId,
      { message: text },
      { new: true }
    );

    console.log("✅ Conversation updated:", updated);

    return response.status(200).json("Message has been sent successfully");
  } catch (error) {
    console.error("❌ Error in newMessage:", error);
    return response.status(500).json({ message: error.message });
  }
};

export const getMessage = async (request, response) => {
  try {
    const { id } = request.params;
    console.log("🔍 Fetching messages for conversation:", id);

    const messages = await Message.find({ conversationId: id });

    return response.status(200).json(messages);
  } catch (error) {
    console.error("❌ Error in getMessage:", error);
    return response.status(500).json({ message: error.message });
  }
};
