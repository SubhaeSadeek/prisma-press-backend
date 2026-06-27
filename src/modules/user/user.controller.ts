import type { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
const registerUser = async (req: Request, res: Response) => {
	const payload = req.body;
	const result = await userService.registerUserIntoDB(payload);

	res.status(httpStatus.CREATED).json({
		success: true,
		statusCode: httpStatus.CREATED,
		message: "user created successfully",
		data: result,
	});
};

export const userControllers = {
	registerUser,
};
