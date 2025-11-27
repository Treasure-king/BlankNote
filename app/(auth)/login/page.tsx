import { createClient } from '@/utils/supabase/server'
import { LoginForm } from './_components/loginForm'
import { redirect } from 'next/navigation'

export default async function LoginPage() {

      const supabase = await createClient()
      const { data, error } = await supabase.auth.getUser()
      
      if (data?.user) {
        redirect('/')
      }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#171717]'><LoginForm/></div>
    )
}