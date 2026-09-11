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
  skillTag?: string;
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
    name: 'Computer Science',
    department: 'Computer Science',
    icon: '💻',
    description: 'Java, Python, C, DSA, DBMS, OS, Computer Networks, OOP, and Web Development.',
    topics: ['Java', 'Python', 'C', 'DSA', 'DBMS', 'OS', 'CN', 'OOP', 'Web Development'],
    totalAssessments: 9,
  },
  {
    id: 'dept-aiml',
    name: 'AI & Machine Learning',
    department: 'AI / ML',
    icon: '🧠',
    description: 'Python, Statistics, Machine Learning, Deep Learning, NLP, and Data Analysis.',
    topics: ['Python for AI', 'Statistics', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Analysis'],
    totalAssessments: 6,
  },
  {
    id: 'dept-cyber',
    name: 'Cybersecurity',
    department: 'Cybersecurity',
    icon: '🛡️',
    description: 'Networking, Cryptography, Security Architecture, Ethical Hacking, OWASP, and Linux.',
    topics: ['Networking', 'Cryptography', 'Security', 'Ethical Hacking', 'OWASP', 'Linux Security'],
    totalAssessments: 6,
  },
  {
    id: 'dept-cloud-devops',
    name: 'Cloud & DevOps',
    department: 'Cloud & DevOps',
    icon: '☁️',
    description: 'AWS, Docker, Kubernetes, CI/CD Pipelines, Linux Systems, and Cloud Networking.',
    topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Cloud Networking'],
    totalAssessments: 6,
  },
  {
    id: 'dept-product',
    name: 'Product Management',
    department: 'Product Management',
    icon: '📊',
    description: 'Product Strategy, Market Research, User Research, Product Analytics, and Business Thinking.',
    topics: ['Product Strategy', 'Market Research', 'User Research', 'Product Analytics', 'Business Thinking'],
    totalAssessments: 5,
  },
  {
    id: 'dept-uiux',
    name: 'UI / UX Design',
    department: 'UI / UX',
    icon: '🎨',
    description: 'Design Principles, UX Research, Wireframing & Prototyping, Accessibility (a11y), and User Flows.',
    topics: ['Design Principles', 'UX Research', 'Wireframing', 'Accessibility', 'User Flows'],
    totalAssessments: 5,
  },
];

