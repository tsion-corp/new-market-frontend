import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:cursor-default disabled:opacity-40 [&_img]:pointer-events-none [&_img]:shrink-0",
  {
    variants: {
      variant: {
        send: "w-[156.639px] gap-[4.41px] bg-(image:--gradient-send) px-[13.784px] py-[16.29px] text-wallet-button-mobile text-on-light shadow-send-mobile xl:w-[142.068px] xl:gap-1 xl:px-[12.502px] xl:py-[14.775px] xl:text-wallet-button xl:shadow-send [&_img]:size-[21.709px] xl:[&_img]:size-[19.69px]",
        receive:
          "band-ring h-[53.884px] w-[145.361px] gap-[4.41px] bg-tint-strong py-[16.29px] pr-[13.784px] pl-[15.037px] font-mona-sans text-wallet-button-mobile text-foreground [--band-ring-width:1.253px] band-ring-gradient xl:h-[48.871px] xl:w-[131.839px] xl:gap-1 xl:py-[14.775px] xl:pr-[12.502px] xl:pl-[13.639px] xl:text-wallet-button xl:[--band-ring-width:1.137px] [&_img]:size-[21.709px] xl:[&_img]:size-[19.69px]",
        play: "band-ring gap-[7.91px] bg-tint p-[11.337px] text-play-mobile text-foreground shadow-play-mobile [--band-ring-width:1.045px] band-ring-gradient xl:gap-[11.132px] xl:p-[15.955px] xl:text-play xl:shadow-play xl:[--band-ring-width:1.471px] [&_img]:h-[12.853px] [&_img]:w-[18.132px] xl:[&_img]:h-[18.089px] xl:[&_img]:w-[25.518px]",
        "outcome-yes":
          "h-[35.49px] rounded-outcome-mobile border-[0.91px] border-outcome-yes-border bg-outcome-yes-surface text-outcome-mobile text-outcome-yes xl:h-[44.571px] xl:rounded-outcome xl:border-[1.143px] xl:text-outcome",
        "outcome-no":
          "h-[35.49px] rounded-outcome-mobile border-[0.91px] border-outcome-no-border text-outcome-mobile text-outcome-no xl:h-[44.571px] xl:rounded-outcome xl:border-[1.143px] xl:text-outcome",
      },
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  Required<VariantProps<typeof buttonVariants>> & {
    asChild?: boolean;
  };

export function Button({ className, variant, asChild = false, type, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);
  if (asChild) {
    return <Slot.Root data-slot="button" className={classes} {...props} />;
  }
  return <button data-slot="button" type={type ?? "button"} className={classes} {...props} />;
}
