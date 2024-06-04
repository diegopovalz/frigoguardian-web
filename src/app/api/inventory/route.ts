import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const projectDir = path.join(
    process.env.HOME || '/home/pi2',
    'Documents/Projects/frigoguardian'
  );
  const filePath = path.join(projectDir, 'inventory.jpg');

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Photo does not exist' },
        { status: 404 }
      );
    }

    const data = fs.readFileSync(filePath);
    return NextResponse.json({ data: data.toString('base64') });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read photo' },
      { status: 500 }
    );
  }
}
