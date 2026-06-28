import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
type TMeta = {
	page: number;
	lilmit: number;
	total: number;
};

type TResponse<T> = {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	meta?: TMeta;
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
	res.status(data.statusCode).json({
		success: data.success,
		statusCode: data.statusCode,
		message: data.message,
		data: data.data,
		meta: data.meta,
	});
};

const registerUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;

		const result = await userService.registerUserIntoDB(payload);

		// fres.status(httpStatus.CREATED).json({
		// 	success: true,
		// 	statusCode: httpStatus.CREATED,
		// 	message: "user created successfully",
		// 	data: result,
		// });
		sendResponse(res, {
			success: true,
			statusCode: httpStatus.CREATED,
			message: "user created successfully",
			data: result,
		});
	},
);

export const userControllers = {
	registerUser,
};
