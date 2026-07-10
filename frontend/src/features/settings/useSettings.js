import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import settingsService from "./settings.service";



/* ==========================================================
   GENERAL SETTINGS
========================================================== */

export const useSettings = () =>
    useQuery({
        queryKey: ["settings"],
        queryFn: settingsService.getSettings,
    });

export const useUpdateSettings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: settingsService.updateSettings,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
    });

};



/* ==========================================================
   SECURITY
========================================================== */

export const useChangeUsername = () =>
    useMutation({
        mutationFn: settingsService.changeUsername,
    });

export const useChangePassword = () =>
    useMutation({
        mutationFn: settingsService.changePassword,
    });

export const useThemeChange = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: settingsService.changeTheme,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
    });

};

export const useLogout = () =>
    useMutation({
        mutationFn: settingsService.logout,
    });



/* ==========================================================
   BACKUP SETTINGS
========================================================== */

export const useBackupSettings = () =>
    useQuery({
        queryKey: ["backup-settings"],
        queryFn: settingsService.getBackupSettings,
    });

export const useUpdateBackupSettings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: settingsService.updateBackupSettings,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["backup-settings"],
            });
        },
    });

};



/* ==========================================================
   BACKUP
========================================================== */

export const useCreateBackup = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: settingsService.createBackup,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["backup-history"],
            });
        },
    });

};

export const useRestoreBackup = () =>
    useMutation({
        mutationFn: settingsService.restoreBackup,
    });



/* ==========================================================
   BACKUP HISTORY
========================================================== */

export const useBackupHistory = () =>
    useQuery({
        queryKey: ["backup-history"],
        queryFn: settingsService.getBackupHistory,
    });