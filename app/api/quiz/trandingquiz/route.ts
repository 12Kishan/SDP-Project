import { Quiz } from '@/app/model/quiz';
import { connect } from "@/app/database/mongo.config";
import { NextResponse } from 'next/server';

connect()

export async function GET() {
    

    try {
        const trendingTopics = await Quiz.aggregate([
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        return NextResponse.json({ trendingTopics },{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' },{status :500});
    }
}

