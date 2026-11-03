You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
highlight-button.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

interface HighlightButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  highlightColor?: string
  highlightSize?: number
  borderColor?: string
}

function HighlightButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  highlightColor = "color-mix(in oklab, currentColor 55%, transparent)",
  highlightSize = 56,
  borderColor = "color-mix(in oklab, currentColor 58%, transparent)",
  children,
  onClick,
  ...props
}: HighlightButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || isClicked) return
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    [isClicked]
  )

  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false)
    setIsClicked(false)
  }, [])

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setClickPosition({ x, y })
      setIsClicked(true)
      onClick?.(e)
    },
    [onClick]
  )

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      asChild={asChild}
      className={cn(
        "relative overflow-hidden px-6 py-5 shadow-sm transition-[border-color,box-shadow,transform]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        borderColor: isHovering ? borderColor : undefined,
        borderWidth: isHovering ? "1px" : undefined,
      }}
      {...props}
    >
      {isHovering && !isClicked && (
        <div
          className="pointer-events-none absolute rounded-full transition-transform duration-100 ease-out"
          style={{
            left: position.x,
            top: position.y,
            width: highlightSize,
            height: highlightSize,
            backgroundColor: highlightColor,
            transform: "translate(-50%, -50%)",
            opacity: isHovering ? 1 : 0,
            filter: "blur(24px)",
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 rounded-md bg-current/[0.04]" />

      {isClicked && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: clickPosition.x,
            top: clickPosition.y,
            backgroundColor: highlightColor,
            transform: "translate(-50%, -50%)",
            animation: "highlight-button-ripple 0.6s ease-out forwards",
          }}
        />
      )}

      <span className="relative z-10 inline-flex items-center justify-center text-inherit [&>p]:!m-0 [&>p]:!inline [&>p]:!text-sm [&>p]:!font-medium [&>p]:!leading-none [&>p]:!text-inherit">
        {children}
      </span>
    </Button>
  )
}

export { HighlightButton, type HighlightButtonProps }

export default HighlightButton


demo.tsx
"use client";

import { HighlightButton } from "@/components/ui/highlight-button";

export default function Default() {
  return (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center gap-6 bg-background p-12">
      <HighlightButton>Hover Me</HighlightButton>
      <HighlightButton
        highlightColor="rgba(59, 130, 246, 0.65)"
        borderColor="rgba(59, 130, 246, 0.8)"
      >
        Blue Glow
      </HighlightButton>
      <HighlightButton
        highlightColor="rgba(168, 85, 247, 0.65)"
        borderColor="rgba(168, 85, 247, 0.8)"
      >
        Purple Glow
      </HighlightButton>
      <HighlightButton
        highlightColor="rgba(34, 197, 94, 0.65)"
        borderColor="rgba(34, 197, 94, 0.8)"
      >
        Green Glow
      </HighlightButton>
    </div>
  );
}

```

Install NPM dependencies:
```bash
react, tailwindcss, tw-animate-css, @radix-ui/react-slot, class-variance-authority
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --radius: 0.5rem;
}

.dark {
  --sidebar-ring: oklch(0.439 0 0);
}


@keyframes highlight-button-ripple {
  0% {
    opacity: 1;
    width: 0;
    height: 0;
  }
  to {
    opacity: 0;
    width: 200%;
    height: 200%;
  }
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
