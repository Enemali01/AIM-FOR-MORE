import {connect, set} from 'mongoose'

set('strictQuery', true);

export const connectDB = async () => {
    connect(process.env.DB_URI, {
      useNewUrlParser:true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected")
    })
    .catch((error) => {
      console.log(error)
    })
}
