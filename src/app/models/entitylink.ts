import { contact } from "./contact"
import { account } from "./account"
import { address } from "./address"

export interface entitylink {
    id: number;
    entityType: number;
    entityId: number;
    contacts: contact[];
    addresses: address[];
    account: account;
}