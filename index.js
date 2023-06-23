import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.get('/ds', (req, res) => {
    res.send();
});

app.get('/tg', (req, res) => {
    res.status(200);
    res.send();
})


function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found');
    next(error);
}

function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(res.statusCode || 500);
    res.json({
        message: error.message
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port', port);
});