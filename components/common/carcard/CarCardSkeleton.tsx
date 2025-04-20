import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const CarCardSkeleton = () => (
  <Card className="rounded-md w-full max-h-fit">
    <CardHeader className="p-2 flex-row items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </CardHeader>
    <CardContent className="p-3">
      <Skeleton className="h-48 w-full rounded-lg" />
    </CardContent>
    <CardFooter className="p-3 flex-col item-start justify-center space-y-4">
      <div className="w-full space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Separator className="my-1" />
      <div className="w-full flex flex-wrap gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
      </div>
    </CardFooter>
  </Card>
);
export default CarCardSkeleton;
