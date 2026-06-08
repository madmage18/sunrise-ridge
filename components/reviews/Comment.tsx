"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Comment({ comment }: { comment: string }) {
  // comment with 130+ words... excess text is hidden
  const [isExpanded, setIsExpanded] = useState(false);

  //toggle state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // bool
  const longComment = comment.length > 120;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment; // either the full comment if less than 130 or the truncated longer comment.

  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}

export default Comment;
