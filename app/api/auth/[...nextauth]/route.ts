import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Add error handling wrapper
const handler = async (req: Request, context: any) => {
  try {
    return await NextAuth(req, context, authOptions);
  } catch (error) {
    console.error('NextAuth error:', error);
    
    // Return a proper JSON error response
    return new Response(
      JSON.stringify({ 
        error: 'Authentication error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }), 
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
};

export { handler as GET, handler as POST };