import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Testing MongoDB connection...");
    
    const client = await clientPromise;
    console.log("✅ MongoDB connected successfully");
    
    const db = client.db();
    console.log("✅ Database name:", db.databaseName);
    
    // Test if we can access the users collection
    const usersCollection = db.collection("users");
    const userCount = await usersCollection.countDocuments();
    console.log("✅ Users collection accessible. User count:", userCount);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      databaseName: db.databaseName,
      userCount: userCount
    });
    
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Database connection failed"
    }, { status: 500 });
  }
}