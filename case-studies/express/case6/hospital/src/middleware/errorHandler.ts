import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const log = req.body.dischargeLog || [];
  console.error('[CityCare ERROR] Discharge failed:', {
    error: err.message,
    log,
    url: req.url,
    body: req.body
  });
  
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    dischargeLog: log,
    timestamp: new Date().toISOString()
  });
};
