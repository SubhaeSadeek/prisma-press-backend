import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";

import config from "./config";
import { userRouter } from "./modules/user/user.router";

const app: Application = express();
app.use(
	cors({
		origin: config.app_url,
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
	res.send("Assalamuyalikum, this is Prisma Press Blog App!!!");
});
// Post router

app.use("/api/users", userRouter.router);
export default app;
