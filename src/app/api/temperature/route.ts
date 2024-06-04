import client from '@/mqtt/client';
import { NextResponse } from 'next/server';

const topic = '/v1.6/devices/frigo-guardian/temperatura/lv';
let latestData: any = null;

const handleMessage = (receivedTopic: string, message: any) => {
  if (receivedTopic === topic) {
    latestData = message.toString();
  }
};
client.subscribe(topic);
client.on('message', handleMessage);

export async function GET() {
  return NextResponse.json({ message: latestData });
}
