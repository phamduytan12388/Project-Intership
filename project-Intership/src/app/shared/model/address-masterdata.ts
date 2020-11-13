export class AddressMasterdata {
    id: string;
    code: string;
    name: string;
    type: string;
    parentId: string;
    childs: AddressMasterdata[];
}
