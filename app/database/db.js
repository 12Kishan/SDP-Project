import mongoose from "mongoose";
const connection = {}
export const dbconnect = async () => {
    try {
        if (connection.isConnected) {
            console.log("database already connected")
            return
        }
        const db = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "nextjs_project",
        });

        connection.isConnected = db.connections[0].readyState;

        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }

}
export default dbconnect