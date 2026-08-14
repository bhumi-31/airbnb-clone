"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
    { name: "All", type: null, icon: "🌎" },
    { name: "Villa", type: "Villa", icon: "🏡" },
    { name: "Apartment", type: "Apartment", icon: "🏢" },
    { name: "House", type: "House", icon: "🏠" },
    { name: "Cabin", type: "Cabin", icon: "🛖" },
    { name: "Cottage", type: "Cottage", icon: "🏡" },
];

export default function CategoryBar() {
    const router = useRouter();
    const params = useSearchParams();
    const category = params.get("category");

    const selectCategory = (type: string | null) => {
        router.push(type ? `/?category=${type}` : "/");
    };

    return (
        <div className="flex items-end gap-7">
            {categories.map((item) => (
                <button
                    key={item.name}
                    onClick={() => selectCategory(item.type)}
                    className={`cursor-pointer flex flex-col items-center gap-1 pb-2 text-sm ${
                        category === item.type
                            ? "border-b-2 border-black font-semibold text-black"
                            : "text-gray-500 hover:text-black"
                    }`}
                >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.name}</span>
                </button>
            ))}
        </div>
    );
}