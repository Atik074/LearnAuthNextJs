import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import mongoClientPromise from "./lib/mongoClientPromise";
import Credentials from "next-auth/providers/credentials"
import { userModel } from "./model/user-model";
import { dbConnect } from "./lib/mongo";




export const  {  
handlers: { GET, POST },
auth,
signIn,
signOut }  = NextAuth({
    adapter:MongoDBAdapter(mongoClientPromise ,{databaseName:process.env.ENVIRONMENT}) ,
    session:{
        strategy:"jwt"
    },

    providers:[
        
     Credentials({
        credentials: {
            email: {},
            password: {},

         },

         async  authorize(credentials) {
             if(credentials === null) return nul ;
             await dbConnect()

             try{
                 const user = await userModel.findOne({email:credentials?.email})
                 if(user){
                   const isMatch = user?.password === credentials.password

                   if(isMatch){
                    return user  ;
                   }else{
                    throw new Error("email and password does not match")
                   }
                 }else{
                    throw new Error("user not found")
                   }

             }catch(error){
               throw error ;
             }
         } 

     
     }) ,

        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
         clientSecret :process.env.GOOGLE_CLIENT_SECRETE
        })
    ] ,
    secret: process.env.AUTH_SECRETE
    
})