const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

app.get("/", verifyToken, (req, res) => {
	res.json({ message : "ok"});
});

app.use("/users", verifyToken, userRouter);
app.use("/auth", authRouter);

/* Error handling middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
