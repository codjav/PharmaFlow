import * as RadixSelect from "@radix-ui/react-select";
import {
    Check,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import { cn } from "@/lib/cn";

const Select = ({
    label,
    placeholder = "Select...",
    options = [],
    value,
    onValueChange,
    error,
    required = false
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}
            <RadixSelect.Root
                value={value}
                onValueChange={onValueChange}
            >
                <RadixSelect.Trigger
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 text-sm",
                        error && "border-red-500"
                    )}
                >
                    <RadixSelect.Value placeholder={placeholder} />
                        <RadixSelect.Icon>
                            <ChevronDown size={18} />
                        </RadixSelect.Icon>
                </RadixSelect.Trigger>

                <RadixSelect.Portal>
                    <RadixSelect.Content 
                        className="overflow-hidden rounded-xl border bg-white shadow-lg"
                    >
                        <RadixSelect.ScrollUpButton>
                            <ChevronUp size={18} />
                        </RadixSelect.ScrollUpButton>

                        <RadixSelect.Viewport>
                            {
                                options.map(option => (
                                    <RadixSelect.Item
                                        key={option.value}
                                        value={option.value}
                                        className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-slate-100"
                                    >
                                        <RadixSelect.ItemText>
                                            {option.label}
                                        </RadixSelect.ItemText>

                                        <RadixSelect.ItemIndicator>
                                            <Check size={16} />
                                        </RadixSelect.ItemIndicator>
                                    </RadixSelect.Item>
                                ))
                            }
                        </RadixSelect.Viewport>
                    </RadixSelect.Content>
                </RadixSelect.Portal>

            </RadixSelect.Root>
            {
                error && (
                    <p className="text-xs text-red-500">
                        {error}
                    </p>
                )
            }
        </div>
    )
}

export default Select;