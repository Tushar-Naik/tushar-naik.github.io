import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

const Alert = React.forwardRef(({ className, children, ...props }, ref) => (
    <AlertDialogPrimitive.Root>
        <AlertDialogPrimitive.Trigger asChild>
            <div
                ref={ref}
                className={`bg-destructive text-destructive-foreground p-4 rounded-lg ${className}`}
                {...props}
            >
                {children}
            </div>
        </AlertDialogPrimitive.Trigger>
    </AlertDialogPrimitive.Root>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={`font-medium leading-none tracking-tight ${className}`}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={`text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
