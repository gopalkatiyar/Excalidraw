import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";


interface JwtPayload {
  userId: string; // or number
}

 interface AuthenticatedRequest extends Request {
	 userId?: string;
}

export function middleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const token = req.headers["authorization"] ?? "";

	const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

	if (decoded) {
		req.userId = decoded.userId;
		next();
	}
	else {
		res.status(403).json({
			message:"Unauthorized"
		})
	}
}