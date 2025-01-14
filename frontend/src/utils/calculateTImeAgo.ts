export const calculateTimeAgo = (timestamp: string) => {
    const givenTime = new Date(timestamp);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - givenTime.getTime();

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`;
    } else if (hours > 0) {
        return `${hours} hours, ${minutes} minutes, and ${seconds} seconds ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes, and ${seconds} seconds ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}
