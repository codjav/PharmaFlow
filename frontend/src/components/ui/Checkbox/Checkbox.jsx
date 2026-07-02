import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = ({
    checked,
    onCheckedChange,
    label
}) => {

    return (

        <label className="flex cursor-pointer items-center gap-3">

            <RadixCheckbox.Root
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="flex h-5 w-5 items-center justify-center rounded border"
            >

                <RadixCheckbox.Indicator>
                    <Check size={14} />
                </RadixCheckbox.Indicator>

            </RadixCheckbox.Root>

            <span className="text-sm">
                {label}
            </span>

        </label>
    );
};

export default Checkbox;