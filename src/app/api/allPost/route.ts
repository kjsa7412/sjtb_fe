import {NextRequest, NextResponse} from "next/server";

import {getAllPosts} from "@/utils/postUtil";

export async function GET() {
    return NextResponse.json(getAllPosts(), { status: 200 });
}