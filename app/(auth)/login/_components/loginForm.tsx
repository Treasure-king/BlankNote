import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login, signup } from "../actions"
import SignInWithGoogleButton from "./SignInWithGoogleButton"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-transparent">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl text-white font-roboto">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <SignInWithGoogleButton />
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-gray-300 *:data-[slot=field-separator-content]:text-black *:data-[slot=field-separator-content]:rounded-full">
                                Or continue with
                            </FieldSeparator>
                            <Field>
                                <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline text-white"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" name="password" type="password" className="text-white" required />
                            </Field>
                            <Field>
                                <Button type="submit" formAction={signup} className="cursor-pointer  hover:bg-white/100 hover:text-black border-[1px] border-white">Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/signup" className="hover:!text-white">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#" className="hover:!text-white">Terms of Service</a>{" "}
                and <a href="#" className="hover:!text-white">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
