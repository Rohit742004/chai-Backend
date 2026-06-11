import dns from "dns";
import mongoose from "mongoose";
import { DB_NAME } from "../contents.js";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI?.trim();
        if (!uri) throw new Error("MONGODB_URI is not defined");

        const dnsServers = dns.getServers();
        console.log("Node DNS servers:", dnsServers);
        if (dnsServers.includes("127.0.0.1")) {
            dns.setServers(["8.8.8.8", "1.1.1.1"]);
            console.log("Switched DNS servers to:", dns.getServers());
        }

        console.log("Connecting to MongoDB with URI:", uri);
        const connectionInstance = await mongoose.connect(uri, {
            dbName: DB_NAME,
        });

        console.log(`MongoDB connected. Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB