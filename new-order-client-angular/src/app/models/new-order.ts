export class NewOrder{
    id: number;
    initiator: string;
    startDate: Date;
    status: string;

    address?: string;
    condominum?: boolean = false;
    hoaMeetingDate?: string;
    
    hoaApproved?: boolean;
    govApproved?: boolean;
    approved?: boolean;
}