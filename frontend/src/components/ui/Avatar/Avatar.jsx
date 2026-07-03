import * as RadixAvatar from "@radix-ui/react-avatar";

const Avatar = ({
    src,
    fallback = "A"
}) => {
    return (
        <RadixAvatar.Root className="inline-flex h-10 w-10 overflow-hidden rounded-full">
            <RadixAvatar.Image
                src={src}
                className="h-full w-full object-cover"
            />

            <RadixAvatar.Fallback
                className="flex h-full w-full items-center justify-center bg-blue-600 text-white"
            >
                {fallback}
            </RadixAvatar.Fallback>

        </RadixAvatar.Root>
    );
};

export default Avatar;