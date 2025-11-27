import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  console.log("In the callback"); // Log to check if we're entering the callback

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // Check if 'next' is set properly, default to '/' if not
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    next = '/'  // Default to home if 'next' is not a valid relative path
  }
  
  console.log(`Code received: ${code}`); // Debugging line to check if code is passed
  console.log(`Redirecting to: ${next}`); // Check where we're redirecting to

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'

        if (isLocalEnv) {
          console.log("In local dev environment"); // Log for local dev check
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          console.log(`Redirecting to production host: https://${forwardedHost}${next}`);
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          console.log(`Redirecting to origin: ${origin}${next}`);
          return NextResponse.redirect(`${origin}${next}`)
        }
      } else {
        console.error("Supabase error during code exchange:", error.message)
      }
    } catch (err) {
      console.error("Error during code exchange:", err)
    }
  }

  // If there's no code or error, redirect to login with an error message
  console.log("Redirecting to login due to error or missing code");
  return NextResponse.redirect(`${origin}/login?message=Couldn't login with the provider`)
}
