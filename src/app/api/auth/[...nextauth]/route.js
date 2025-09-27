import { comparePass } from "@/components/helpers/bcrypt/hashPassword";
import connectDB from "@/components/utils/connectDB";
import VIPFOODUSERS from "@/models/vipFoodUsers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { userName, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("we cant connect to DB");
        }
        const user = await VIPFOODUSERS.findOne({ userName : userName });
        console.log(user)
        if (!user) {
          throw new Error("we cant find this account");
        }
        const isValid = await comparePass(password, user.password);
        if (!isValid) {
          throw new Error("your password is wrong");
        }
        return {
          email: user._id
        };
      },
    }),
  ],
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
