"use client"

import { useState } from "react";
import { YweetCard } from "@/components/YweetCard";
import type { Yweet } from "@/types/yweets";
import { useAuth } from "@/auth/AuthProvider"
import { PostYweetForm } from "@/components/PostYweetForm";

type TimelineFeedProps = {
  initialYweets: Yweet[];
};

export function TimelineFeed({ initialYweets }: TimelineFeedProps) {
  const [yweets, setYweets] = useState<Yweet[]>(initialYweets);
  const { user } = useAuth();
  const isLoggedIn = !!user;
  function handlePosted(created: Yweet) {
    setYweets((prev) => [created, ...prev]);
  }

  return (
    <>
      {isLoggedIn && <PostYweetForm onPosted={handlePosted} />}
      {yweets.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-gray-500">
          まだ Yweet がありません
        </p>
      ) : (
        yweets.map((yweet) => (
          <YweetCard
            key={yweet.id}
            username={yweet.user.username}
            content={yweet.content}
            avatarUrl={yweet.user.avatar}
          />
        ))
      )}
    </>
  );
}