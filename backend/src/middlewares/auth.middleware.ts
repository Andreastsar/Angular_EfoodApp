import { verify } from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
   const token = req.headers.auth_token as string;
   if (!token) {
      return res.status(401).send("Unauthorized Access!");
   }

   try {
      const decodeUser = verify(token, "Some Env Variable / private Key");
      req.user = decodeUser;
   } catch (err) {
      res.send(401).send("Unauthorized Access!");
   }

   return next();
};
