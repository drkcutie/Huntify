import { createContext } from "react";
import { FeedContextType } from "@/app/(routes)/feed/page";

export const FeedContext = createContext<FeedContextType | undefined>(
  undefined,
);