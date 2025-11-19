"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import bg from "@/public/images/background.jpg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Types and Schemas
type FormType = "signup" | "login";

const authFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authFormSchema>;

// API Service Layer
const authService = {
  signup: async (data: AuthFormData) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    return response.json();
  },

  login: async (data: AuthFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  },
};

// Custom Hook for Auth Form Logic
const useAuthForm = (formType: FormType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (formType === "signup") {
        await authService.signup(data);
      }

      // Login (both after signup and direct login)
      await authService.login(data);

      // Success path
      router.push("/");
      toast({
        title:
          formType === "signup"
            ? "Account created successfully"
            : "Logged in successfully",
      });
    } catch (error) {
      const errorMessage =
        "Failed to " + (formType === "signup" ? "sign up" : "log in");
      toast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};

// Form Component
const AuthForm = ({ formType }: { formType: FormType }) => {
  const { form, isLoading, onSubmit } = useAuthForm(formType);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label className="text-base font-semibold">Email</Label>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label className="text-base font-semibold">Password</Label>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full gap-2"
          variant="destructive"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {formType === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

// Auth Card Component
const AuthCard = ({ formType }: { formType: FormType }) => {
  const isSignUp = formType === "signup";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isSignUp ? "Create a new Account" : "Log In to your account"}
        </CardTitle>
        <CardDescription>
          Enter your email{" "}
          {isSignUp ? "and set a new password" : "and password"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm formType={formType} />
      </CardContent>
    </Card>
  );
};

// Page Component
const AuthPage = () => {
  return (
    <>
      <Image
        src={bg}
        layout="fill"
        objectFit="cover"
        alt="Background"
        className="opacity-40 blur-sm -z-40"
      />
      <div className="flex items-center min-h-screen justify-center px-8">
        <Tabs
          defaultValue="Sign Up"
          className="w-[400px] bg-black rounded-sm shadow-lg p-8"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
            <TabsTrigger value="Log In">Log In</TabsTrigger>
          </TabsList>

          <TabsContent value="Sign Up">
            <AuthCard formType="signup" />
          </TabsContent>

          <TabsContent value="Log In">
            <AuthCard formType="login" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AuthPage;
