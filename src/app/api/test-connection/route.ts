import { NextRequest } from 'next/server';
import { POST as testAIHandler } from '../ai/test/route';

// Alias route for direct connection diagnostics requested by user
export async function POST(req: NextRequest) {
  return testAIHandler(req);
}
