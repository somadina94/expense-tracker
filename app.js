const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./util/appError");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(helmet());

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip address, try again in 1hour.",
});
app.use("/api", limiter);

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(hpp());
app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
