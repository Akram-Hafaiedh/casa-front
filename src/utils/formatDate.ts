export const formatDateRange = (start: string, end: string) => {
    const options: Intl.DateTimeFormatOptions = { year:'numeric', month:'long', day:'numeric' };
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formattedStart = new Intl.DateTimeFormat('en-US', options).format(startDate);
    const formattedEnd = new Intl.DateTimeFormat('en-US', options).format(endDate);
    return `${formattedStart} to ${formattedEnd}`;
}