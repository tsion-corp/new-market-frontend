import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { SearchField } from "@/components/ui/search-field";
import { cn } from "@/lib/utils";
import { AVATAR_SRC, NOTIFICATIONS_ICON } from "./account-assets";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 box-content h-[55.729px] items-center justify-between bg-background pt-[21.893px] pr-[14.927px] pb-[25.932px] pl-[22.889px]",
        className
      )}
    >
      <SearchField action="/search" name="q" placeholder="Search Market" />
      <div className="flex items-center gap-[18px] pr-[16.918px]">
        <IconButton
          href="/notifications"
          aria-label="Notifications, unread"
          variant="glass"
          icon={NOTIFICATIONS_ICON}
        />
        <Link href="/profile" aria-label="Your profile" className="block rounded-full">
          <Avatar src={AVATAR_SRC} alt="" size="lg" ring />
        </Link>
      </div>
    </header>
  );
}
