import { Skeleton } from "../ui/skeleton";

export default function CartItemSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            {/* Checkbox skeleton */}
            <Skeleton className="h-5 w-5 rounded" />

            {/* Image skeleton */}
            <Skeleton className="h-24 w-20 rounded-lg" />

            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-20" />
            </div>

            {/* Quantity controls skeleton */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-8 rounded" />
            </div>

            {/* Remove button skeleton */}
            <Skeleton className="h-8 w-8 rounded" />
        </div>
    );
}
