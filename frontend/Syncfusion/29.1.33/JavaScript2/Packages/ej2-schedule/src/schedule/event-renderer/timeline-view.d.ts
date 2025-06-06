import { Schedule } from '../base/schedule';
import { MonthEvent } from './month';
/**
 * Timeline view events render
 */
export declare class TimelineEvent extends MonthEvent {
    private startHour;
    private endHour;
    slotCount: number;
    private interval;
    private day;
    eventContainers: HTMLElement[];
    private dayLength;
    slotsPerDay: number;
    private content;
    private rowIndex;
    inlineValue: boolean;
    private cellTops;
    constructor(parent: Schedule, type: string);
    getSlotDates(): void;
    getOverlapEvents(date: Date, appointments: Record<string, any>[]): Record<string, any>[];
    getSortComparerIndex(startDate: Date, endDate: Date): number;
    getOverlapSortComparerEvents(startDate: Date, endDate: Date, appointmentsCollection: Record<string, any>[]): Record<string, any>[];
    renderResourceEvents(): void;
    renderEvents(event: Record<string, any>, resIndex: number, appointmentsList?: Record<string, any>[]): void;
    private adjustToNearestTimeSlot;
    private renderTimelineMoreIndicator;
    updateCellHeight(cell: HTMLElement, height: number): void;
    private adjustAppointments;
    private getFirstChild;
    updateBlockElements(): void;
    getStartTime(event: Record<string, any>, eventData: Record<string, any>): Date;
    private getNextDay;
    getEndTime(event: Record<string, any>, eventData: Record<string, any>): Date;
    private getPreviousDay;
    getEventWidth(startDate: Date, endDate: Date, isAllDay: boolean, count: number): number;
    private getSameDayEventsWidth;
    private getSpannedEventsWidth;
    private getEndTimeOfLastSlot;
    private isSameDay;
    private getAppointmentLeft;
    getPosition(startTime: Date, endTime: Date, isAllDay: boolean, day: number): number;
    private getFilterEvents;
    private getIntervalInMinutes;
    private isAlreadyAvail;
    getRowTop(resIndex: number): number;
    getCellTd(): HTMLElement;
    renderBlockIndicator(cellTd: HTMLElement, position: number, resIndex: number): void;
    setMaxEventHeight(event: HTMLElement, cell: HTMLElement): void;
    private isDayProcess;
    destroy(): void;
}
