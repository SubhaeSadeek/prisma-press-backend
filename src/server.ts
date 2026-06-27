import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port || 3000;
async function main() {
	try {
		await prisma.$connect();
		console.log("prisma db connected successfully");
		app.listen(port, () => {
			console.log(`app is listening to port ${port}`);
		});
	} catch (err) {
		console.error("Error Starting the server: ", err);
		await prisma.$disconnect();
		process.exit(1);
	}
}

main();
