export type AssessmentQuestionType = 'MCQ' | 'Coding' | 'Debugging' | 'Case Study' | 'Scenario Based';

export interface ComprehensiveAssessmentQuestion {
  id: string;
  department: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  type: AssessmentQuestionType;
  question: string;
  codeSnippet?: string;
  scenarioContext?: string;
  options: { id: string; text: string; correct: boolean }[];
  correctAnswer: number;
  explanation: string;
  starterCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface DepartmentTrack {
  id: string;
  name: string;
  department: string;
  icon: string;
  description: string;
  topics: string[];
  totalAssessments: number;
}

export const DEPARTMENT_TRACKS: DepartmentTrack[] = [
  {
    id: 'dept-cse',
    name: 'Computer Science & Engineering',
    department: 'Computer Science',
    icon: '💻',
    description: 'Java, Python, DSA, DBMS, Operating Systems, Computer Networks, and Full-Stack Web Development.',
    topics: ['Java', 'Python', 'DSA', 'DBMS', 'OS', 'CN', 'Web Development'],
    totalAssessments: 7,
  },
  {
    id: 'dept-aiml',
    name: 'AI & Machine Learning',
    department: 'AI / ML',
    icon: '🧠',
    description: 'Statistical Machine Learning, Deep Neural Networks, Transformers, LLMs, and Exploratory Data Analysis.',
    topics: ['Machine Learning', 'Deep Learning', 'Data Analysis'],
    totalAssessments: 3,
  },
  {
    id: 'dept-cyber',
    name: 'Cybersecurity & Defense',
    department: 'Cybersecurity',
    icon: '🛡️',
    description: 'Network Protocols, Packet Forensics, Web Security (OWASP), Cryptography, and Ethical Hacking.',
    topics: ['Networking', 'Security', 'Ethical Hacking'],
    totalAssessments: 3,
  },
  {
    id: 'dept-mech',
    name: 'Mechanical Engineering',
    department: 'Mechanical',
    icon: '⚙️',
    description: 'Thermodynamics, Fluid Dynamics, Finite Element Analysis (FEA), Manufacturing, and Machine Design.',
    topics: ['Core Mechanical', 'Thermodynamics', 'Machine Design'],
    totalAssessments: 3,
  },
  {
    id: 'dept-civil',
    name: 'Civil & Infrastructure Engineering',
    department: 'Civil',
    icon: '🏛️',
    description: 'Structural Mechanics, Geotechnical Analysis, Reinforced Concrete Design, and Transportation Systems.',
    topics: ['Core Civil', 'Structural Mechanics', 'Geotechnical'],
    totalAssessments: 3,
  },
  {
    id: 'dept-eee',
    name: 'Electrical & Electronics',
    department: 'Electrical',
    icon: '⚡',
    description: 'Circuit Theory, Power Systems, Microcontroller Embedded Systems, Control Signals, and Power Electronics.',
    topics: ['Core Electrical', 'Circuits', 'Power Systems'],
    totalAssessments: 3,
  },
  {
    id: 'dept-business',
    name: 'Business & Product Strategy',
    department: 'Business',
    icon: '📊',
    description: 'Product Requirements (PRD), Go-To-Market Analytics, Tech Marketing, and Financial Unit Economics.',
    topics: ['Product', 'Marketing', 'Finance'],
    totalAssessments: 3,
  },
];

export const COMPREHENSIVE_QUESTION_BANK: Record<string, ComprehensiveAssessmentQuestion[]> = {
  // ==================== 1. COMPUTER SCIENCE: JAVA ====================
  'Java': [
    // Easy (Q1, Q2)
    {
      id: 'cs-java-1',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the default value of an uninitialized instance variable of boolean primitive type in Java?',
      options: [
        { id: '1a', text: 'false', correct: true },
        { id: '1b', text: 'true', correct: false },
        { id: '1c', text: 'null', correct: false },
        { id: '1d', text: '0', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'In Java, boolean instance variables default to false when the enclosing object is heap-allocated.',
    },
    {
      id: 'cs-java-2',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Easy',
      type: 'Debugging',
      question: 'Identify the compilation issue in the following Java variable initialization snippet:',
      codeSnippet: 'public class Test {\n  public static void main(String[] args) {\n    final int x;\n    System.out.println(x);\n  }\n}',
      options: [
        { id: '2a', text: 'Variable x might not have been initialized before access', correct: true },
        { id: '2b', text: 'final variables must be declared outside static methods', correct: false },
        { id: '2c', text: 'x defaults to 0 and prints cleanly', correct: false },
        { id: '2d', text: 'System.out cannot print primitive ints without conversion', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Local variables in Java are not assigned default values; accessing an uninitialized local variable causes a compile-time error.',
    },
    // Medium (Q3, Q4, Q5)
    {
      id: 'cs-java-3',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'Which method in Java 8+ allows providing a default implementation within an interface definition without breaking existing implementing classes?',
      options: [
        { id: '3a', text: 'default modifier methods', correct: true },
        { id: '3b', text: 'abstract virtual methods', correct: false },
        { id: '3c', text: 'static native methods only', correct: false },
        { id: '3d', text: 'implicit override functions', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The `default` keyword permits interfaces to define concrete methods, enabling library evolution without breaking backward compatibility.',
    },
    {
      id: 'cs-java-4',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'What is the output of comparing two Integer wrappers with identical value 100 vs 200 using `==` in standard HotSpot JVM?',
      codeSnippet: 'Integer a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + " " + (c == d));',
      options: [
        { id: '4a', text: 'true false (Integer Cache between -128 and 127)', correct: true },
        { id: '4b', text: 'true true', correct: false },
        { id: '4c', text: 'false false', correct: false },
        { id: '4d', text: 'Compilation Error', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'HotSpot caches Integer objects between -128 and 127. Values outside this range allocate distinct heap objects, making reference equality (==) false.',
    },
    {
      id: 'cs-java-5',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'You are designing a high-throughput multi-threaded order processor. Which collection is lock-free and optimal for producer-consumer pipelines?',
      options: [
        { id: '5a', text: 'ConcurrentLinkedQueue / ArrayBlockingQueue', correct: true },
        { id: '5b', text: 'Collections.synchronizedList(new ArrayList<>())', correct: false },
        { id: '5c', text: 'Hashtable with synchronized methods', correct: false },
        { id: '5d', text: 'Vector with full mutex locks', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'ConcurrentLinkedQueue uses non-blocking CAS (Compare-And-Swap) algorithms, delivering maximum throughput under concurrent contention.',
    },
    // Hard (Q6, Q7, Q8)
    {
      id: 'cs-java-6',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Debugging',
      question: 'Why does the following double-checked locking singleton pattern fail without the `volatile` modifier?',
      codeSnippet: 'public class Singleton {\n  private static Singleton instance;\n  public static Singleton getInstance() {\n    if (instance == null) {\n      synchronized (Singleton.class) {\n        if (instance == null) instance = new Singleton();\n      }\n    }\n    return instance;\n  }\n}',
      options: [
        { id: '6a', text: 'Instruction reordering can expose partially constructed instances to other threads', correct: true },
        { id: '6b', text: 'Synchronized block throws NullPointerException', correct: false },
        { id: '6c', text: 'Classloader creates duplicate bytecode copies', correct: false },
        { id: '6d', text: 'Heap garbage collector reclaims the reference prematurely', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Without `volatile`, the JVM or CPU may reorder memory allocation and field assignment before the constructor finishes, returning a half-initialized object.',
    },
    {
      id: 'cs-java-7',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'A Java microservice suffers from frequent Stop-The-World (STW) pauses during high traffic spikes. Which GC algorithm optimizes for sub-10ms pause times with multi-gigabyte heaps?',
      options: [
        { id: '7a', text: 'ZGC (Z Garbage Collector) or Shenandoah GC', correct: true },
        { id: '7b', text: 'Serial Garbage Collector', correct: false },
        { id: '7c', text: 'Parallel Throughput Collector (-XX:+UseParallelGC)', correct: false },
        { id: '7d', text: 'Manual System.gc() invocation in cron jobs', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'ZGC performs concurrent marking and compacting with colored pointers and load barriers, keeping STW pauses below 1ms irrespective of heap size.',
    },
    {
      id: 'cs-java-8',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'What is the time and space complexity of Java `Stream.parallel().sorted()` on a dataset of size N?',
      options: [
        { id: '8a', text: 'Time: O(N log N), Space: O(N) auxiliary buffer for sorting', correct: true },
        { id: '8b', text: 'Time: O(N), Space: O(1) in-place', correct: false },
        { id: '8c', text: 'Time: O(log N), Space: O(N log N)', correct: false },
        { id: '8d', text: 'Time: O(N^2), Space: O(N)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Streams maintain pipeline state; sorted() is a stateful intermediate operation requiring buffering the entire stream before applying TimSort in parallel.',
    },
    // Expert (Q9, Q10)
    {
      id: 'cs-java-9',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How do Project Loom Virtual Threads in Java 21+ handle blocking I/O (e.g. SocketRead) under the hood?',
      options: [
        { id: '9a', text: 'The virtual thread unmounts from its carrier OS thread, parked until epoll/kqueue wakes it', correct: true },
        { id: '9b', text: 'It creates a dedicated OS kernel thread per virtual thread', correct: false },
        { id: '9c', text: 'It throws an UnsupportedOperationException for synchronous I/O', correct: false },
        { id: '9d', text: 'It polls in a busy spin-lock loop consuming 100% CPU core', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Loom rewrites blocking java.net APIs so that when a virtual thread blocks, it yields its carrier platform thread back to the ForkJoinPool and suspends its stack frame.',
    },
    {
      id: 'cs-java-10',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'In a distributed JVM cluster using off-heap DirectByteBuffers, how is off-heap native memory leaked if Object references remain uncollected in Young Gen?',
      options: [
        { id: '10a', text: 'PhantomReference Cleaners only trigger when the small DirectByteBuffer wrapper is GCed, starving native OS memory', correct: true },
        { id: '10b', text: 'DirectByteBuffer automatically flushes every 100ms via kernel daemon', correct: false },
        { id: '10c', text: 'Native memory is managed by JVM Stack Frames automatically', correct: false },
        { id: '10d', text: 'JVM heap limit prevents off-heap allocations from exceeding Xmx', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'DirectByteBuffer holds native memory freed only when its lightweight heap wrapper is collected. If wrappers survive in Young Gen without a Full GC, OutOfMemoryError in DirectBuffer memory occurs.',
    },
  ],

  // ==================== 2. COMPUTER SCIENCE: DATA STRUCTURES & ALGORITHMS ====================
  'DSA': [
    // Easy (Q1, Q2)
    {
      id: 'dsa-1',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the average time complexity of searching for a key in a balanced Hash Map with minimal collisions?',
      options: [
        { id: 'd1a', text: 'O(1)', correct: true },
        { id: 'd1b', text: 'O(log N)', correct: false },
        { id: 'd1c', text: 'O(N)', correct: false },
        { id: 'd1d', text: 'O(N log N)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Hash calculation and array index lookup execute in O(1) constant time on average.',
    },
    {
      id: 'dsa-2',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which data structure follows the LIFO (Last In, First Out) processing principle?',
      options: [
        { id: 'd2a', text: 'Stack', correct: true },
        { id: 'd2b', text: 'Queue', correct: false },
        { id: 'd2c', text: 'Binary Search Tree', correct: false },
        { id: 'd2d', text: 'Min-Heap', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Stacks push and pop elements from the top in LIFO order.',
    },
    // Medium (Q3, Q4, Q5)
    {
      id: 'dsa-3',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'In Floyd’s Cycle Detection algorithm on a Linked List, what is the relative speed ratio between the slow and fast pointers?',
      options: [
        { id: 'd3a', text: 'Fast moves 2 nodes while Slow moves 1 node per iteration', correct: true },
        { id: 'd3b', text: 'Fast moves 3 nodes while Slow moves 2 nodes', correct: false },
        { id: 'd3c', text: 'Fast resets to head every step', correct: false },
        { id: 'd3d', text: 'Both move at identical step rates', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The 2:1 speed ratio guarantees the fast pointer closes the cycle distance by 1 node per iteration, ensuring O(N) convergence.',
    },
    {
      id: 'dsa-4',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'You need to find the Kth largest element in a stream of 10 million real-time integers. Which data structure provides optimal memory and O(log K) insertion time?',
      options: [
        { id: 'd4a', text: 'Min-Heap of fixed size K', correct: true },
        { id: 'd4b', text: 'Sorted Array of size 10 million', correct: false },
        { id: 'd4c', text: 'Singly Linked List', correct: false },
        { id: 'd4d', text: 'Circular FIFO Ring Buffer', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'A Min-Heap of size K retains the K largest elements seen so far; inserting new elements and polling the minimum takes O(log K) time with O(K) space.',
    },
    {
      id: 'dsa-5',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'In Binary Search, what bug occurs when computing midpoint as `(left + right) / 2` on large arrays?',
      options: [
        { id: 'd5a', text: 'Integer 32-bit overflow when left + right > Integer.MAX_VALUE', correct: true },
        { id: 'd5b', text: 'Array index out of bounds on negative numbers', correct: false },
        { id: 'd5c', text: 'Floating point rounding truncation', correct: false },
        { id: 'd5d', text: 'Infinite recursion loop', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'In 32-bit signed integers, `left + right` can overflow to negative numbers. Use `left + (right - left) / 2` or `(left + right) >>> 1`.',
    },
    // Hard (Q6, Q7, Q8)
    {
      id: 'dsa-6',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'Given an undirected weighted graph with negative edge weights but NO negative cycles, which shortest-path algorithm is applicable?',
      options: [
        { id: 'd6a', text: 'Bellman-Ford Algorithm (or SPFA)', correct: true },
        { id: 'd6b', text: 'Dijkstra with Priority Queue', correct: false },
        { id: 'd6c', text: 'Breadth-First Search (BFS)', correct: false },
        { id: 'd6d', text: 'Kruskal Minimum Spanning Tree', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Dijkstra assumes non-negative weights and fails with negative edges. Bellman-Ford relaxes all edges V-1 times and correctly handles negative weights.',
    },
    {
      id: 'dsa-7',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'What is the recurrence relation and time complexity of the Optimal Substructure for the 0/1 Knapsack problem with capacity W and N items?',
      options: [
        { id: 'd7a', text: 'DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w-wt[i]]) • O(N * W)', correct: true },
        { id: 'd7b', text: 'DP[w] = min(DP[w-1] + val[i]) • O(N + W)', correct: false },
        { id: 'd7c', text: 'DP[i][w] = DP[i-1][w] * DP[i][w-1] • O(2^N)', correct: false },
        { id: 'd7d', text: 'Greedy ratio sort • O(N log N)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The 0/1 Knapsack exhibits pseudo-polynomial dynamic programming complexity O(N * W).',
    },
    {
      id: 'dsa-8',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Debugging',
      question: 'Identify the flaw in this Trie search algorithm for prefix match when an input word is a prefix of a longer stored word:',
      codeSnippet: 'boolean search(String word) {\n  TrieNode curr = root;\n  for(char c : word.toCharArray()) {\n    if(!curr.children.containsKey(c)) return false;\n    curr = curr.children.get(c);\n  }\n  return true; // Bug location\n}',
      options: [
        { id: 'd8a', text: 'It returns true for prefix matches even if `isEndOfWord` is false', correct: true },
        { id: 'd8b', text: 'NullPointerException on root access', correct: false },
        { id: 'd8c', text: 'Infinite loop on duplicate characters', correct: false },
        { id: 'd8d', text: 'Trie keys must be ASCII integers only', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Full word search must return `curr != null && curr.isEndOfWord`. Returning unconditional true implements `startsWith(prefix)` instead of `search(word)`.',
    },
    // Expert (Q9, Q10)
    {
      id: 'dsa-9',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'You are implementing a high-throughput geospatial location lookup for delivery drivers within 5km bounding radius. Which multidimensional index structure yields O(log N + K) range query time?',
      options: [
        { id: 'd9a', text: 'R-Tree / KD-Tree / Geohash Spatial Bounding Hierarchy', correct: true },
        { id: 'd9b', text: 'Standard 1D B+ Tree on latitude only', correct: false },
        { id: 'd9c', text: 'Disjoint Set Union (Union-Find)', correct: false },
        { id: 'd9d', text: 'Suffix Automaton', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'R-Trees and KD-Trees partition 2D/3D coordinate space with minimum bounding boxes, pruning search spaces in O(log N + K) time.',
    },
    {
      id: 'dsa-10',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'In Tarjan’s Strongly Connected Components (SCC) algorithm, why are cross edges to vertices not on the active recursion stack ignored during low-link updates?',
      options: [
        { id: 'd10a', text: 'Vertices not on the stack belong to previously finalized disconnected components that cannot form cycles with the current subtree', correct: true },
        { id: 'd10b', text: 'Cross edges cause infinite recursion loops in DFS', correct: false },
        { id: 'd10c', text: 'Tarjan algorithm only works on DAGs without cross edges', correct: false },
        { id: 'd10d', text: 'Stack memory overflows if cross edges are processed', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'In Tarjan DFS, a node popped from the stack is already assigned to its definitive SCC and has no path back to any ancestor in the current DFS tree.',
    },
  ],

  // ==================== 3. AI / ML: MACHINE LEARNING & LLMs ====================
  'Machine Learning': [
    // Easy (Q1, Q2)
    {
      id: 'ai-1',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the purpose of splitting a dataset into Training, Validation, and Test subsets?',
      options: [
        { id: 'ai1a', text: 'To evaluate generalizability and prevent data leakage / overfitting', correct: true },
        { id: 'ai1b', text: 'To speed up floating point matrix multiplication', correct: false },
        { id: 'ai1c', text: 'To compress dataset size on GPU VRAM', correct: false },
        { id: 'ai1d', text: 'To ensure all features have zero mean and unit variance', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Validation subsets tune hyperparameters while holdout test subsets measure true out-of-sample generalization.',
    },
    {
      id: 'ai-2',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which activation function is most widely used in hidden layers of modern deep neural networks to avoid vanishing gradients in positive domains?',
      options: [
        { id: 'ai2a', text: 'ReLU (Rectified Linear Unit) / GELU', correct: true },
        { id: 'ai2b', text: 'Sigmoid', correct: false },
        { id: 'ai2c', text: 'Step Function', correct: false },
        { id: 'ai2d', text: 'Linear Identity Function', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'ReLU (f(x) = max(0, x)) has constant unit gradient for x > 0, preventing exponential gradient decay across deep layers.',
    },
    // Medium (Q3, Q4, Q5)
    {
      id: 'ai-3',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'When dealing with severe class imbalance (e.g. 99.5% legitimate transactions, 0.5% fraud), which metric gives the most truthful model evaluation?',
      options: [
        { id: 'ai3a', text: 'Precision-Recall AUC (PR-AUC) and F1-Score on the minority class', correct: true },
        { id: 'ai3b', text: 'Raw Classification Accuracy (Accuracy Paradox)', correct: false },
        { id: 'ai3c', text: 'Mean Squared Error (MSE)', correct: false },
        { id: 'ai3d', text: 'R-Squared Score', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'A trivial model predicting all legitimate achieves 99.5% accuracy but 0% fraud recall. PR-AUC and F1 focus specifically on true positive minority retrieval.',
    },
    {
      id: 'ai-4',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'What is the formula for Scaled Dot-Product Attention in the original Transformer architecture (Vaswani et al.)?',
      options: [
        { id: 'ai4a', text: 'softmax(Q * K^T / sqrt(d_k)) * V', correct: true },
        { id: 'ai4b', text: 'sigmoid(Q * K * V)', correct: false },
        { id: 'ai4c', text: 'tanh(Q + K) * V / d_k', correct: false },
        { id: 'ai4d', text: 'relu(Q * V^T) * K', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Dividing by sqrt(d_k) counteracts the growth of dot products in high dimensions, preventing softmax gradients from saturating in tiny regions.',
    },
    {
      id: 'ai-5',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'During PyTorch model training, you notice loss is not decreasing. You find gradients are accumulating across mini-batches. Which line was omitted in the loop?',
      codeSnippet: 'for data, target in dataloader:\n  # Missing step\n  output = model(data)\n  loss = criterion(output, target)\n  loss.backward()\n  optimizer.step()',
      options: [
        { id: 'ai5a', text: 'optimizer.zero_grad()', correct: true },
        { id: 'ai5b', text: 'model.eval()', correct: false },
        { id: 'ai5c', text: 'torch.cuda.empty_cache()', correct: false },
        { id: 'ai5d', text: 'loss.detach()', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'PyTorch accumulates gradients by default. Calling `optimizer.zero_grad()` at the start of each iteration resets gradient buffers.',
    },
    // Hard (Q6, Q7, Q8)
    {
      id: 'ai-6',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In Parameter-Efficient Fine-Tuning (PEFT) using LoRA (Low-Rank Adaptation), how does LoRA modify pre-trained weight matrix W_0 of dimension d x k?',
      options: [
        { id: 'ai6a', text: 'W = W_0 + (B * A) * (alpha / r), where B is d x r and A is r x k with rank r << min(d, k)', correct: true },
        { id: 'ai6b', text: 'It quantizes all 16-bit float weights into 4-bit integers and freezes gradients', correct: false },
        { id: 'ai6c', text: 'It prunes 90% of zero-weight neurons using L1 regularization', correct: false },
        { id: 'ai6d', text: 'It adds an external feed-forward layer at the end of the transformer stack', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'LoRA freezes pre-trained weights W_0 and injects trainable rank decomposition matrices A and B, drastically reducing trainable parameters by up to 99%.',
    },
    {
      id: 'ai-7',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'In a production RAG (Retrieval-Augmented Generation) system with 50,000 documents, dense vector search alone fails on exact SKU IDs and rare acronyms. What architecture fixes this?',
      options: [
        { id: 'ai7a', text: 'Hybrid Search combining Sparse BM25 + Dense Embeddings with Reciprocal Rank Fusion (RRF) and Cross-Encoder Reranking', correct: true },
        { id: 'ai7b', text: 'Increasing embedding vector dimension from 768 to 1536 only', correct: false },
        { id: 'ai7c', text: 'Doubling the LLM context window to 128k tokens', correct: false },
        { id: 'ai7d', text: 'Fine-tuning a GPT-2 tokenizer on the acronyms', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Dense embeddings capture semantic concepts but miss exact keyword tokens. Hybrid BM25 + dense search with cross-encoder reranking yields optimal domain precision.',
    },
    {
      id: 'ai-8',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'What mathematical mechanism prevents Layer Normalization (LayerNorm) from shifting activation distributions across mini-batch dependencies like BatchNorm?',
      options: [
        { id: 'ai8a', text: 'LayerNorm computes mean and variance across feature dimensions for a single sample independently of other batch samples', correct: true },
        { id: 'ai8b', text: 'LayerNorm relies on moving averages saved during training mode', correct: false },
        { id: 'ai8c', text: 'LayerNorm normalizes weights rather than activations', correct: false },
        { id: 'ai8d', text: 'LayerNorm requires power-of-two batch sizes', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'BatchNorm normalizes across the batch dimension (failing with batch size 1 or dynamic sequences). LayerNorm operates across features per token independently.',
    },
    // Expert (Q9, Q10)
    {
      id: 'ai-9',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How does FlashAttention (Dao et al.) achieve 3x–5x GPU acceleration without altering mathematical attention output?',
      options: [
        { id: 'ai9a', text: 'Tiles softmax computations using online softmax statistics to avoid materializing the N x N attention matrix in slow GPU High-Bandwidth Memory (HBM)', correct: true },
        { id: 'ai9b', text: 'Approximates attention matrices with random sparse projections', correct: false },
        { id: 'ai9c', text: 'Quantizes weights into 1-bit Ternary values', correct: false },
        { id: 'ai9d', text: 'Eliminates feed-forward projections from the transformer block', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Standard attention is memory-bound by intermediate N x N read/writes to HBM. FlashAttention tiles query/key/value blocks in SRAM and computes online softmax in one pass.',
    },
    {
      id: 'ai-10',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'In Direct Preference Optimization (DPO) vs PPO-based RLHF, why is training stability higher in DPO?',
      options: [
        { id: 'ai10a', text: 'DPO analytically parameterizes the reward function via the implicit policy probability ratio, eliminating the separate reward model and actor-critic policy gradient updates', correct: true },
        { id: 'ai10b', text: 'DPO uses supervised gradient ascent on synthetic samples only', correct: false },
        { id: 'ai10c', text: 'DPO guarantees zero model hallucinations mathematically', correct: false },
        { id: 'ai10d', text: 'DPO trains exclusively on CPU without backpropagation', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'DPO derives a closed-form substitution of the reward in the KL-constrained RL objective, optimizing policy directly via binary cross-entropy on preferred vs dispreferred completions.',
    },
  ],

  // ==================== 4. CYBERSECURITY ====================
  'Cybersecurity': [
    // Easy (Q1, Q2)
    {
      id: 'cy-1',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which protocol secures web HTTP traffic by encrypting data in transit using TLS/SSL certificates?',
      options: [
        { id: 'cy1a', text: 'HTTPS (Port 443)', correct: true },
        { id: 'cy1b', text: 'FTP (Port 21)', correct: false },
        { id: 'cy1c', text: 'Telnet (Port 23)', correct: false },
        { id: 'cy1d', text: 'SNMP (Port 161)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'HTTPS wraps HTTP inside a TLS tunnel, ensuring confidentiality and integrity over port 443.',
    },
    {
      id: 'cy-2',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What type of cyberattack involves deceiving individuals into revealing credentials through fraudulent emails or cloned websites?',
      options: [
        { id: 'cy2a', text: 'Phishing', correct: true },
        { id: 'cy2b', text: 'Buffer Overflow', correct: false },
        { id: 'cy2c', text: 'SQL Injection', correct: false },
        { id: 'cy2d', text: 'ARP Poisoning', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Phishing is a social engineering attack aimed at stealing sensitive credentials or access tokens.',
    },
    // Medium (Q3, Q4, Q5)
    {
      id: 'cy-3',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'An attacker intercepts an e-commerce HTTP request and modifies `user_id=102` to `user_id=103` in the URL parameter, viewing another user’s order. What OWASP vulnerability is this?',
      options: [
        { id: 'cy3a', text: 'Insecure Direct Object Reference (IDOR / BOLA)', correct: true },
        { id: 'cy3b', text: 'Cross-Site Scripting (XSS)', correct: false },
        { id: 'cy3c', text: 'Server-Side Request Forgery (SSRF)', correct: false },
        { id: 'cy3d', text: 'XML External Entity Injection (XXE)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'IDOR (Broken Object Level Authorization) occurs when backend endpoints fail to validate whether the authenticated user owns the requested record ID.',
    },
    {
      id: 'cy-4',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'How does parameterized SQL (Prepared Statements) prevent SQL Injection attacks?',
      codeSnippet: 'String query = "SELECT * FROM users WHERE email = ? AND password = ?";\nPreparedStatement ps = conn.prepareStatement(query);\nps.setString(1, email);\nps.setString(2, pass);',
      options: [
        { id: 'cy4a', text: 'Database engine compiles the SQL AST first and treats user inputs strictly as literal data values, never as executable SQL code', correct: true },
        { id: 'cy4b', text: 'It encrypts the SQL string with AES-256 before transmission', correct: false },
        { id: 'cy4c', text: 'It filters out single quotes automatically in memory', correct: false },
        { id: 'cy4d', text: 'It executes queries in an isolated Docker sandbox', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Prepared statements separate SQL code from data parameters; even inputs containing `\' OR 1=1 --` are matched literally against the column.',
    },
    {
      id: 'cy-5',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'MCQ',
      question: 'Which asymmetric cryptographic algorithm relies on the mathematical difficulty of factoring large prime semiprimes?',
      options: [
        { id: 'cy5a', text: 'RSA (Rivest-Shamir-Adleman)', correct: true },
        { id: 'cy5b', text: 'AES (Advanced Encryption Standard)', correct: false },
        { id: 'cy5c', text: 'SHA-256 Hashing', correct: false },
        { id: 'cy5d', text: 'ChaCha20', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'RSA public-key cryptography is founded on the integer factorization problem of the product of two large prime numbers.',
    },
    // Hard (Q6, Q7, Q8)
    {
      id: 'cy-6',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'An attacker manipulates a cloud metadata service endpoint (`http://169.254.169.254/latest/meta-data/iam/security-credentials/`) by providing it as a profile picture URL. What attack is this?',
      options: [
        { id: 'cy6a', text: 'Server-Side Request Forgery (SSRF)', correct: true },
        { id: 'cy6b', text: 'Cross-Site Request Forgery (CSRF)', correct: false },
        { id: 'cy6c', text: 'DNS Cache Poisoning', correct: false },
        { id: 'cy6d', text: 'Local File Inclusion (LFI)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'SSRF tricks the backend server into making requests to internal or cloud metadata IP endpoints, leaking temporary IAM credentials.',
    },
    {
      id: 'cy-7',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'In a Zero Trust Architecture (ZTA), what is the core guiding operational principle?',
      options: [
        { id: 'cy7a', text: 'Never trust, always verify — enforce strict continuous authentication and least-privilege per request', correct: true },
        { id: 'cy7b', text: 'Trust all traffic originated from inside corporate VPN boundaries', correct: false },
        { id: 'cy7c', text: 'Eliminate firewalls and rely solely on password length', correct: false },
        { id: 'cy7d', text: 'Disable all logging to prevent credential exposure in log files', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Zero Trust assumes threats exist inside and outside the perimeter, requiring identity verification, device health checks, and micro-segmentation for every transaction.',
    },
    {
      id: 'cy-8',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'Why is `strcmp` or standard equality checking vulnerable to timing attacks when verifying HMAC authentication tokens?',
      options: [
        { id: 'cy8a', text: 'Early character mismatch returns early, leaking matched byte positions through sub-microsecond latency deltas', correct: true },
        { id: 'cy8b', text: 'strcmp modifies buffer pointers in kernel space', correct: false },
        { id: 'cy8c', text: 'strcmp truncates strings at null bytes', correct: false },
        { id: 'cy8d', text: 'strcmp allocates memory on heap for each comparison', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Non-constant-time comparisons leak prefix match length. Security-critical code must use constant-time comparison algorithms (e.g. `crypto.timingSafeEqual`).',
    },
    // Expert (Q9, Q10)
    {
      id: 'cy-9',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How does a Return-Oriented Programming (ROP) exploit bypass non-executable memory protections (Data Execution Prevention / W^X)?',
      options: [
        { id: 'cy9a', text: 'Chains together existing machine instruction snippets ending in `ret` (gadgets) already located in executable shared library code (libc)', correct: true },
        { id: 'cy9b', text: 'Overwrites the CPU microcode with signed hardware patches', correct: false },
        { id: 'cy9c', text: 'Compiles shellcode inside unallocated swap memory', correct: false },
        { id: 'cy9d', text: 'Injects NOP sleds into read-only data segments', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'ROP bypasses DEP/W^X by manipulating the call stack to sequence existing instructions (gadgets) in executable memory to execute arbitrary logic.',
    },
    {
      id: 'cy-10',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'In an enterprise Active Directory forest, how does an attacker execute a Kerberos Golden Ticket attack?',
      options: [
        { id: 'cy10a', text: 'Uses the compromised KRBTGT account NTLM hash to forge Ticket Granting Tickets (TGT) with arbitrary group memberships and lifetime', correct: true },
        { id: 'cy10b', text: 'Performs dictionary brute-force on domain workstation passwords', correct: false },
        { id: 'cy10c', text: 'Poisoning DNS MX records to intercept password reset links', correct: false },
        { id: 'cy10d', text: 'Exploiting SMBv1 anonymous pipe enumeration', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The KRBTGT secret key encrypts all domain TGTs. Possessing it allows attackers to forge valid TGTs granting persistent Domain Admin rights.',
    },
  ],
};

/**
 * Generates an adaptive 10-Question Assessment tailored to the user's Department, Skill, and Track.
 * Strict 10-Question Difficulty Progression:
 * Q1, Q2: Easy
 * Q3, Q4, Q5: Medium
 * Q6, Q7, Q8: Hard
 * Q9, Q10: Expert
 */
export function generateAdaptive10QuestionAssessment(
  topicName: string,
  userDepartment = 'Computer Science',
  userCareerGoal = 'Internship'
): {
  id: string;
  title: string;
  department: string;
  topic: string;
  questions: ComprehensiveAssessmentQuestion[];
  estimatedMinutes: number;
  xpReward: number;
  passThreshold: number;
} {
  // Find bank matching topic or fallback to closest department topic
  let bank = COMPREHENSIVE_QUESTION_BANK[topicName];
  if (!bank || bank.length < 10) {
    if (userDepartment.includes('AI') || topicName.includes('AI') || topicName.includes('ML')) {
      bank = COMPREHENSIVE_QUESTION_BANK['Machine Learning'];
    } else if (userDepartment.includes('Cyber') || topicName.includes('Security')) {
      bank = COMPREHENSIVE_QUESTION_BANK['Cybersecurity'];
    } else if (topicName.includes('DSA') || topicName.includes('Algorithm') || topicName.includes('Structure')) {
      bank = COMPREHENSIVE_QUESTION_BANK['DSA'];
    } else {
      bank = COMPREHENSIVE_QUESTION_BANK['Java'];
    }
  }

  // Ensure exact progression
  const easyQ = bank.filter((q) => q.difficulty === 'Easy').slice(0, 2);
  const medQ = bank.filter((q) => q.difficulty === 'Medium').slice(0, 3);
  const hardQ = bank.filter((q) => q.difficulty === 'Hard').slice(0, 3);
  const expertQ = bank.filter((q) => q.difficulty === 'Expert').slice(0, 2);

  const finalQuestions = [...easyQ, ...medQ, ...hardQ, ...expertQ];

  // If any tier is short, backfill
  while (finalQuestions.length < 10 && bank.length >= 10) {
    const missing = bank.find((q) => !finalQuestions.some((fq) => fq.id === q.id));
    if (missing) finalQuestions.push(missing);
    else break;
  }

  return {
    id: `eval-${topicName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    title: `${topicName} Comprehensive Assessment (10 Questions)`,
    department: userDepartment,
    topic: topicName,
    questions: finalQuestions,
    estimatedMinutes: 20,
    xpReward: 100,
    passThreshold: 70,
  };
}
