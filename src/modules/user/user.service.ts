import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";

interface UserData {
	name: string;
	email: string;
	password: string;
	profile_image: string;
}
const registerUserIntoDB = async (payload: UserData) => {
	const { email, name, password, profile_image } = payload;
	const userExist = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (userExist) {
		throw Error("user already exists");
	}
	const hashPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_salt_round),
	);
	const newUser = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: hashPassword,
		},
	});
	await prisma.profile.create({
		data: {
			userId: newUser.id,
			profile_image,
		},
	});
	const user = await prisma.user.findUnique({
		where: {
			id: newUser.id,
			email: newUser.email || email,
		},
		omit: {
			password: true,
		},
		include: {
			profile: true,
		},
	});
	return user;
};

export const userService = {
	registerUserIntoDB,
};
