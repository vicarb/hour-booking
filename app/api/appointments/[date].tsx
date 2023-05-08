import { NextApiRequest, NextApiResponse } from 'next';
import { appointments } from './index';

interface BookedHour {
  time: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { date } = req.query;

    const bookedHours: BookedHour[] = appointments[date as string]?.map((appointment) => ({ time: appointment.time })) || [];
    res.status(200).json({ bookedHours });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
