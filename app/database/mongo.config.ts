import mongoose from "mongoose";

export async function connect() {
    await mongoose.connect(process.env.DB_URL as string, {
        tls: true,
        ssl: true
    }).then(() => {
   
    }).catch((err) => {

    })
}