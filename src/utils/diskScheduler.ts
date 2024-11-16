export interface Request {
  id: number;
  position: number;
  timestamp: number;
}

export const cScanScheduler = (
  requests: Request[],
  head: number,
  diskSize: number
): { totalSeekDistance: number; seekSequence: Request[] } => {
  // Sort requests by position
  const sortedRequests = [...requests].sort((a, b) => a.position - b.position);

  // Separate requests into right and left groups
  const right = sortedRequests.filter(r => r.position >= head);
  const left = sortedRequests.filter(r => r.position < head);

  let totalSeekDistance = 0;
  let currentHead = head;
  const seekSequence: Request[] = [];

  // Process right requests first (moving towards larger values)
  if (right.length > 0) {
    totalSeekDistance += (diskSize - 1) - head; // Move to end
    
    for (const request of right) {
      seekSequence.push(request);
    }
  }

  // Jump to beginning and process left requests
  if (left.length > 0) {
    totalSeekDistance += (diskSize - 1); // Add the jump from end to start
    currentHead = 0;
    
    // Add distance from start to first left request
    if (left.length > 0) {
      totalSeekDistance += left[left.length - 1].position;
    }

    for (const request of left) {
      seekSequence.push(request);
    }
  }

  return { totalSeekDistance, seekSequence };
};