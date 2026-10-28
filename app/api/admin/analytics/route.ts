import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { adminAuth, serviceAccount } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

const propertyId = process.env.GA4_PROPERTY_ID;

function getClient() {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: serviceAccount.clientEmail,
      private_key: serviceAccount.privateKey,
    },
  });
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = await adminAuth.verifyIdToken(token);
    if (decoded.admin !== true) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!propertyId) {
      return NextResponse.json({ error: 'GA4_PROPERTY_ID not configured' }, { status: 500 });
    }

    const client = getClient();
    const property = `properties/${propertyId}`;

    const [daily] = await client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const [topPages] = await client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    });

    const [countries] = await client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    });

    const [devices] = await client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
    });

    const [totals] = await client.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    const [realtime] = await client.runRealtimeReport({
      property,
      metrics: [{ name: 'activeUsers' }],
    });

    return NextResponse.json({ daily, topPages, countries, devices, totals, realtime });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
