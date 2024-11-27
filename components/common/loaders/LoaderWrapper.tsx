import React from "react";
import Loader from "./Loader";

interface LoaderWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoaderWrapper = ({ isLoading, children }: LoaderWrapperProps) => {
  return (
    <div className={`relative w-full isolate`}>
      {isLoading && <Loader />}
      <div
        className={`h-full group ${isLoading ? "  pointer-events-none" : ""}`}
      >
        {children}
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-background/50 z-20"></div>
      )}
    </div>
  );
};

export default LoaderWrapper;
