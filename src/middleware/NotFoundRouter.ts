import { Request, Response } from "express";

const NotFound = (req: Request, res: Response) => {
    res.status(400).send({
        message: "Route Not Found",
        path: req.originalUrl,
        date: Date.now().toLocaleString()
    })
};

export default NotFound;