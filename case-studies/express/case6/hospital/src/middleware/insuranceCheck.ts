import { Request, Response, NextFunction } from 'express';

export const insuranceCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.insuranceApproved) {
    return res.status(403).json({ 
      error: 'Insurance approval required before discharge.' 
    });
  }
  req.body.dischargeLog!.push({ step: 'insuranceApproved', time: new Date().toISOString() });
  next();
};
