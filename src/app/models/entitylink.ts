import { contact } from "./contact"
import { account } from "./account"
import { address } from "./address"

export interface entityLink {
    id: number;
    entityType: number;
    entityId: number;
    contacts?: contact[];
    addresses?: address[];
    account?: account;
}