import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
            process.exit();
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};