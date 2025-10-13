import { NextResponse } from 'next/server';

// Temporary in-memory storage (you can replace with a database)
let aboutData = {
  name: 'Default Artist',
  bio1: 'This is a sample bio line 1.',
  bio2: 'This is a sample bio line 2.',
  bio3: 'This is a sample bio line 3.',
  stats: {
    years: 0,
    exhibitions: 0,
    collectors: 0,
  },
};

// 🟢 GET — Portfolio frontend fetches About data
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: aboutData,
    });
  } catch (error) {
    console.error('❌ Error serving About data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to load About data' },
      { status: 500 }
    );
  }
}

// 🟠 POST — Admin panel sends updates here
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Update local data
    aboutData = {
      name: body.name,
      bio1: body.bio1,
      bio2: body.bio2,
      bio3: body.bio3,
      stats: {
        years: Number(body.years) || body.stats?.years || 0,
        exhibitions: Number(body.exhibitions) || body.stats?.exhibitions || 0,
        collectors: Number(body.collectors) || body.stats?.collectors || 0,
      },
    };

    console.log('✅ Received data from Admin Panel:', aboutData);

    return NextResponse.json({
      success: true,
      message: 'About data updated successfully!',
      data: aboutData,
    });
  } catch (error) {
    console.error('❌ Error receiving About data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to receive About data' },
      { status: 500 }
    );
  }
}
