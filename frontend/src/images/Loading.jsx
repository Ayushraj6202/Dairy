import React from "react";

export default function LoadingComp() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white bg-orange-400">
      </div>
    </div>
  );
}
