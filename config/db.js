import mongoose from "mongoose";
const mongodb_url = async (req, res) => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`);
    console.log(
      `Mongodb connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    process.exit(1);
  }
};

export default mongodb_url;
