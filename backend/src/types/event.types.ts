export enum EventStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum EventType {
    FREE = 'free',
    PAID = 'paid',
}

export interface EventAttributes {
    id: string;
    name: string;
    template_image: string;
    description: string;
    location: string;
    time: Date;
    date: Date;
    user_id: string;
    status: EventStatus;
    type: EventType;
    created_at: Date;
    updated_at: Date;
}