import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="group relative">
            {/* Image skeleton */}
            <Skeleton className="aspect-[3/4] w-full rounded-lg" />

            {/* Title skeleton */}
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Price skeleton */}
            <Skeleton className="mt-2 h-5 w-20" />
        </div>
    );
}
