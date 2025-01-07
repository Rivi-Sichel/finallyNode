import { connect } from "mongoose"
export function connectToDB(){
    connect(process.env.DB_URL)
    .then(con => console.log("mongo DB connected"))
    .catch(err=>{
        console.log("cannot connect to DB", err)
        process.exit(1)
        
    })
}