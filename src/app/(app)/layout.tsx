import { BottomNav } from "@/components/layout/bottom-nav";
import { Header } from "@/components/layout/header";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1">
      <Sidebar className="hidden xl:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header className="hidden xl:flex" />
        <MobileTopBar className="xl:hidden" />
        <main
          id="main"
          className="mx-auto w-full max-w-[680px] flex-1 px-5 pt-[27px] pb-[calc(75px+env(safe-area-inset-bottom))] xl:mx-0 xl:max-w-none xl:pt-0 xl:pr-[32.129px] xl:pb-0 xl:pl-[20.969px]"
        >
          {children}
        </main>
      </div>
      <BottomNav className="xl:hidden" />
    </div>
  );
}
