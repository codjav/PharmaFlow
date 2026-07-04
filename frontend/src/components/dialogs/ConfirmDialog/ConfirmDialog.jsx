import AppDialog, { AppDialogFooter } from "../AppDialog";
import Button from "@/components/ui/Button";


const ConfirmDialog = ({
    open,
    onOpenChange,
    title,
    message,
    onConfirm,
    loading=false
}) => {
  return (
    <AppDialog
        open={open}
        onOpenChange={onOpenChange}
        title={title}
    >
        <p className="text-slate-600">
            {message}
        </p>
        <AppDialogFooter>
            <Button
                variant="outline"
                onClick={()=>onOpenChange(false)}
            >
                Cancel
            </Button>
            <Button
                variant="danger"
                loading={loading}
                onClick={onConfirm}
            >
                Delete
            </Button>
        </AppDialogFooter>
    </AppDialog>
  );
};

export default ConfirmDialog;
