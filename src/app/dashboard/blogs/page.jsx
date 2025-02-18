"use client";

import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { Link, Unlink } from "lucide-react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function HashnodeConnect() {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConected] = useState(false);
  const [error, setError] = useState(null);
  const { userPortfolioDetails, isSubmitted } = useContext(AuthContext);
  const router= useRouter()

  async function setUserName() {
    if (isSubmitted && userPortfolioDetails.hashnodeUsername) {
      setUsername(userPortfolioDetails.hashnodeUsername);
      setIsConected(true);
    }
  }

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `/api/hashnode?username=${username.trim()}`
      );
      if (!response.data.success)
        throw new Error("Failed to fetch posts. Please check the username.");

      const data = await response.data.data;
      // console.log(data);

      setPosts(data);
      setIsConected(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setUserName();
  }, [isSubmitted]);

  useEffect(() => {
    if (!isSubmitted && userPortfolioDetails === false) {
      console.log("reached");

      router.push("/dashboard/profile");
      toast({
        title: "Kindly provide your personal information first.",
        description:
          "To access this section, you will need to submit your personal information first.",
      });
    }
  }, []);

  useEffect(() => {
    if (username && isConnected) {
      fetchPosts();
    }
  }, [username]);

  async function handelUnlink() {
    setLoading(true);
    try {
      setUsername("");
      setIsConected(false);
      setPosts([]);
      const res = await axios.post("/api/users/update-portfolio-details", {
        portfolioId: userPortfolioDetails._id,
        hashnodeUsername: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a valid username.");
      return;
    }

    setLoading(true);
    setError(null);
    setPosts([]);

    try {
      const res = await axios.post("/api/users/update-portfolio-details", {
        portfolioId: userPortfolioDetails._id,
        hashnodeUsername: username,
      });
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    isSubmitted?
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-y-6">
      <div className="w-full">
        <h2 className="text-5xl font-bold text-gray-700">Blogs</h2>
      </div>
      <div className=" mt-5">
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Link your Hashnode account.
          </h2>
          <p className="text-sm text-gray-500">
            Blogs from your Hashnode account will be showcased on your portfolio
            website.
          </p>
          <hr />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-4 mb-6 items-center justify-center"
        >
          <Input
            type="text"
            placeholder="Enter your Hashnode username"
            value={username}
            disabled={isConnected}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow h-12 w-24"
          />
          {isConnected ? (
            <Button
              className="h-12 w-24"
              type="button"
              disabled={loading}
              onClick={handelUnlink}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Unlink />
                  Unlink
                </>
              )}
            </Button>
          ) : (
            <Button className="h-12 w-28" type="submit" disabled={loading}>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Link />
                  Connect
                </>
              )}
            </Button>
          )}
        </form>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-md">
                <CardHeader>
                  <img
                    src={post.coverImage?.url || "/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-bold">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.brief}</CardDescription>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 underline"
                  >
                    Read More
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && !error && (
          <p className="text-gray-600 text-center">
            No posts found. Try another username.
          </p>
        )}
      </div>
    </div>:<Loading/>
  );
}
