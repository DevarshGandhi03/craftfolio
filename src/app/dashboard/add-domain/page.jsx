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
  const { user, userPortfolioDetails, isSubmitted } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isDomainVerified, setIsDomainVerified] = useState("");
  const [isDomainSaved, setIsDomainSaved] = useState(false);
  const [isDomainAdded, setIsDomainAdded] = useState(false);
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  const handleSaveDomain = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/domain/add", {
        customDomain: domain,
        username: userName,
      });

      if (response.data) {
        setIsDomainAdded(true);
        setIsDomainSaved(true);
      }
    } catch (error) {
      setIsDomainAdded(false);
      setIsDomainSaved(false);
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
      if (response.data.success) {
        setIsDomainSaved(true);
        setDomain(response.data.customDomain);
        setIsDomainVerified(response.data.status);
        setIsDomainAdded(true);
      }
    } catch (error) {
      setIsDomainSaved(false);
      setDomain("");
      setIsDomainVerified("pending");
      setIsDomainAdded(false);
      setVerificationStatus("");
    }

    setLoading(false);
  };
  const verifyDomain = async () => {
    setLoading(true);
    setVerificationStatus("");

    try {
      const response = await axios.get(`/api/domain/verify?domain=${domain}`);

      if (response.data.success) {
        const res = await axios.post("/api/domain/vercel", { domain: domain });
        setIsDomainVerified("verified");
        setVerificationStatus("✅ Your custom domain is added successfully!");
        setIsDomainSaved(true);
      } else {
        setVerificationStatus(
          "❌ Domain verification failed. Check DNS settings."
        );
      }
    } catch (error) {

      setVerificationStatus("❌ Error verifying domain. Try again later.");
    }

    setLoading(false);
  };
  const deleteDomain = async () => {
    try {
      const res = await axios.delete("/api/domain/deleteDomain", {
        data: { domain: domain },
      });
      if (res.data.success) {
        getDetails();
      }
    } catch (error) {
      setIsDomainSaved(false);
      setDomain("");
      setIsDomainVerified("pending");
      setIsDomainAdded(false);
      setVerificationStatus("");
    }
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
      <div className="md:pl-6 px-2 md:pr-0 md:mt-5 mt-10">
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

          {/* Input Field with shadcn */}
          <div className="bg-gray-50 shadow-sm p-4 rounded-lg mt-4">
            <Input
              disabled={loading || isDomainAdded}
              type="text"
              className="w-full"
              placeholder="Enter the domain as : yourdomain.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <Button
              className="mt-3"
              onClick={handleSaveDomain}
              disabled={loading || isDomainAdded}
            >
              {isDomainAdded ? "Saved" : loading ? "Saving..." : "Save Domain"}
            </Button>

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

          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h4 className="text-lg font-semibold text-gray-700">
              For Root Domain (<code>craftfolio.in</code>)
            </h4>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>
                <strong>Type:</strong> A
              </li>
              <li>
                <strong>Host:</strong> @
              </li>
              <li>
                <strong>Points to:</strong> <code>76.76.21.21</code> (Vercel's
                IP)
              </li>
              <li>
                <strong>TTL:</strong> 600
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h4 className="text-lg font-semibold text-gray-700">
              For <code>www.craftfolio.in</code> (Optional)
            </h4>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>
                <strong>Type:</strong> CNAME
              </li>
              <li>
                <strong>Host:</strong> www
              </li>
              <li>
                <strong>Points to:</strong> <code>www.craftfolio.in</code>
              </li>
              <li>
                <strong>TTL:</strong> 600
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Step 3: Verify Your Domain
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Once you've updated the DNS settings, click below to verify if your
            domain is properly linked.
          </p>

          <div className="bg-gray-50 shadow-sm flex p-4 rounded-lg mt-4">
            <Button
              onClick={verifyDomain}
              disabled={
                loading || isDomainVerified == "verified" || !isDomainAdded
              }
            >
              {isDomainVerified == "verified"
                ? "Verified"
                : loading
                ? "Checking..."
                : "Verify Domain"}
            </Button>
            <Button
              variant="destructive"
              onClick={deleteDomain}
              className={`w-40 ${isDomainSaved ? "block" : "hidden"} mx-5`}
            >
              Unlink Domain
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
