import app from "./app";

const port = process.env.PORT || 5000;
function main() {
	try {
		app.get("/", (req, res) => {
			res.send("Assalamuyalikum, this is Prisma Press Blog App!!!");

			app.listen(port, () => {
				console.log(`app is listening to port ${port}`);
			});
		});
	} catch (err) {
		console.error("Error Starting the server: ", err);
		process.exit(1);
	}
}

main();
