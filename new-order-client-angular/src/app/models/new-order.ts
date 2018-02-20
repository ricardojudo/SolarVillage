export class NewOrder{
    id: number;
    initiator: string;
    startDate: Date;
    status: string;

    address?: string;
    condominum?: boolean;
    hoaMeetingDate?: Date;
    
    hoaApproved?: boolean;
    govApproved?: boolean;
    approved?: boolean;
}