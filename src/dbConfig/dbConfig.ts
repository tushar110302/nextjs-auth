import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.connect(process.env.DB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
            process.exit();
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};