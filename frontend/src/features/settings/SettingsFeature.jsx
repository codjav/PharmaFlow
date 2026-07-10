import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import DataTable from "@/components/tables/DataTable";

import {
    useSettings,
    useUpdateSettings,
    useChangeUsername,
    useChangePassword,
    useThemeChange,
    useLogout,
    useBackupSettings,
    useUpdateBackupSettings,
    useCreateBackup,
    useRestoreBackup,
    useBackupHistory,
} from "./useSettings";

const SettingsFeature = () => {

    const { data: settings } = useSettings();
    const { data: backup } = useBackupSettings();
    const { data: history = [] } = useBackupHistory();

    const updateSettings = useUpdateSettings();
    const updateBackup = useUpdateBackupSettings();
    const changeUsername = useChangeUsername();
    const changePassword = useChangePassword();
    const changeTheme = useThemeChange();
    const createBackup = useCreateBackup();
    const restoreBackup = useRestoreBackup();
    const logout = useLogout();

    const [form, setForm] = useState({
        pharmacy_name: "",
        owner_name: "",
        phone: "",
        email: "",
        address: "",
        gst_number: "",
        drug_license_number: "",
        theme: "LIGHT",
    });

    const [backupForm, setBackupForm] = useState({
        auto_backup: 1,
        backup_location: "",
        backup_frequency: "DAILY",
    });

    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [restorePath, setRestorePath] = useState("");

    useEffect(() => {
        if (settings) {
            setForm(settings);
        }
    }, [settings]);

    useEffect(() => {
        if (backup) {
            setBackupForm(backup);
        }
    }, [backup]);

    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* General */}

            <Card title="General Settings">

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        label="Pharmacy Name"
                        value={form.pharmacy_name}
                        onChange={(e)=>setForm({...form,pharmacy_name:e.target.value})}
                    />

                    <Input
                        label="Owner Name"
                        value={form.owner_name}
                        onChange={(e)=>setForm({...form,owner_name:e.target.value})}
                    />

                    <Input
                        label="Phone"
                        value={form.phone}
                        onChange={(e)=>setForm({...form,phone:e.target.value})}
                    />

                    <Input
                        label="Email"
                        value={form.email}
                        onChange={(e)=>setForm({...form,email:e.target.value})}
                    />

                    <Input
                        label="GST Number"
                        value={form.gst_number}
                        onChange={(e)=>setForm({...form,gst_number:e.target.value})}
                    />

                    <Input
                        label="Drug License"
                        value={form.drug_license_number}
                        onChange={(e)=>setForm({...form,drug_license_number:e.target.value})}
                    />

                    <div className="col-span-2">
                        <Input
                            label="Address"
                            value={form.address}
                            onChange={(e)=>setForm({...form,address:e.target.value})}
                        />
                    </div>

                </div>

                <div className="mt-5">
                    <Button
    onClick={() =>
        updateSettings.mutate(form, {
            onSuccess: () => {
                toast.success("Settings updated successfully.");
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to update settings."
                );
            },
        })
    }
>
    Save Changes
</Button>
                </div>

            </Card>

            {/* Security */}

            <Card title="Security">

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        label="New Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />

                    <Button
    onClick={() =>
        changeUsername.mutate(
            {
                newUsername: username,
            },
            {
                onSuccess: () => {
                    toast.success("Username changed successfully.");
                    setUsername("");
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to change username."
                    );
                },
            }
        )
    }
>
    Change Username
</Button>

                    <Input
                        type="password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                    />

                    <Input
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    />

                </div>

                <div className="mt-4 flex gap-3">

                    <Button
    onClick={() =>
        changePassword.mutate(
            {
                currentPassword,
                newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Password changed successfully.");
                    setCurrentPassword("");
                    setNewPassword("");
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to change password."
                    );
                },
            }
        )
    }
>
    Change Password
</Button>

                    <Button
    variant="destructive"
    onClick={() =>
        logout.mutate(undefined, {
            onSuccess: () => {

        toast.success("Logged out successfully.");

        navigate("/");

    },
            onError: () => {
                toast.error("Logout failed.");
            },
        })
    }
>
    Logout
</Button>

                </div>

            </Card>

            {/* Theme */}

            <Card title="Theme">

                <Select
                    value={form.theme}
                    onChange={(e)=>{
                        setForm({...form,theme:e.target.value});
                        changeTheme.mutate(
    {
        theme: e.target.value,
    },
    {
        onSuccess: () => {
            toast.success("Theme updated.");
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Unable to update theme."
            );
        },
    }
);
                    }}
                >

                    <option value="LIGHT">Light</option>

                    <option value="DARK">Dark</option>

                </Select>

            </Card>

            {/* Backup */}

            <Card title="Backup Settings">

                <div className="grid grid-cols-2 gap-4">

                    <Switch
                        checked={backupForm.auto_backup===1}
                        onCheckedChange={(value)=>
                            setBackupForm({
                                ...backupForm,
                                auto_backup:value?1:0
                            })
                        }
                    />

                    <Input
                        label="Backup Location"
                        value={backupForm.backup_location}
                        onChange={(e)=>
                            setBackupForm({
                                ...backupForm,
                                backup_location:e.target.value
                            })
                        }
                    />

                    <Select
                        value={backupForm.backup_frequency}
                        onChange={(e)=>
                            setBackupForm({
                                ...backupForm,
                                backup_frequency:e.target.value
                            })
                        }
                    >
                        <option>DAILY</option>
                        <option>WEEKLY</option>
                        <option>MONTHLY</option>
                    </Select>

                </div>

                <div className="mt-5 flex gap-3">

                    <Button
    onClick={() =>
        updateBackup.mutate(
            backupForm,
            {
                onSuccess: () => {
                    toast.success("Backup settings saved.");
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to save backup settings."
                    );
                },
            }
        )
    }
>
    Save Backup Settings
</Button>

                    <Button
    onClick={() =>
        createBackup.mutate(undefined, {
            onSuccess: () => {
                toast.success("Backup created successfully.");
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Unable to create backup."
                );
            },
        })
    }
>
    Create Backup
</Button>

                </div>

                <div className="mt-5 flex gap-3">

                    <Input
                        placeholder="Backup File Path"
                        value={restorePath}
                        onChange={(e)=>setRestorePath(e.target.value)}
                    />

                    <Button
    onClick={() =>
        restoreBackup.mutate(
            {
                backup_path: restorePath,
            },
            {
                onSuccess: () => {
                    toast.success("Backup restored successfully.");
                    setRestorePath("");
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Unable to restore backup."
                    );
                },
            }
        )
    }
>
    Restore
</Button>

                </div>

            </Card>

            {/* History */}

            <Card title="Backup History">

                <DataTable

                    data={history}

                    columns={[
                        {
                            accessorKey:"file_name",
                            header:"File Name"
                        },
                        {
                            accessorKey:"backup_date",
                            header:"Date"
                        },
                        {
                            accessorKey:"file_path",
                            header:"Location"
                        }
                    ]}

                />

            </Card>

        </div>
    );

};

export default SettingsFeature;