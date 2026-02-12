import { Request, Response, NextFunction } from 'express';

export function logDischargeRequest(req: Request, res: Response, next: NextFunction)
{
req.body.dischargeLog = req.body.dischargeLog || [];
req.body.dischargeLog.push({ step: "requestReceived", time: new Date().toISOString() });
console.log(`Dischare Request Arrived for Patient ${req.body.patientName}`);
next();
};
