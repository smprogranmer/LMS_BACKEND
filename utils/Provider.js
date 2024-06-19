// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { users as User} from "../models/Users.model.js";


// export const connectPassPort = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_SECRET,
//         callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       },
//       async function (accessToken, refreshToken, profile, done) {
//         // dataBase come here
//         try {
//           const user = await User.findOne({
//             googleId:profile.id
//         })
//         console.log("🚀 ~ user:", profile.emails[0].value)

//         if(!user){
//             const newUser = await User.create({
//                 name:profile.displayName,
//                 email:profile.emails[0].value,
//                 googleId:profile.id,
//             })
//             console.log("🚀 ~ newUser:", newUser)
//             return done(null,newUser)
//         }else{
//             return done(null,user)
//         }
//         } catch (error) {
//          console.log("eroro form ",error) 
//         }
//       }
//     )
//   );

//   passport.serializeUser((user,done) =>{
//     done(null,user)
//     console.log(user)
//   })

//   passport.deserializeUser( async (id,done) =>{

//     const user = User.findById(id)
//     done(null,user)
//   })
// };
