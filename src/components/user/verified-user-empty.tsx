import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Hourglass } from "lucide-react";

export function VerifiedUserEmpty() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Hourglass />
          </EmptyMedia>

          <EmptyTitle>I'm verifying your account</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
