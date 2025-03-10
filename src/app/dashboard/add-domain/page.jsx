"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Portfolio() {
  const [domain, setDomain] = useState("");
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const { user, userPortfolioDetails, isSubmitted, getPortfolioDetails } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleSaveDomain = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/domain/add", {
        customDomain: domain,
        username: userName,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const getDetails = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get("/api/domain/getDetails", {
        headers: { userName },
      });
      setDomain(response.data.customDomain);
      setIsDomainVerified(response.data.isVerified);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const verifyDomain = async () => {
    setLoading(true);
    setVerificationStatus("");

    try {
      const response = await axios.get(`/api/domain/verify?domain=${domain}`);
      console.log(response);

      if (response.data.success) {
        const res = await axios.post("/api/domain/vercel", { domain: domain });
        console.log(res);
        setVerificationStatus("✅ Domain is successfully verified!");
      } else {
        setVerificationStatus(
          "❌ Domain verification failed. Check DNS settings."
        );
      }
    } catch (error) {
      console.log(error);
      setVerificationStatus("❌ Error verifying domain. Try again later.");
    }

    setLoading(false);
  };

  const handleDeleteDomain = async () => {
    if (!domain) {
      toast({
        title: "No domain to delete.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete("/api/domain/delete", {
        data: { domain },
      });

      if (response.data.success) {
        toast({
          title: "✅ Domain deleted successfully!",
        });
        setDomain(""); // Clear input after deletion
      } else {
        toast({
          title: "❌ Failed to delete domain.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "❌ Error deleting domain. Try again later.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  function setUserDetails() {
    if (isSubmitted && userPortfolioDetails) {
      setUserName(user.username);
    }
  }

  useEffect(() => {
    if (userName) {
      getDetails();
    }
  }, [userName]);

  useEffect(() => {
    setUserDetails();
  }, [isSubmitted]);

  useEffect(() => {
    if (!isSubmitted && userPortfolioDetails === false) {
      router.push("/dashboard/profile");
      toast({
        title: "Kindly provide your personal information first.",
        description:
          "To access this section, you will need to submit your personal information first.",
      });
    }
  }, [userPortfolioDetails, isSubmitted]);

  return isSubmitted ? (
    <div>
      <div className="md:pl-6 pl-0 md:mt-5 mt-3">
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-semibold mt-5 text-gray-800">
            Connect your custom domain to your portfolio website.
          </h2>
          <p className="text-sm text-gray-500">
            Make your portfolio truly yours by connecting a custom domain.
          </p>
          <hr />
        </div>

        {/* Step 1: Add Domain in Craftfolio */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Step 1: Add Your Domain in Craftfolio
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter your domain name below and click "Save Domain."
          </p>

          {/* Input Field with Delete Button */}
          <div className="bg-gray-50 shadow-sm p-4 rounded-lg mt-4">
            <Input
              type="text"
              className="w-full"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isDomainVerified}
            />
            <div className="flex gap-2 mt-3">
              {isDomainVerified ? null : (
                <Button onClick={handleSaveDomain} disabled={loading}>
                  {loading ? "Saving..." : "Save Domain"}
                </Button>
              )}

              {domain && (
                <Button
                  onClick={handleDeleteDomain}
                  variant="destructive"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Domain"}
                </Button>
              )}
            </div>
            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
        </div>

        {/* Step 2: Update DNS Settings */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Step 2: Update Your DNS Settings
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Log in to your domain provider (GoDaddy, Namecheap, etc.) and add
            the following DNS records:
          </p>
          {/* DNS Details (unchanged) */}
        </div>

        {/* Step 3: Verify Domain */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Step 3: Verify Your Domain
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Once you've updated the DNS settings, click below to verify if your
            domain is properly linked.
          </p>

          <div className="bg-gray-50 shadow-sm p-4 rounded-lg mt-4">
            <Button
              onClick={verifyDomain}
              disabled={loading || isDomainVerified}
            >
              {isDomainVerified
                ? "Verified"
                : loading
                ? "Checking..."
                : "Verify Domain"}
            </Button>
            {verificationStatus && (
              <p className="mt-2 text-sm">{verificationStatus}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
