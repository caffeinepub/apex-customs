import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Part {
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    price: number;
}
export type Time = bigint;
export interface Stats {
    avgBhpGain: number;
    totalBuilds: bigint;
    customerCount: bigint;
}
export interface Service {
    name: string;
    description: string;
    priceTiers: PriceTier;
    category: string;
}
export interface Booking {
    customerName: string;
    carDetails: string;
    email: string;
    message: string;
    preferredDate: Time;
    bookingType: string;
    timestamp: Time;
    phone: string;
}
export interface Project {
    id: bigint;
    bhp: number;
    carModel: string;
    zeroToSixty: number;
    tags: Array<string>;
    description: string;
    isFeatured: boolean;
    timestamp: Time;
    carMake: string;
    carYear: bigint;
    stageLevel: bigint;
    torqueNm: number;
}
export interface PriceTier {
    stage1: number;
    stage2: number;
    stage3?: number;
}
export interface backendInterface {
    addPart(part: Part): Promise<void>;
    addProject(project: Project): Promise<bigint>;
    addService(service: Service): Promise<void>;
    featureProject(projectId: bigint): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllParts(): Promise<Array<Part>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllServices(): Promise<Array<Service>>;
    getFeaturedProject(): Promise<Project | null>;
    getStats(): Promise<Stats>;
    submitBooking(booking: Booking): Promise<bigint>;
    updatePartStock(partName: string, inStock: boolean): Promise<void>;
}
