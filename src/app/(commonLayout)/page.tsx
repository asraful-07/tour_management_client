import { Button } from "@/components/ui/button";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click me
      </Button>
      <h1>HomePage</h1>
    </div>
  );
}
