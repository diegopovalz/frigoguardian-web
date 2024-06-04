import mqtt from 'mqtt';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = mqtt.connect('mqtt://localhost:1883');

  client.on('connect', () => {
    client.publish('frigo-guardian/camara/capturar', 'capture', () => {
      client.end();
      NextResponse.json({ message: 'Photo capture triggered' });
    });
  });

  client.on('error', (error) => {
    console.error(`MQTT error: ${error}`);
    NextResponse.json(
      { error: 'Failed to trigger photo capture' },
      { status: 500 }
    );
  });
}
