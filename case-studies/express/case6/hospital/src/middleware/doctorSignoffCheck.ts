import { Request, Response, NextFunction } from 'express';

export const doctorSignoffCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.doctorSigned) {
    return res.status(400).json({ 
      error: 'Doctor sign-off required before discharge.' 
    });
  }
  req.body.dischargeLog!.push({ step: 'doctorSignoff', time: new Date().toISOString() });
  req.body.currentStep = 'doctorSignoff';
  next();
};
