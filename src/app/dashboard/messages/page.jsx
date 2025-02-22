"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/context/authContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { userPortfolioDetails, isSubmitted,getPortfolioDetails } = useContext(AuthContext);
  const router = useRouter();

  function setUserMessages() {
    if (isSubmitted && userPortfolioDetails) {
      setMessages(userPortfolioDetails.contactMessages);
    }
  }

  async function deleteMessage(index) {
    let msgArr = [...messages];
    msgArr = msgArr.filter((_, i) => i !== index);
    setMessages(msgArr);
    setDeleteIndex(null);
    const response = await axios.post("/api/users/update-portfolio-details", {
      portfolioId: userPortfolioDetails._id,
      contactMessages: msgArr,
    });
    getPortfolioDetails()
  }
  useEffect(() => {
    setUserMessages();
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
    <div className="w-full md:p-6 pt-6 mt-6  ">
      <h2 className="md:text-5xl text-3xl  font-bold text-gray-700 ">Messages</h2>
      <div>
        <div className="flex flex-col gap-2 mb-6 md:mt-10 mt-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact Messages
          </h2>
          <p className="text-sm text-gray-500">
            Messages and details from the contact section of your portfolio
            website will be displayed here.
          </p>
          <hr className="border-gray-300" />
        </div>
        {messages.length !== 0 ? (
          <div className="flex flex-wrap gap-2">
            {messages.map((message, index) => (
              <Card
                key={index}
                className="p-4 shadow-md flex-1 min-w-[300px] max-w-[48%] relative"
              >
                <AlertDialog
                  open={deleteIndex === index}
                  onOpenChange={(open) => !open && setDeleteIndex(null)}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      onClick={() => setDeleteIndex(index)}
                    >
                      &#x2715;
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogHeader>Delete Message</AlertDialogHeader>
                    <p>Are you sure you want to delete this message?</p>
                    <AlertDialogFooter>
                      <Button
                        onClick={() => setDeleteIndex(null)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => deleteMessage(index)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <CardContent className="text-sm text-gray-600">
                  <p className="font-semibold">Name:</p>
                  <p>{message.sendersName}</p>
                </CardContent>
                <CardContent className="text-sm text-gray-600">
                  <p className="font-semibold">Email:</p>
                  <p>{message.sendersEmail}</p>
                </CardContent>
                <CardContent className="text-sm text-gray-600">
                  <p className="font-semibold">Message:</p>
                  <p>{message.sendersMessage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-600 text-lg">No messages to display</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Messages;
