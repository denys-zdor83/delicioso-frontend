import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        
    } catch (error) {
        console.log('[Checkout Callback] Error:', error);
        return NextResponse.json({ error: 'Server error' });
    }
}