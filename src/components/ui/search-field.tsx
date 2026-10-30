import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const SEARCH_ICON = { src: "/icons/search.svg", width: 24.879, height: 24.879 };

export interface SearchFieldProps {
  action: string;
  name: string;
  placeholder: string;
  className?: string;
}

export function SearchField({ action, name, placeholder, className }: SearchFieldProps) {
  return (
    <form
      role="search"
      method="get"
      action={action}
      className={cn(
        "flex h-[53.739px] w-[441.852px] shrink-0 overflow-clip rounded-search border-[0.995px] border-input bg-(image:--gradient-search) outline-offset-2 outline-ring transition-colors hover:border-edge-strong has-focus-visible:outline-2",
        className
      )}
    >
      <label className="flex flex-1 cursor-text items-center gap-[18.908px] px-[23.884px]">
        <Icon {...SEARCH_ICON} />
        <span className="sr-only">{placeholder}</span>
        <input
          type="search"
          name={name}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-search font-normal text-foreground placeholder:text-placeholder focus-visible:outline-none"
        />
      </label>
    </form>
  );
}
