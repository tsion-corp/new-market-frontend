import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { AVATAR_SRC, NOTIFICATIONS_ICON } from "./account-assets";
import { Logo } from "./logo";

type MobileTopBarProps = {
  className?: string;
};

export function MobileTopBar({ className }: MobileTopBarProps) {
  return (
    <header className={cn("sticky top-0 z-10 bg-background", className)}>
      <div className="mx-auto flex w-full max-w-[697px] items-center justify-between px-[28.5px] pt-12">
        <Link href="/profile" aria-label="Your profile" className="block rounded-full">
          <Avatar src={AVATAR_SRC} alt="" size="md" ring />
        </Link>
        <Logo variant="compact" />
        <IconButton
          href="/notifications"
          aria-label="Notifications, unread"
          variant="glass"
          icon={NOTIFICATIONS_ICON}
        />
      </div>
    </header>
  );
}
