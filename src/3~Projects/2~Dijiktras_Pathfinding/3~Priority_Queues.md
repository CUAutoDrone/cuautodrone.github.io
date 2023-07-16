# Priority Queues
A priority queue is essentially any method to store values and their associated "priority" and then retrieve the values back in order of their priority. Technically, a priority queue is an ["abstract data type"](https://en.wikipedia.org/wiki/Abstract_data_type) but that doesn't really matter for now, all you need to know is what it is and how to use one.

All priority queues have 3 functions, and the existance of these functions defines what it means to be a priority queue.

### is_empty()
This is the most simple of the functions, it just returns true if the priority queue has no elements and false otherwise. This functionality is useful for Dijktras because it's the condition of the main while loop.

### insert_with_priority(element, priority)
This function allows you to add an elemenet and its asociated priority to the queue. The priority is just a number (usually an int) that communicates how the elements will be ordered. Typically, a lower number is higher priority, think position in line. 1 is first in line and highest priority, 2 is second, etc. The order that elements are added to the queue doesn't matter, only the priority they are given.

### extract_min()
This function (sometimes also called pull_highest_priority), will return the element with the highest priority and remove it from the queue. Essentially, the person that is first in line gets called up. If two elements have the same priority then whichever comes first is unspecified, it could be either one. Generally, if this is called on an empty queue, it will raise an error but you have to look at the specific implementation to see.

## Example
```python
pQueue = PriorityQueue() # create a new empty priority queue
pQueue.is_empty() # true
pQueue.insert_with_priority("3", 3)
pQueue.insert_with_priority("4", 4)
pQueue.insert_with_priority("1", 1)
pQueue.insert_with_priority("3", 3)
pQueue.isEmpty() # false

pQueue.extract_min() # "1"
pQueue.extract_min() # "3"
pQueue.extract_min() # "3"

pQueue.insert_with_priority("2", 2)

pQueue.extract_min() # "2"
pQueue.extract_min() # "4"

pQueue.is_empty() # true
```

Sometimes, there are some additional functions, but you can use the above functions to fake their behavior.

### increase_priority(element, new_priority)
This function will let you increase the priority of an element already stored in the queue. This is something that you might find helpful in Dijktras, but theres a way around needing it. Essentially, everytime that you would call increase priority, just add the element with its updated priority. Since your only ever increasing the priority, the first time that an element is popped off the queue, it will be the highest priority (ie. the most recent) then you just have to make sure to ignore all remaining elements of the same type that come off the queue (and in Dijktras specifically, theres a fast and clean way to do this).

### peek()
This lets you see the minimun element but without actually removing it off the stack, its a commonly implemented function but you shouldn't need it for Dijktras.