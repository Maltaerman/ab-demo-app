import { type InjectionKey } from "vue";
import type { IAddAlertPayload } from "@/components/ui/GlobalAlerts.vue";

const setLoader: InjectionKey<(payload: boolean) => void> = "setLoader";
const addAlert: InjectionKey<(payload: IAddAlertPayload) => void> = "addAlert";

export { setLoader, addAlert };
