"use client";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    return (
        <div
            className={`fixed right-6 top-6 z-[100] flex min-w-[320px] items-center gap-3 rounded-xl px-5 py-4 text-white shadow-lg ${
                type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
            <span className="text-xl">
                {type === "success" ? "✓" : "✕"}
            </span>

            <p className="flex-1 text-sm font-medium">{message}</p>

            <button
                onClick={onClose}
                className="cursor-pointer text-lg opacity-80 hover:opacity-100"
            >
                ×
            </button>
        </div>
    );
}