const mongoose =require ("mongoose");


const connection=async ()=>{
   try{
   await mongoose.connect(process.env.MONGO_URI)
    console.log('mongoDB connect')
   }
   catch(error){
     console.log('connection failed',error. message)
   }

} 


module.exports= connection;