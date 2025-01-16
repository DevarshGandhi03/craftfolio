"use client";
import { GalleryVerticalEnd, Loader2, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignupLoading from "./animated/SignupLoading";
import Link from "next/link";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/authSchema";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { VerifyOtp } from "./VerifyOtp";

export function AuthForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/"+props.apiendpoint, e);
      setEmail(e.email);
      toast({
        title: response.data.message,
      });
      setSuccess(true);
      setOpen(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-row justify-center items-center", className)}
      {...props}
    >
      {success ? (
        <VerifyOtp apiEndpoint={"verify-"+props.apiendpoint} email={email} open={open} routerReplace={props.routerreplace} setOpen={setOpen} />
      ) : (null)}

      <div className="w-full  lg:w-3/6 md:w-7/12">
        <Form {...form}>
          <form
            className="flex flex-col justify-center items-center h-screen "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6 w-2/3 ">
              <div className="flex flex-col items-center gap-2">
                <Link
                  href="/"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                    <ScrollText size={40} />
                  </div>
                </Link>
                <h1 className="text-3xl font-bold">Welcome to CraftFolio</h1>
                <div className="text-center text-sm">
                  {props.text}?{" "}
                  
                  <Link href="/signin" className="underline underline-offset-4">
                    {props.text2}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          placeholder="user@example.com"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    props.submitbtntxt
                  )}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  OR
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" className="w-full" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button variant="outline" className="w-full " disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="lg:w-3/6 flex items-center justify-center">
        <SignupLoading loop={loading} play={loading} />
      </div>
    </div>
  );
}
