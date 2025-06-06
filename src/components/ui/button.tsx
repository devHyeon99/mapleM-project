import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/80 dark:hover:bg-muted/30 ring-[#FFCC88]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground ring-[#FFCC88]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: React.ReactNode;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      tooltip,
      tooltipSide,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // 버튼 엘리먼트를 변수로 만듬
    const buttonElement = (
      <Comp
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref} // ref를 전달
        {...props}
      />
    );

    // tooltip prop이 없으면 버튼만 반환
    if (!tooltip) {
      return buttonElement;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
        <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
