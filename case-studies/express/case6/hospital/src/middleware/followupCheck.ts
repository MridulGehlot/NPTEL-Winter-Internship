import { Request, Response, NextFunction } from 'express';

export const followupCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.followupScheduled) {
    return res.status(400).json({ 
      error: 'Follow-up appointment must be scheduled.' 
    });
  }
  req.body.dischargeLog!.push({ step: 'followupCheck', time: new Date().toISOString() });
  next();
};
