import * as Dialog from "@radix-ui/react-dialog";
import AppDialogHeader from "./AppDialogHeader";

const AppDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "lg",
}) => {
  const widths = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className={`
        fixed
        left-1/2
        top-1/2
        flex
        max-h-[90vh]
        w-[95%]
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        rounded-2xl
        bg-white
        shadow-xl
        ${widths[size]}
    `}
        >
          <AppDialogHeader title={title} description={description} />

          <div className="flex-1 overflow-auto p-6">{children}</div>

          {footer}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AppDialog;
