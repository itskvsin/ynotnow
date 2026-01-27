import { Skeleton } from "../ui/skeleton";

export default function OrderCardSkeleton() {
    return (
        <div className="bg-white border-b">
            <div className="flex items-center lg:max-w-full lg:justify-evenly px-4 py-6 gap-6">
                {/* Product image skeleton */}
                <div className="flex items-center gap-4 flex-1">
                    <Skeleton className="w-20 h-24 rounded-lg" />

                    {/* Order info skeleton */}
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>

                {/* Payment status skeleton */}
                <div className="hidden md:block md:w-1/4">
                    <Skeleton className="h-4 w-20 mx-auto" />
                </div>

                {/* Delivery status skeleton */}
                <div className="hidden md:block md:w-1/4">
                    <Skeleton className="h-4 w-24 mx-auto" />
                </div>

                {/* Button skeleton */}
                <div className="flex justify-end">
                    <Skeleton className="h-8 w-16 rounded-full" />
                </div>
            </div>
        </div>
    );
}
