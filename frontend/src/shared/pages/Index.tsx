import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-8">
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <pre>
        Edit <code>src/pages/Index.tsx</code> and save to test HMR
      </pre>
    </div>
  );
}

export default Index;
