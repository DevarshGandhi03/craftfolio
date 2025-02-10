"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Copy, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function VerifyOtp({
  resendApiEndpoint,
  apiEndpoint,
  email,
  open,
  routerReplace,
  setOpen,
}) {
  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const { setUser } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/[^0-9]/.test(value)) {
      event.target.value = value.replace(/[^0-9]/g, "");
    }
  };

  const handelCloseChange = () => {
    setOpen(false);
  };
  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post("/api/users/" + resendApiEndpoint, {
        email: email,
      });
      toast({
        title: response.data.message,
      });
      setResendTimer(60);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    } finally {
      setResendLoading(false);
    }
  };

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await axios.post("api/users/" + apiEndpoint, {
        otp: data.otp,
        email,
      });
      handelCloseChange();
      toast({
        title: response.data.message,
      });

      if (response.data.data) {
        setUser(response.data.data);
      }
      router.replace(routerReplace);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md flex justify-center mx-4 p-10 flex-col">
        <DialogTitle>One-Time Password</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      onInput={handleInputChange}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col mt-2">
              {resendTimer > 0 ? (
                <p className="text-gray-900 text-[0.8rem]">
                  Resend OTP in{" "}
                  <span className="text-blue-500">{resendTimer}s</span>
                </p>
              ) : null}
              <div className="mt-2 flex">
                <Button type="submit" className="p-5 mr-2" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
                {resendTimer > 0 ? null : (
                  <Button
                    variant="outline"
                    onClick={handleResendOtp}
                    className="p-5"
                    disabled={resendLoading}
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