// Rich, production-grade 10-question evaluation banks covering all requested domains
export const COMPREHENSIVE_QUESTION_BANK: Record<string, ComprehensiveAssessmentQuestion[]> = {
  // ==================== 1. COMPUTER SCIENCE: JAVA ====================
  'Java': [
    {
      id: 'cs-java-1',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which JVM memory area holds object instances created at runtime with the `new` keyword?',
      options: [
        { id: 'j1a', text: 'Heap Memory', correct: true },
        { id: 'j1b', text: 'Call Stack', correct: false },
        { id: 'j1c', text: 'Program Counter (PC) Register', correct: false },
        { id: 'j1d', text: 'Native Method Stack', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'All dynamic object allocations in Java reside in Heap memory, managed by the Garbage Collector.',
    },
    {
      id: 'cs-java-2',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Why are String objects immutable in Java?',
      options: [
        { id: 'j2a', text: 'For String Pool caching, thread-safety, and secure hashcode keys', correct: true },
        { id: 'j2b', text: 'Because JVM cannot allocate mutable character arrays', correct: false },
        { id: 'j2c', text: 'To force developers to use primitive data types', correct: false },
        { id: 'j2d', text: 'To disable Garbage Collection for text literals', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'String immutability allows String Pool deduplication, thread-safe sharing without locks, and deterministic hashCode caching for HashMaps.',
    },
    {
      id: 'cs-java-3',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'In `ConcurrentHashMap`, how was locking improved in Java 8+ compared to Java 7 segment locks?',
      options: [
        { id: 'j3a', text: 'Replaced Segment table with CAS (Compare-And-Swap) and synchronized bucket heads + red-black trees', correct: true },
        { id: 'j3b', text: 'Added a global ReentrantLock over the entire table', correct: false },
        { id: 'j3c', text: 'Switched to thread-local copies that merge on GC cycles', correct: false },
        { id: 'j3d', text: 'Disabled collision resolution completely', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Java 8 ConcurrentHashMap uses lock-free CAS for empty bins and synchronizes only on the head node of a hash bucket when collisions occur.',
    },
    {
      id: 'cs-java-4',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'What is the purpose of the `volatile` keyword in Java multi-threaded execution?',
      options: [
        { id: 'j4a', text: 'Guarantees visibility of writes across CPU caches and prevents instruction reordering (happens-before)', correct: true },
        { id: 'j4b', text: 'Provides atomic increment guarantees (like synchronized)', correct: false },
        { id: 'j4c', text: 'Pins the variable into L1 cache exclusively', correct: false },
        { id: 'j4d', text: 'Prevents the object from being garbage collected', correct: false },
      ],
      correctAnswer: 0,
      explanation: '`volatile` ensures changes made by one thread are immediately flushed to main memory and visible to other threads, with memory barrier reordering prevention.',
    },
    {
      id: 'cs-java-5',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'Under what condition does a Java `HashMap` transform a linked bucket collision chain into a Red-Black Tree?',
      options: [
        { id: 'j5a', text: 'When bucket size reaches TREEIFY_THRESHOLD (8) AND total table capacity >= 64', correct: true },
        { id: 'j5b', text: 'When load factor exceeds 0.75 immediately', correct: false },
        { id: 'j5c', text: 'When any key implements Comparable', correct: false },
        { id: 'j5d', text: 'When JVM executes in 64-bit Server mode', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'When a bucket reaches 8 items and total array capacity is at least 64, Java 8 converts the linked list to a Red-Black Tree for O(log N) worst-case lookups.',
    },
    {
      id: 'cs-java-6',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'How do Java 21 Virtual Threads (Project Loom) handle blocking I/O calls without exhausting OS threads?',
      options: [
        { id: 'j6a', text: 'Carrier OS thread unmounts the virtual thread upon blocking and mounts another runnable virtual thread', correct: true },
        { id: 'j6b', text: 'Spawns an asynchronous native thread for every blocking call', correct: false },
        { id: 'j6c', text: 'Converts all synchronous socket APIs into polling busy-loops', correct: false },
        { id: 'j6d', text: 'Executes blocking operations directly inside GPU shader cores', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Virtual threads are lightweight user-mode threads managed by the JVM runtime that unmount from carrier threads during blocking I/O.',
    },
    {
      id: 'cs-java-7',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In the G1 Garbage Collector, how does the "Remembered Set" (RSet) optimize young generation collections?',
      options: [
        { id: 'j7a', text: 'Tracks inter-region pointers so Old Gen objects referencing Young Gen can be collected without full heap scanning', correct: true },
        { id: 'j7b', text: 'Compresses string literals using zlib in survivor spaces', correct: false },
        { id: 'j7c', text: 'Stores GC log metrics in Off-Heap DirectByteBuffers', correct: false },
        { id: 'j7d', text: 'Prevents thread scheduling during Metaspace class unloading', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'RSets allow G1 GC to scan and collect individual regions independently without performing expensive whole-heap traversals.',
    },
    {
      id: 'cs-java-8',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'Which method reference or construct in Java Streams creates an unmodifiable, order-preserving collector in Java 10+?',
      options: [
        { id: 'j8a', text: '`Collectors.toUnmodifiableList()`', correct: true },
        { id: 'j8b', text: '`Collections.synchronizedList(new ArrayList<>())`', correct: false },
        { id: 'j8c', text: '`Stream.of().freeze()`', correct: false },
        { id: 'j8d', text: '`Arrays.asImmutableList()`', correct: false },
      ],
      correctAnswer: 0,
      explanation: '`Collectors.toUnmodifiableList()` returns an immutable list implementation that rejects null elements and mutation operations.',
    },
    {
      id: 'cs-java-9',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'Why can "Thread Pinning" degrade performance when using Java 21 Virtual Threads inside `synchronized` blocks?',
      options: [
        { id: 'j9a', text: 'Virtual thread is pinned to its carrier OS thread during blocking I/O, preventing the carrier thread from executing other virtual threads', correct: true },
        { id: 'j9b', text: 'Causes immediate OutOfMemoryError in Metaspace', correct: false },
        { id: 'j9c', text: 'Disables Just-In-Time (JIT) C2 compilation for the entire class', correct: false },
        { id: 'j9d', text: 'Triggers a Stop-The-World Full GC pause', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Inside `synchronized` blocks or native methods, a virtual thread cannot unmount from its carrier thread, neutralizing virtual thread scalability. `ReentrantLock` avoids this.',
    },
    {
      id: 'cs-java-10',
      department: 'Computer Science',
      topic: 'Java',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'How does the ZGC (Z Garbage Collector) achieve sub-millisecond max pause times on multi-terabyte heaps?',
      options: [
        { id: 'j10a', text: 'Performs marking, relocation, and pointer reference remapping concurrently using colored pointers and load barriers', correct: true },
        { id: 'j10b', text: 'Freezes all background daemon threads and skips heap compaction', correct: false },
        { id: 'j10c', text: 'Dumps live objects into memory-mapped NVMe SSD swap files', correct: false },
        { id: 'j10d', text: 'Executes garbage collection exclusively at JVM shutdown', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'ZGC uses 64-bit colored pointers with load barriers to relocate and compact objects concurrently while application worker threads are running.',
    },
  ],

  // ==================== 2. COMPUTER SCIENCE: DSA ====================
  'DSA': [
    {
      id: 'cs-dsa-1',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the average and worst-case time complexity of searching in a balanced Binary Search Tree (AVL/Red-Black)?',
      options: [
        { id: 'd1a', text: 'O(log N) average, O(log N) worst-case', correct: true },
        { id: 'd1b', text: 'O(1) average, O(N) worst-case', correct: false },
        { id: 'd1c', text: 'O(N) average, O(N log N) worst-case', correct: false },
        { id: 'd1d', text: 'O(log N) average, O(N) worst-case', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Strict self-balancing invariants guarantee tree height h <= c * log2(N), ensuring strictly O(log N) search times.',
    },
    {
      id: 'cs-dsa-2',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which data structure is optimal for implementing an LRU (Least Recently Used) cache with O(1) get and put operations?',
      options: [
        { id: 'd2a', text: 'Hash Map combined with a Doubly Linked List', correct: true },
        { id: 'd2b', text: 'Binary Min-Heap with an Array', correct: false },
        { id: 'd2c', text: 'Skip List with Breadth-First Queue', correct: false },
        { id: 'd2d', text: 'Splay Tree with Adjacency Matrix', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'HashMap provides O(1) key lookups, while Doubly Linked List enables O(1) node relocation and tail eviction.',
    },
    {
      id: 'cs-dsa-3',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'In Dijkstra’s shortest path algorithm with an indexed binary min-heap, what is the total time complexity for a graph with V vertices and E edges?',
      options: [
        { id: 'd3a', text: 'O((V + E) log V)', correct: true },
        { id: 'd3b', text: 'O(V^2)', correct: false },
        { id: 'd3c', text: 'O(E * V)', correct: false },
        { id: 'd3d', text: 'O(V * log E)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Each vertex is extracted once (V log V) and each edge weight relax updates the priority queue (E log V), yielding O((V + E) log V).',
    },
    {
      id: 'cs-dsa-4',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'How does the Disjoint Set Union (DSU) structure achieve near-constant alpha(N) amortized time per operation?',
      options: [
        { id: 'd4a', text: 'By combining Path Compression with Union by Rank / Size', correct: true },
        { id: 'd4b', text: 'By using an uncompressed balanced AVL tree', correct: false },
        { id: 'd4c', text: 'By sorting all elements using QuickSort before each query', correct: false },
        { id: 'd4d', text: 'By caching all pairwise distances in an NxN adjacency matrix', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Path compression flattens trees during find operations while union by rank keeps small trees under large ones, giving O(alpha(N)) inverse Ackermann complexity.',
    },
    {
      id: 'cs-dsa-5',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'When finding topological order in a directed graph, what does a back-edge during DFS traversal signify?',
      options: [
        { id: 'd5a', text: 'A cycle exists in the graph; topological ordering is impossible', correct: true },
        { id: 'd5b', text: 'The graph is strongly connected in all components', correct: false },
        { id: 'd5c', text: 'The root vertex has zero in-degree', correct: false },
        { id: 'd5d', text: 'The graph is bipartite', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'A back-edge targets an ancestor node currently in the DFS recursion call stack, proving a directed cycle exists.',
    },
    {
      id: 'cs-dsa-6',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'In a Segment Tree handling range sum updates, how does Lazy Propagation achieve O(log N) updates?',
      options: [
        { id: 'd6a', text: 'Defers updates to child nodes until the children are explicitly queried in subsequent operations', correct: true },
        { id: 'd6b', text: 'Replaces tree nodes with asynchronous worker threads', correct: false },
        { id: 'd6c', text: 'Stores prefix sums in a fixed 2D binary matrix', correct: false },
        { id: 'd6d', text: 'Discards old tree layers using garbage collection', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Lazy propagation records pending update deltas in parent nodes and pushes them down only when child traversal is required.',
    },
    {
      id: 'cs-dsa-7',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'Which algorithm finds all bridges and articulation points in an undirected connected graph in O(V + E) time?',
      options: [
        { id: 'd7a', text: "Tarjan's Bridge-Finding Algorithm using discovery time and lowest reachable timestamp (low-link)", correct: true },
        { id: 'd7b', text: "Floyd-Warshall all-pairs dynamic programming algorithm", correct: false },
        { id: 'd7c', text: "Kruskal's Minimum Spanning Tree with union-find", correct: false },
        { id: 'd7d', text: "Bellman-Ford negative edge cycle detector", correct: false },
      ],
      correctAnswer: 0,
      explanation: "Tarjan's algorithm tracks discovery time `tin[u]` and lowest reachable ancestor `low[u]`. If `low[v] > tin[u]`, edge `u-v` is a bridge.",
    },
    {
      id: 'cs-dsa-8',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'What is the space complexity of Morris In-Order Tree Traversal, which visits all nodes without recursion or stack allocations?',
      options: [
        { id: 'd8a', text: 'O(1) auxiliary space', correct: true },
        { id: 'd8b', text: 'O(log N) auxiliary space', correct: false },
        { id: 'd8c', text: 'O(N) auxiliary space', correct: false },
        { id: 'd8d', text: 'O(N^2) auxiliary space', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Morris traversal temporarily creates threaded links between predecessor nodes and current roots to traverse trees with strictly O(1) extra space.',
    },
    {
      id: 'cs-dsa-9',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How does the Aho-Corasick automaton achieve O(Text_Length + Match_Count) simultaneous multi-pattern string matching?',
      options: [
        { id: 'd9a', text: 'Constructs a Trie with BFS failure transition links mimicking KMP fallback states', correct: true },
        { id: 'd9b', text: 'Computes polynomial rolling hashes across all 2^N text subsets', correct: false },
        { id: 'd9c', text: 'Parallelizes character comparisons across GPU CUDA tensor cores', correct: false },
        { id: 'd9d', text: 'Converts regular expressions into non-deterministic Turing tapes', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Aho-Corasick combines a Trie with failure links to transition between matching states in linear time proportional to text length.',
    },
    {
      id: 'cs-dsa-10',
      department: 'Computer Science',
      topic: 'DSA',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'In the Push-Relabel maximum network flow algorithm, how does the FIFO / Highest-Label heuristic achieve O(V^3) time complexity?',
      options: [
        { id: 'd10a', text: 'Maintains height labels for vertices and pushes excess flow locally downhill without finding global augmenting paths', correct: true },
        { id: 'd10b', text: 'Performs randomized depth-first walks over residual graphs', correct: false },
        { id: 'd10c', text: 'Solves linear programming equations using Simplex matrices', correct: false },
        { id: 'd10d', text: 'Sorts edge capacities using Radix sort before DFS', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Push-Relabel operates on preflows, pushing excess flow between adjacent nodes with valid height differentials.',
    },
  ],

  // ==================== 3. AI / ML: MACHINE LEARNING & DEEP LEARNING ====================
  'Machine Learning': [
    {
      id: 'ai-ml-1',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the primary difference between L1 (Lasso) and L2 (Ridge) weight regularization in linear models?',
      options: [
        { id: 'm1a', text: 'L1 induces sparse weight vectors (driving coefficients to 0), while L2 shrinks coefficients smoothly toward 0', correct: true },
        { id: 'm1b', text: 'L1 works only on tree models, while L2 works only on neural networks', correct: false },
        { id: 'm1c', text: 'L1 increases model variance, while L2 decreases bias', correct: false },
        { id: 'm1d', text: 'L2 causes exact zero feature weights, while L1 does not', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The L1 penalty diamond contour creates corners on coordinate axes where gradients force uninformative feature weights to exact zero.',
    },
    {
      id: 'ai-ml-2',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which metric is best suited for evaluating a fraud detection model with severe 99.9% negative class imbalance?',
      options: [
        { id: 'm2a', text: 'PR-AUC (Precision-Recall Area Under Curve) and F1-Score', correct: true },
        { id: 'm2b', text: 'Raw Classification Accuracy', correct: false },
        { id: 'm2c', text: 'Mean Squared Error (MSE)', correct: false },
        { id: 'm2d', text: 'Adjusted R-Squared', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Accuracy is misleading on imbalanced datasets (predicting all negative gives 99.9% accuracy). PR-AUC focuses on positive class precision and recall.',
    },
    {
      id: 'ai-ml-3',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'In Multi-Head Self-Attention, why is the dot-product scaled by `1 / sqrt(d_k)` before applying the softmax function?',
      options: [
        { id: 'm3a', text: 'To prevent large dot-product magnitudes from pushing softmax into regions with vanishingly small gradients', correct: true },
        { id: 'm3b', text: 'To ensure query and key matrices have identical dimensions', correct: false },
        { id: 'm3c', text: 'To convert floating-point activations to 8-bit integers', correct: false },
        { id: 'm3d', text: 'To enforce causal masking during decoding', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'For large vector dimensions d_k, dot products grow large in magnitude, causing softmax to yield near-one-hot outputs with near-zero gradients.',
    },
    {
      id: 'ai-ml-4',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'How does FlashAttention optimize the self-attention computation on modern GPUs (e.g. A100 / H100)?',
      options: [
        { id: 'm4a', text: 'Tiles Q, K, V blocks into fast SRAM to compute softmax incrementally without writing the N x N attention matrix to slow HBM', correct: true },
        { id: 'm4b', text: 'Replaces multi-head attention with linear dense convolutions', correct: false },
        { id: 'm4c', text: 'Quantizes all weight parameters to 1-bit binary representations', correct: false },
        { id: 'm4d', text: 'Prunes 90% of token embeddings during the forward pass', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'FlashAttention is IO-aware: it computes self-attention in blocks inside GPU fast SRAM using online softmax, avoiding high-bandwidth memory (HBM) bottlenecks.',
    },
    {
      id: 'ai-ml-5',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'What is the primary cause of "Covariate Shift" in production Machine Learning deployments?',
      options: [
        { id: 'm5a', text: 'Input feature distribution P(X) changes over time while the conditional label distribution P(Y|X) remains unchanged', correct: true },
        { id: 'm5b', text: 'Neural network weights overflow during float16 mixed-precision training', correct: false },
        { id: 'm5c', text: 'The learning rate schedule decays too rapidly', correct: false },
        { id: 'm5d', text: 'Loss function gradients oscillate around saddle points', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Covariate shift occurs when the distribution of inputs P(X) changes between training and production environments, degrading model inference accuracy.',
    },
    {
      id: 'ai-ml-6',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'In LoRA (Low-Rank Adaptation) for LLM fine-tuning, how is a weight matrix W of size (d x k) parameterized during adaptation?',
      options: [
        { id: 'm6a', text: 'W_new = W_frozen + (B x A), where B is (d x r), A is (r x k), and rank r << min(d, k)', correct: true },
        { id: 'm6b', text: 'W_new = W_frozen * random_mask(0.9)', correct: false },
        { id: 'm6c', text: 'W_new = Softmax(W_frozen) + LayerNorm(B)', correct: false },
        { id: 'm6d', text: 'W_new = FFT(W_frozen) * IFFT(A)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'LoRA freezes the pre-trained weights and injects trainable rank-decomposition matrices A and B, drastically reducing trainable parameter counts.',
    },
    {
      id: 'ai-ml-7',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'Why is RoPE (Rotary Position Embedding) widely favored in modern LLMs (LLaMA, Mistral, Gemma) over absolute sinusoidal positional embeddings?',
      options: [
        { id: 'm7a', text: 'Encodes relative token distances naturally through complex 2D vector rotations and generalizes to longer context windows', correct: true },
        { id: 'm7b', text: 'Eliminates the need for GPU matrix multiplication in attention layers', correct: false },
        { id: 'm7c', text: 'Forces the attention weights to be strictly symmetric', correct: false },
        { id: 'm7d', text: 'Requires zero memory storage during the forward pass', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'RoPE applies a rotation matrix to Query and Key vectors so that their dot product depends solely on relative token distance `m - n`.',
    },
    {
      id: 'ai-ml-8',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'In Deep Reinforcement Learning from Human Feedback (RLHF), what is the mathematical role of the KL-divergence penalty in the PPO reward function?',
      options: [
        { id: 'm8a', text: 'Prevents the policy model from drifting too far from the initial pre-trained reference model (reward hacking prevention)', correct: true },
        { id: 'm8b', text: 'Maximizes the entropy of token generation to make responses completely random', correct: false },
        { id: 'm8c', text: 'Compresses reward model logits into binary classification probabilities', correct: false },
        { id: 'm8d', text: 'Ensures gradients sum to 1 across all attention heads', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The KL penalty `D_KL(pi_theta || pi_ref)` stops the policy from exploiting inaccuracies in the reward model and generating nonsensical text.',
    },
    {
      id: 'ai-ml-9',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How does DPO (Direct Preference Optimization) eliminate the need for training an explicit reward model in LLM alignment?',
      options: [
        { id: 'm9a', text: 'Derives closed-form implicit reward directly from the log-likelihood ratio of chosen vs rejected completions against a reference model', correct: true },
        { id: 'm9b', text: 'Uses cosine distance between prompt vectors and target response vectors', correct: false },
        { id: 'm9c', text: 'Replaces reinforcement learning with k-means clustering of human feedback', correct: false },
        { id: 'm9d', text: 'Executes genetic crossover algorithms on model parameter weights', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'DPO reformulates the RLHF objective with an exact analytical solution, directly optimizing policy weights with simple binary cross-entropy loss.',
    },
    {
      id: 'ai-ml-10',
      department: 'AI / ML',
      topic: 'Machine Learning',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'In Mixture of Experts (MoE) architectures (e.g. Mixtral, GPT-4), how does Top-2 Routing with Load Balancing loss prevent expert collapse?',
      options: [
        { id: 'm9b', text: 'Applies auxiliary loss penalizing variance in routing probabilities to ensure uniform token distribution across all expert feed-forward networks', correct: true },
        { id: 'm9c', text: 'Forces every expert to compute identical outputs for safety verification', correct: false },
        { id: 'm9d', text: 'Randomly drops 50% of expert weights during each forward step', correct: false },
        { id: 'm9e', text: 'Routes tokens exclusively to the expert with the lowest parameter count', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Without load-balancing loss, router networks collapse into sending all tokens to a few favorite experts while leaving others starved and untrained.',
    },
  ],

  // ==================== 4. CLOUD & DEVOPS ====================
  'Cloud & DevOps': [
    {
      id: 'cd-1',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the primary benefit of multi-stage Docker builds?',
      options: [
        { id: 'cd1a', text: 'Produces minimal production image sizes by leaving build tools and intermediate artifacts in temporary build stages', correct: true },
        { id: 'cd1b', text: 'Allows running multiple containers inside a single Docker daemon', correct: false },
        { id: 'cd1c', text: 'Automatically provisions AWS EC2 instances', correct: false },
        { id: 'cd1d', text: 'Disables container root user permissions automatically', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Multi-stage builds allow copying only compiled artifacts into a clean minimal runtime base (e.g. Alpine/Distroless), shrinking attack surface and image size.',
    },
    {
      id: 'cd-2',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which Kubernetes resource maintains a set of identical Pod replicas running at all times?',
      options: [
        { id: 'cd2a', text: 'Deployment / ReplicaSet', correct: true },
        { id: 'cd2b', text: 'Ingress Controller', correct: false },
        { id: 'cd2c', text: 'ConfigMap', correct: false },
        { id: 'cd2d', text: 'PersistentVolumeClaim', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Deployments manage ReplicaSets, ensuring the desired number of Pod instances are healthy, restarted on failure, and updated rolling-restart style.',
    },
    {
      id: 'cd-3',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'In Terraform / OpenTofu, what is the purpose of a remote state backend with state locking (e.g. S3 + DynamoDB)?',
      options: [
        { id: 'cd3a', text: 'Stores state centrally and prevents concurrent conflicting infrastructure deployments using distributed locks', correct: true },
        { id: 'cd3b', text: 'Compresses Terraform HCL code into binary files', correct: false },
        { id: 'cd3c', text: 'Executes Docker builds inside cloud VPCs', correct: false },
        { id: 'cd3d', text: 'Replaces AWS CloudFormation templates with YAML files', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Remote backends securely persist state in cloud storage while DynamoDB locks the state file during `terraform apply` to prevent race conditions.',
    },
    {
      id: 'cd-4',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'In Kubernetes networking, how does a ClusterIP Service route traffic to individual backend Pods?',
      options: [
        { id: 'cd4a', text: 'kube-proxy configures iptables / IPVS rules that load balance the virtual Service IP to active Pod endpoints', correct: true },
        { id: 'cd4b', text: 'Routes all traffic through the Kubernetes control-plane API server', correct: false },
        { id: 'cd4c', text: 'Requires modifying DNS /etc/hosts on every worker node manually', correct: false },
        { id: 'cd4d', text: 'Broadcasts all UDP packets to all subnet network interfaces', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'kube-proxy watches the API server for Endpoint changes and updates IPVS or iptables rules to distribute cluster traffic efficiently.',
    },
    {
      id: 'cd-5',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'What does a `CrashLoopBackOff` status in a Kubernetes Pod typically indicate?',
      options: [
        { id: 'cd5a', text: 'The container started, crashed/exited with a non-zero code, and kubelet is backing off restarts exponentially', correct: true },
        { id: 'cd5b', text: 'The node ran out of physical disk space', correct: false },
        { id: 'cd5c', text: 'The container image was deleted from Docker Hub', correct: false },
        { id: 'cd5d', text: 'The Pod has successfully completed all batch tasks', correct: false },
      ],
      correctAnswer: 0,
      explanation: '`CrashLoopBackOff` means the application inside the container is failing or panicking on startup (e.g. missing env var, config error, DB connection failure).',
    },
    {
      id: 'cd-6',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'How does a Service Mesh (e.g. Istio / Linkerd) implement mutual TLS (mTLS) between microservices without application code changes?',
      options: [
        { id: 'cd6a', text: 'Injects an Envoy sidecar proxy into each Pod that intercepts network traffic and handles TLS handshakes and certificate rotation', correct: true },
        { id: 'cd6b', text: 'Compiles custom SSL drivers into the Linux kernel image', correct: false },
        { id: 'cd6c', text: 'Encrypts hard drives using BitLocker hardware chips', correct: false },
        { id: 'cd6d', text: 'Forces microservices to communicate exclusively over SSH tunnels', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Sidecar proxies transparently intercept inbound and outbound TCP traffic via iptables, authenticating peer identity with short-lived X.509 certs.',
    },
    {
      id: 'cd-7',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In GitOps deployments with ArgoCD or Flux, how is configuration drift reconciled?',
      options: [
        { id: 'cd7a', text: 'Controller continuously compares live cluster state against the declared Git manifest repository and auto-syncs deviations', correct: true },
        { id: 'cd7b', text: 'Deletes the entire cluster if any engineer runs kubectl manually', correct: false },
        { id: 'cd7c', text: 'Executes git push commands from inside Kubernetes worker nodes', correct: false },
        { id: 'cd7d', text: 'Stores Git credentials inside container environment variables', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'GitOps treats Git as the single source of truth; automated operators pull changes and reconcile discrepancies between Git and production.',
    },
    {
      id: 'cd-8',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Hard',
      type: 'Coding',
      question: 'Which Prometheus metric type is suitable for measuring API request latency distributions and calculating 99th percentile (p99) SLOs?',
      options: [
        { id: 'cd8a', text: 'Histogram or Summary with `histogram_quantile()` PromQL queries', correct: true },
        { id: 'cd8b', text: 'Gauge metric with static thresholds', correct: false },
        { id: 'cd8c', text: 'Monotonically increasing Counter metric alone', correct: false },
        { id: 'cd8d', text: 'String log stream format', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Histograms sample observations into configurable buckets, allowing accurate percentile calculation (e.g. p95, p99) across aggregated cluster nodes.',
    },
    {
      id: 'cd-9',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'In eBPF-based observability and networking (e.g. Cilium), why is eBPF significantly faster than traditional iptables for high-throughput routing?',
      options: [
        { id: 'cd9a', text: 'Executes JIT-compiled sandboxed bytecode directly at socket/XDP layers in the Linux kernel without sequential rule traversal', correct: true },
        { id: 'cd9b', text: 'Bypasses the CPU cache to write directly to network interface ROM', correct: false },
        { id: 'cd9c', text: 'Converts all IPv6 traffic into unencrypted HTTP/1.1 packets', correct: false },
        { id: 'cd9d', text: 'Eliminates TCP handshakes completely', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'eBPF replaces linear O(N) iptables rule scanning with O(1) hash map lookups and packet processing at the network driver (XDP) layer in the kernel.',
    },
    {
      id: 'cd-10',
      department: 'Cloud & DevOps',
      topic: 'Cloud & DevOps',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'How does an AWS Multi-Region Active-Active deployment handle write conflicts across distributed Aurora Global Databases or DynamoDB Global Tables?',
      options: [
        { id: 'cd10a', text: 'Uses Last-Write-Wins (LWW) timestamp reconciliation or CRDTs with asynchronous multi-master replication streams', correct: true },
        { id: 'cd10b', text: 'Executes synchronous 2-Phase Commit across transatlantic fiber links on every write', correct: false },
        { id: 'cd10c', text: 'Locks all global tables until a single master region approves the transaction', correct: false },
        { id: 'cd10d', text: 'Rejects all writes from secondary regions', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Active-Active global databases rely on deterministic conflict resolution (such as LWW or CRDT state merging) to reconcile asynchronous concurrent writes.',
    },
  ],

  // ==================== 5. CYBERSECURITY ====================
  'Cybersecurity': [
    {
      id: 'cy-1',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Which of the following is the most effective defense against SQL Injection vulnerabilities?',
      options: [
        { id: 'cy1a', text: 'Parameterized queries (Prepared Statements) with Object-Relational Mapping (ORM)', correct: true },
        { id: 'cy1b', text: 'Escaping single quotes with regex in JavaScript frontend', correct: false },
        { id: 'cy1c', text: 'Encrypting the database passwords with MD5 hashing', correct: false },
        { id: 'cy1d', text: 'Restricting web traffic to HTTPS port 443 only', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Prepared statements treat user input strictly as literal parameter data, preventing the SQL engine from interpreting user inputs as SQL syntax.',
    },
    {
      id: 'cy-2',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What protection does the `HttpOnly` flag on authentication cookies provide?',
      options: [
        { id: 'cy2a', text: 'Prevents client-side JavaScript (e.g. XSS payloads) from accessing `document.cookie`', correct: true },
        { id: 'cy2b', text: 'Encrypts the cookie contents using AES-256 in transit', correct: false },
        { id: 'cy2c', text: 'Forces the cookie to expire when the browser tab closes', correct: false },
        { id: 'cy2d', text: 'Prevents the cookie from being transmitted over HTTP connections', correct: false },
      ],
      correctAnswer: 0,
      explanation: '`HttpOnly` blocks malicious JavaScript injected via Cross-Site Scripting (XSS) from reading session tokens stored in cookies.',
    },
    {
      id: 'cy-3',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'Coding',
      question: 'Why should passwords NEVER be hashed with fast algorithms like SHA-256 or MD5, even with salt?',
      options: [
        { id: 'cy3a', text: 'Modern GPUs can compute billions of SHA-256 hashes per second, making offline brute-force trivial. Use bcrypt, Argon2id, or scrypt.', correct: true },
        { id: 'cy3b', text: 'SHA-256 produces hash collisions on passwords shorter than 12 characters', correct: false },
        { id: 'cy3c', text: 'SHA-256 is an asymmetric public key algorithm', correct: false },
        { id: 'cy3d', text: 'Linux kernel does not support SHA-256 hashing', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Password hashing functions must be intentionally slow and memory-hard (like Argon2id or bcrypt) with tunable cost factors to resist GPU/ASIC cracking.',
    },
    {
      id: 'cy-4',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'How does Cross-Site Request Forgery (CSRF) differ from Cross-Site Scripting (XSS)?',
      options: [
        { id: 'cy4a', text: 'CSRF tricks an authenticated browser into submitting unauthorized actions; XSS executes arbitrary script in the victim’s browser', correct: true },
        { id: 'cy4b', text: 'CSRF only affects mobile devices; XSS only affects desktop browsers', correct: false },
        { id: 'cy4c', text: 'XSS exploits SQL databases, while CSRF exploits DNS servers', correct: false },
        { id: 'cy4d', text: 'There is no difference; they are alternative names for buffer overflow attacks', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'CSRF exploits the trust a site has in a user’s browser (via auto-sent cookies), whereas XSS exploits the trust a user has in a vulnerable website.',
    },
    {
      id: 'cy-5',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'In modern TLS 1.3 handshakes, which mechanism provides "Perfect Forward Secrecy" (PFS)?',
      options: [
        { id: 'cy5a', text: 'Ephemeral Diffie-Hellman key exchange (ECDHE) where unique session keys cannot be decrypted even if the server private key is leaked later', correct: true },
        { id: 'cy5b', text: 'RSA static private key encryption of premaster secrets', correct: false },
        { id: 'cy5c', text: 'Hardcoding symmetric master keys in client browsers', correct: false },
        { id: 'cy5d', text: 'Transmitting certificates over unencrypted DNS records', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'PFS generates ephemeral per-session key pairs that are discarded after use, ensuring past recorded encrypted traffic cannot be decrypted retroactively.',
    },
    {
      id: 'cy-6',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'Which vulnerability enables an attacker to query internal cloud instance metadata services (169.254.169.254) from vulnerable web apps?',
      options: [
        { id: 'cy6a', text: 'Server-Side Request Forgery (SSRF)', correct: true },
        { id: 'cy6b', text: 'Cross-Site Request Forgery (CSRF)', correct: false },
        { id: 'cy6c', text: 'DNS Cache Poisoning', correct: false },
        { id: 'cy6d', text: 'Local File Inclusion (LFI)', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'SSRF tricks backend servers into making requests to internal endpoints (like AWS metadata), leaking temporary IAM credentials and internal topology.',
    },
    {
      id: 'cy-7',
      department: 'Cybersecurity',
      topic: 'Cybersecurity',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In Zero Trust Architecture (ZTA), what is the core operational principle?',
      options: [
        { id: 'cy7a', text: 'Never trust, always verify — enforce strict continuous authentication, device health checks, and least-privilege per request', correct: true },
        { id: 'cy7b', text: 'Trust all traffic originated from inside corporate VPN boundaries', correct: false },
        { id: 'cy7c', text: 'Eliminate firewalls and rely solely on password length', correct: false },
        { id: 'cy7d', text: 'Disable all audit logging to prevent credential exposure', correct: false },
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

  // ==================== 6. PRODUCT MANAGEMENT ====================
  'Product Management': [
    {
      id: 'pm-1',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is the primary difference between a Product Metric (KPI) and an Engineering Output Metric?',
      options: [
        { id: 'pm1a', text: 'Product metrics measure user outcomes and business value (e.g. retention, conversion); engineering metrics measure delivery velocity (e.g. PR cycle time, deployment frequency)', correct: true },
        { id: 'pm1b', text: 'Product metrics only track revenue; engineering metrics only track bug counts', correct: false },
        { id: 'pm1c', text: 'Engineering metrics are managed by CEOs; product metrics are managed by QA testers', correct: false },
        { id: 'pm1d', text: 'There is no difference between them', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Product managers focus on moving customer behavior and business outcomes, whereas engineering outputs measure production velocity and reliability.',
    },
    {
      id: 'pm-2',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'What is a "North Star Metric" (NSM) for a digital software product?',
      options: [
        { id: 'pm2a', text: 'The single key metric that best captures the core customer value delivered and predicts long-term business sustainability', correct: true },
        { id: 'pm2b', text: 'Total lines of code written in the git repository', correct: false },
        { id: 'pm2c', text: 'Total marketing ad spend in dollars per quarter', correct: false },
        { id: 'pm2d', text: 'The number of employees hired per month', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'The North Star Metric aligns cross-functional teams around product value creation (e.g. Spotify: Time spent listening; Airbnb: Nights booked).',
    },
    {
      id: 'pm-3',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Medium',
      type: 'Case Study',
      question: 'In the RICE prioritization framework, how is the overall priority score calculated for feature candidates?',
      options: [
        { id: 'pm3a', text: 'RICE Score = (Reach x Impact x Confidence) / Effort', correct: true },
        { id: 'pm3b', text: 'RICE Score = (Revenue + Impact) * Complexity', correct: false },
        { id: 'pm3c', text: 'RICE Score = (Risk x Cost) / Execution_Speed', correct: false },
        { id: 'pm3d', text: 'RICE Score = Retention / Customer_Acquisition_Cost', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'RICE balances Reach (audience size), Impact (per-user value), and Confidence (evidence strength) divided by engineering Effort (person-months).',
    },
    {
      id: 'pm-4',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'When analyzing user onboarding drop-off in a funnel, what is the best technique to distinguish UX friction from poor product-market fit?',
      options: [
        { id: 'pm4a', text: 'Cohort retention analysis combined with session replay telemetry and user exit interviews', correct: true },
        { id: 'pm4b', text: 'Doubling paid search advertising spend immediately', correct: false },
        { id: 'pm4c', text: 'Decreasing subscription pricing by 50%', correct: false },
        { id: 'pm4d', text: 'Adding 10 new feature buttons to the navigation bar', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Cohort retention curves show if retained users find recurring value (PMF), while session recordings and funnel step drop-off isolate UX friction.',
    },
    {
      id: 'pm-5',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Medium',
      type: 'Case Study',
      question: 'In an A/B test with 95% statistical significance (p < 0.05), what does the p-value represent?',
      options: [
        { id: 'pm5a', text: 'The probability of observing the test difference by random chance if the null hypothesis (no real effect) were true', correct: true },
        { id: 'pm5b', text: 'The exact percentage of revenue growth guaranteed next month', correct: false },
        { id: 'pm5c', text: 'The probability that the test variant will never suffer from bugs', correct: false },
        { id: 'pm5d', text: 'The total number of users who clicked the primary CTA button', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'A p-value < 0.05 means there is less than a 5% chance the observed conversion difference is merely random sampling noise.',
    },
    {
      id: 'pm-6',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'How should a PM formulate a Minimum Viable Product (MVP) for a complex multi-sided marketplace platform?',
      options: [
        { id: 'pm6a', text: 'Build the thinnest vertical slice (e.g. Concierge MVP or Wizard of Oz) that tests core supply-demand transaction willingness with minimal code', correct: true },
        { id: 'pm6b', text: 'Spend 18 months building all buyer and seller features before initial beta release', correct: false },
        { id: 'pm6c', text: 'Launch without pricing models or user authentication', correct: false },
        { id: 'pm6d', text: 'Outsource all engineering to external consultants without product specifications', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'An MVP is an experimental tool designed to validate the highest-risk assumptions (e.g. will buyers pay, will sellers fulfill) with minimum invested effort.',
    },
    {
      id: 'pm-7',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In B2B SaaS, what is the significance of the "LTV / CAC ratio" and "CAC Payback Period"?',
      options: [
        { id: 'pm7a', text: 'LTV/CAC >= 3x and CAC Payback < 12 months indicate healthy, scalable unit economics for sustainable growth', correct: true },
        { id: 'pm7b', text: 'LTV/CAC must equal exactly 1.0 to break even on day 1', correct: false },
        { id: 'pm7c', text: 'CAC Payback should be over 5 years to maximize venture debt', correct: false },
        { id: 'pm7d', text: 'LTV measures server hosting costs; CAC measures bug counts', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'A 3x+ LTV to CAC ratio proves customers generate significantly more gross margin than the cost to acquire them, while sub-12mo payback keeps cash flow positive.',
    },
    {
      id: 'pm-8',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'When managing technical debt vs new feature development with engineering leads, what is the best product practice?',
      options: [
        { id: 'pm8a', text: 'Dedicate a predictable 15-20% capacity per sprint to tech debt refactoring and link technical health to product velocity and uptime SLOs', correct: true },
        { id: 'pm8b', text: 'Refuse all tech debt refactoring until all planned roadmap features are shipped', correct: false },
        { id: 'pm8c', text: 'Halt all product feature development for 6 months to completely rewrite the codebase from scratch', correct: false },
        { id: 'pm8d', text: 'Delegate all roadmap prioritization to customer support tickets', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Continuous tech debt investment maintains delivery velocity and system reliability without requiring risky multi-year full rewrites.',
    },
    {
      id: 'pm-9',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'In Product-Led Growth (PLG), what is the "Time to Value" (TTV) and "Aha Moment"?',
      options: [
        { id: 'pm9a', text: 'TTV is the elapsed time until a new user experiences the core utility of the product (Aha Moment), driving organic self-serve activation', correct: true },
        { id: 'pm9b', text: 'TTV is the date when the startup files for an Initial Public Offering (IPO)', correct: false },
        { id: 'pm9c', text: 'Aha Moment is when an engineer completes a code review', correct: false },
        { id: 'pm9d', text: 'TTV measures the latency of database write transactions', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'PLG relies on shortening TTV so self-serve users quickly experience the Aha Moment (e.g. Slack: 2,000 team messages sent; Dropbox: 1 file dropped into a folder).',
    },
    {
      id: 'pm-10',
      department: 'Product Management',
      topic: 'Product Management',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'How should a Principal Product Manager navigate cannibalization when transitioning an established enterprise product to an AI-native automated workflow?',
      options: [
        { id: 'pm1a', text: 'Proactively disrupt existing manual seat-based billing with value/consumption-based pricing before external AI competitors make the legacy product obsolete', correct: true },
        { id: 'pm1b', text: 'Ban AI features to protect legacy professional services revenue', correct: false },
        { id: 'pm1c', text: 'Wait until market share drops 50% before initiating product discovery', correct: false },
        { id: 'pm1d', text: 'Sell the business immediately to private equity', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Market leaders must be willing to self-cannibalize legacy workflows with superior AI-native paradigms to capture long-term market leadership.',
    },
  ],

  // ==================== 7. UI / UX DESIGN ====================
  'UI / UX': [
    {
      id: 'ux-1',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'According to Fitts’s Law, how can UI designers make interactive elements (e.g. CTA buttons) easier and faster to click/tap?',
      options: [
        { id: 'ux1a', text: 'Increase target size and reduce the distance the cursor/finger must travel to reach it', correct: true },
        { id: 'ux1b', text: 'Use serif typography and low-contrast grey text', correct: false },
        { id: 'ux1c', text: 'Place primary buttons in hidden collapsible dropdown menus', correct: false },
        { id: 'ux1d', text: 'Add 3-second delay animations before buttons become clickable', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Fitts’s Law states that target acquisition time is a function of target distance and target width: larger, closer targets are faster to acquire.',
    },
    {
      id: 'ux-2',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Easy',
      type: 'MCQ',
      question: 'Under WCAG 2.1 Level AA accessibility guidelines, what is the minimum required color contrast ratio for normal body text?',
      options: [
        { id: 'ux2a', text: '4.5:1 contrast ratio against the background', correct: true },
        { id: 'ux2b', text: '1.5:1 contrast ratio against the background', correct: false },
        { id: 'ux2c', text: '10:1 contrast ratio against the background', correct: false },
        { id: 'ux2d', text: 'Color contrast is not required for body text', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'WCAG AA requires 4.5:1 for normal text (< 18pt / 14pt bold) and 3:1 for large text and UI components/icons.',
    },
    {
      id: 'ux-3',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Medium',
      type: 'Scenario Based',
      question: 'What is Hick’s Law, and how does it influence modern mobile navigation design?',
      options: [
        { id: 'ux3a', text: 'Decision time increases logarithmically with the number of choices; reducing options speeds up user action', correct: true },
        { id: 'ux3b', text: 'Users spend most of their time on other websites, so designs should feel familiar', correct: false },
        { id: 'ux3c', text: 'Memory recall is limited to 7 plus or minus 2 items', correct: false },
        { id: 'ux3d', text: 'Visual elements grouped together are perceived as related', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Hick’s Law states `T = b * log2(n + 1)`. Simplifying complex menus into clear, progressive choices accelerates user decision-making.',
    },
    {
      id: 'ux-4',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Medium',
      type: 'Case Study',
      question: 'Why are skeleton loaders preferred over spinner loaders in modern web applications (Linear, Notion, Apple)?',
      options: [
        { id: 'ux4a', text: 'Reduces perceived wait time by outlining the final layout structure and preventing sudden visual layout shifts (CLS)', correct: true },
        { id: 'ux4b', text: 'Requires zero CSS or JavaScript to render', correct: false },
        { id: 'ux4c', text: 'Blocks user interaction until 100% of data is loaded', correct: false },
        { id: 'ux4d', text: 'Disables browser cache memory leaks', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Skeleton screens provide visual momentum and anticipate layout shapes, lowering perceived cognitive latency compared to indeterminate spinners.',
    },
    {
      id: 'ux-5',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Medium',
      type: 'Debugging',
      question: 'When designing keyboard navigation accessibility, what is the purpose of a visible focus ring (`:focus-visible`)?',
      options: [
        { id: 'ux5a', text: 'Enables keyboard/screen-reader users to visually identify the currently active interactive element', correct: true },
        { id: 'ux5b', text: 'Highlights text when mouse users hover over paragraphs', correct: false },
        { id: 'ux5c', text: 'Prevents form inputs from accepting special characters', correct: false },
        { id: 'ux5d', text: 'Displays validation error tooltips on mobile touch screens', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Removing focus outlines (`outline: none`) without an accessible alternative breaks usability for keyboard-only and motor-impaired users.',
    },
    {
      id: 'ux-6',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'In modern Design Systems (e.g. Figma Tokens, CSS Tokens), what is the architectural benefit of 3-tier Design Tokens (Global -> Semantic -> Component)?',
      options: [
        { id: 'ux6a', text: 'Enables seamless multi-theme switching (Light/Dark/High Contrast) and systematic design updates across iOS, Android, and Web', correct: true },
        { id: 'ux6b', text: 'Eliminates the need for frontend developers to write CSS code', correct: false },
        { id: 'ux6c', text: 'Compresses image assets automatically into WebP formats', correct: false },
        { id: 'ux6d', text: 'Prevents SVG icons from rendering on low-DPI displays', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Semantic tokens (e.g. `color.bg.surface.primary`) decouple raw hex values from UI components, allowing theme transformations across multi-platform codebases.',
    },
    {
      id: 'ux-7',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Hard',
      type: 'Case Study',
      question: 'In User Research, how does the "Jobs to be Done" (JTBD) framework differ from traditional demographic personas?',
      options: [
        { id: 'ux7a', text: 'Focuses on the underlying functional, emotional, and social progress a user is trying to achieve in a specific circumstance', correct: true },
        { id: 'ux7b', text: 'Categorizes users exclusively by age, gender, and income brackets', correct: false },
        { id: 'ux7c', text: 'Focuses only on the user’s job title and employer size', correct: false },
        { id: 'ux7d', text: 'Requires users to complete a 50-question Myers-Briggs personality test', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'JTBD explores the causal reason customers "hire" a product to solve a specific problem (e.g. "When I have a long commute, I want a snack that keeps me full and doesn’t make a mess").',
    },
    {
      id: 'ux-8',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Hard',
      type: 'Scenario Based',
      question: 'What is the "Doherty Threshold" in interaction design, and what latency target does it establish?',
      options: [
        { id: 'ux8a', text: 'System response time < 400ms keeps user attention engaged in an interactive flow without mental context switching', correct: true },
        { id: 'ux8b', text: 'Websites must load within 10 seconds on 3G cellular connections', correct: false },
        { id: 'ux8c', text: 'Mobile tap target sizes must exceed 100 pixels', correct: false },
        { id: 'ux8d', text: 'Users should never scroll more than 3 viewport heights on a single page', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'When computer response latency drops under 400ms, user productivity increases exponentially because cognitive flow is maintained.',
    },
    {
      id: 'ux-9',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Expert',
      type: 'Case Study',
      question: 'How should an AI assistant interface handle ambiguous user requests according to Human-AI Interaction design guidelines (e.g. Apple Human Interface / Microsoft AI)?',
      options: [
        { id: 'ux9a', text: 'Provide clear confidence-aware defaults, show progressive disclosure options, and make AI edits reversible with explicit undo actions', correct: true },
        { id: 'ux9b', text: 'Execute destructive database changes immediately without confirmation dialogs', correct: false },
        { id: 'ux9c', text: 'Display raw model logits and floating-point error codes to the user', correct: false },
        { id: 'ux9d', text: 'Freeze the user interface while waiting for background model inference', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Human-AI guidelines mandate transparency, reversible actions, graceful failure modes, and clear provenance of generated recommendations.',
    },
    {
      id: 'ux-10',
      department: 'UI / UX',
      topic: 'UI / UX',
      difficulty: 'Expert',
      type: 'Scenario Based',
      question: 'When designing a complex enterprise data grid with 100,000+ rows, what UX pattern prevents browser memory freezing while enabling keyboard cell navigation?',
      options: [
        { id: 'ux10a', text: 'Virtual DOM windowing (rendering only visible viewport DOM nodes) with ARIA grid roving tabindex for full screen-reader compliance', correct: true },
        { id: 'ux10b', text: 'Rendering all 100,000 `<tr>` elements into standard HTML tables simultaneously', correct: false },
        { id: 'ux10c', text: 'Disabling keyboard navigation and requiring mouse-only horizontal scrolling', correct: false },
        { id: 'ux10d', text: 'Converting data tables into static JPEG images', correct: false },
      ],
      correctAnswer: 0,
      explanation: 'Virtualization renders only the 20-30 visible rows in memory, while the roving tabindex pattern enables smooth arrow-key traversal across virtualized cells.',
    },
  ],
};

export interface AdaptiveAssessmentProfile {
  department?: string;
  branch?: string;
  careerGoal?: string;
  targetRole?: string;
  builderLevel?: number;
  xp?: number;
  streakDays?: number;
  verifiedSkills?: { name: string; score: number }[];
  weakAreas?: string[];
  pastAssessmentScores?: number[];
  githubConnected?: boolean;
}

export interface GeneratedAssessment {
  id: string;
  title: string;
  department: string;
  topic: string;
  difficultyTier: 'Foundational' | 'Intermediate' | 'Advanced' | 'Industry Expert';
  adaptationReason: string;
  questions: ComprehensiveAssessmentQuestion[];
  estimatedMinutes: number;
  xpReward: number;
  passThreshold: number;
  targetRole: string;
}

/**
 * Assessment Engine 3.0: True Personalization
 * Generates dynamic, adaptive 10-question evaluations based on department, branch,
 * target career, GitHub activity, skill history, weak areas, and builder level.
 */
export function generatePersonalizedAssessment(
  topicName: string,
  profile: AdaptiveAssessmentProfile
): GeneratedAssessment {
  const department = profile.department || profile.branch || 'Computer Science';
  const targetRole = profile.targetRole || profile.careerGoal || 'Software Development';
  const builderLevel = profile.builderLevel || (profile.xp ? Math.floor(profile.xp / 250) + 1 : 1);
  const avgPastScore = profile.pastAssessmentScores && profile.pastAssessmentScores.length > 0
    ? profile.pastAssessmentScores.reduce((a, b) => a + b, 0) / profile.pastAssessmentScores.length
    : 80;

  // Determine appropriate topic bank
  let bankKey = topicName;
  if (!COMPREHENSIVE_QUESTION_BANK[bankKey]) {
    if (department.includes('AI') || targetRole.includes('AI') || targetRole.includes('Machine Learning') || topicName.includes('AI') || topicName.includes('ML')) {
      bankKey = 'Machine Learning';
    } else if (department.includes('Cyber') || targetRole.includes('Security') || topicName.includes('Security') || topicName.includes('OWASP')) {
      bankKey = 'Cybersecurity';
    } else if (department.includes('Cloud') || department.includes('DevOps') || targetRole.includes('Cloud') || targetRole.includes('DevOps')) {
      bankKey = 'Cloud & DevOps';
    } else if (department.includes('Product') || targetRole.includes('Product') || topicName.includes('Product')) {
      bankKey = 'Product Management';
    } else if (department.includes('UI') || department.includes('UX') || department.includes('Design') || targetRole.includes('Design') || targetRole.includes('UI')) {
      bankKey = 'UI / UX';
    } else if (topicName.includes('DSA') || topicName.includes('Algorithm') || topicName.includes('Structure')) {
      bankKey = 'DSA';
    } else {
      bankKey = 'Java';
    }
  }

  const rawBank = COMPREHENSIVE_QUESTION_BANK[bankKey] || COMPREHENSIVE_QUESTION_BANK['Java'];

  // Smart Adaptive Progression based on user level and performance history:
  // Lower Level / Struggling -> More foundational (Easy/Med) with learning explanations
  // Higher Level / Strong -> Advanced / Industry Expert challenges
  let easyCount = 2;
  let medCount = 3;
  let hardCount = 3;
  let expertCount = 2;
  let difficultyTier: GeneratedAssessment['difficultyTier'] = 'Intermediate';
  let adaptationReason = `Calibrated for Level ${builderLevel} ${targetRole} roadmap.`;

  if (builderLevel >= 5 || avgPastScore >= 88 || (profile.streakDays && profile.streakDays >= 14)) {
    // Advanced / High performer
    easyCount = 1;
    medCount = 2;
    hardCount = 4;
    expertCount = 3;
    difficultyTier = 'Industry Expert';
    adaptationReason = `High builder momentum & Level ${builderLevel} detected. Elevated to Industry Expert tier with architectural and edge-case challenge questions.`;
  } else if (builderLevel <= 2 || avgPastScore < 65) {
    // Foundational / Learning
    easyCount = 4;
    medCount = 4;
    hardCount = 2;
    expertCount = 0;
    difficultyTier = 'Foundational';
    adaptationReason = `Adapted for foundational core competency reinforcement with guided diagnostic breakdown.`;
  }

  const easyQ = rawBank.filter((q) => q.difficulty === 'Easy').slice(0, easyCount);
  const medQ = rawBank.filter((q) => q.difficulty === 'Medium').slice(0, medCount);
  const hardQ = rawBank.filter((q) => q.difficulty === 'Hard').slice(0, hardCount);
  const expertQ = rawBank.filter((q) => q.difficulty === 'Expert').slice(0, expertCount);

  let finalQuestions = [...easyQ, ...medQ, ...hardQ, ...expertQ];

  // Backfill if needed to guarantee exact 10 questions
  if (finalQuestions.length < 10) {
    for (const q of rawBank) {
      if (!finalQuestions.some((fq) => fq.id === q.id)) {
        finalQuestions.push(q);
        if (finalQuestions.length >= 10) break;
      }
    }
  }

  return {
    id: `eval-${bankKey.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
    title: `${topicName} — Personalized ${difficultyTier} Assessment`,
    department,
    topic: topicName,
    difficultyTier,
    adaptationReason,
    questions: finalQuestions.slice(0, 10),
    estimatedMinutes: difficultyTier === 'Industry Expert' ? 25 : 20,
    xpReward: difficultyTier === 'Industry Expert' ? 150 : difficultyTier === 'Intermediate' ? 120 : 100,
    passThreshold: 70,
    targetRole,
  };
}
