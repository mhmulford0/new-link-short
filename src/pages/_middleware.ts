import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/api/get-slug-data")) {
    console.log("bust out early");
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  const res = await fetch(`${req.nextUrl.origin}/api/get-slug-data/${slug}`);
  const data = await res.json();

  if (data?.url) {
    console.log(data);
    return NextResponse.redirect(data.url);
  }

  return NextResponse.json({ error: "No data found" });
}
