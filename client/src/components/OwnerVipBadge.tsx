import { Crown } from "lucide-react";

export default function OwnerVipBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm ${className}`}
      data-testid="owner-vip-badge"
    >
      <Crown size={12} />
      VIP · Owner
    </span>
  );
}
