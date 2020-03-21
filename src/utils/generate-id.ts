let lastTimestamp: number = Date.now()

export default function generateId(): string {
    const currentTimeStamp = Date.now()
    lastTimestamp = currentTimeStamp > lastTimestamp ? currentTimeStamp : lastTimestamp + 1
    return lastTimestamp.toString(36)
}