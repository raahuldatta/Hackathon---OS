class Request:
    def __init__(self, position: int, timestamp: float):
        self.position = position
        self.timestamp = timestamp

def c_scan_scheduler(requests: list[Request], head: int, disk_size: int) -> tuple[int, list[Request]]:
    """
    Implements the C-SCAN disk scheduling algorithm.
    
    Args:
        requests: List of Request objects containing position and timestamp
        head: Current position of disk head
        disk_size: Total size of the disk
        
    Returns:
        Tuple containing total seek distance and ordered list of requests
    """
    # Sort requests by position
    sorted_requests = sorted(requests, key=lambda x: x.position)
    
    # Separate requests into right and left groups
    right = [r for r in sorted_requests if r.position >= head]
    left = [r for r in sorted_requests if r.position < head]
    
    total_seek_distance = 0
    current_head = head
    seek_sequence = []
    
    # Process right requests
    for request in right:
        total_seek_distance += abs(current_head - request.position)
        current_head = request.position
        seek_sequence.append(request)
    
    # Jump back to start if there are left requests
    if left:
        total_seek_distance += abs(disk_size - 1 - current_head)
        total_seek_distance += abs(disk_size - 1)  # Jump to start
        current_head = 0
    
    # Process left requests
    for request in left:
        total_seek_distance += abs(current_head - request.position)
        current_head = request.position
        seek_sequence.append(request)
    
    return total_seek_distance, seek_sequence

# Example usage:
if __name__ == "__main__":
    import time
    
    # Create sample requests
    sample_requests = [
        Request(95, time.time()),
        Request(180, time.time()),
        Request(34, time.time()),
        Request(119, time.time()),
        Request(11, time.time()),
        Request(123, time.time()),
        Request(62, time.time()),
        Request(64, time.time()),
    ]
    
    # Run the scheduler
    head_position = 50
    disk_size = 200
    
    total_distance, sequence = c_scan_scheduler(sample_requests, head_position, disk_size)
    
    print(f"Initial head position: {head_position}")
    print(f"Total seek distance: {total_distance}")
    print("Seek sequence:")
    for req in sequence:
        print(f"Position: {req.position}")