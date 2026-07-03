import * as RadixSwitch from "@radix-ui/react-switch";

const Switch = ({
    checked,
    onCheckedChange
}) => {

    return (

        <RadixSwitch.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="relative h-6 w-11 rounded-full bg-slate-300 data-[state=checked]:bg-blue-600"
        >
            
            <RadixSwitch.Thumb
                className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5"
            />

        </RadixSwitch.Root>
    );
};

export default Switch;