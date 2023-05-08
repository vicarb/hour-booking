import { NextApiRequest, NextApiResponse } from 'next';


interface Appointment {
    service: string;
    time: string;
  }
  
  const appointments: Record<string, Appointment[]> = {
    '2023-05-10': [
      { service: 'Medical Check', time: '09:00' },
      { service: 'Teeth Check', time: '11:00' },
    ],
    '2023-05-11': [
      { service: 'Massage', time: '14:00' },
    ],
  };
  
  export default function handler(req: NextApiRequest, res: NextApiResponse) {
   
  
    if (req.method === 'POST') {
      const { service, date, time } = req.body;
  
      if (!appointments[date]) {
        appointments[date] = [];
      }
  
      appointments[date].push({ service, time });
      res.status(201).json({ message: 'Appointment created' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }

export {appointments};