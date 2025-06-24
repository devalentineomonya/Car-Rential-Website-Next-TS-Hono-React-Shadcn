"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const pathname = usePathname();

  const isNewUser = Boolean(user?.publicMetadata?.isNew);
  const isProfilePath = pathname === "/user/profile";

  return (
    <>
      {children}
      {!isNewUser && !isProfilePath && (
        <ProgressBar
          height="4px"
          color="hsl(var(--foreground))"
          options={{ showSpinner: !isNewUser }}
          shallowRouting
        />
      )}
    </>
  );
};
