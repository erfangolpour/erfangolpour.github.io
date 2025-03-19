import {
    AnimatePresence,
    motion,
    useScroll,
    useSpring,
    useTransform
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import AOM from "../assets/projectDemos/AOM.png";
import GreenSignal from "../assets/projectDemos/GreenSignal.png";
import KIRAL from "../assets/projectDemos/KIRAL.png";
import MMOA from "../assets/projectDemos/MMOA.png";
import TaskTree from "../assets/projectDemos/TaskTree.png";

export function Projects() {
    const [active, setActive] = useState<(typeof projects)[number] | boolean | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef, () => {
        if (active && typeof active === "object") {
            setActive(null);
        }
    });

    useEffect(() => {
        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [active]);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence >
                {active && typeof active === "object" && (
                    // MODAL
                    <div className="fixed inset-0 flex justify-center items-center z-20 p-6">
                        <motion.div
                            ref={modalRef}
                            layoutId={`card-${active.title}-project`}
                            className="size-full relative rounded-xl overflow-y-auto bg-white dark:bg-neutral-800 px-30 py-20 flex gap-20"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setActive(null)}
                                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="flex flex-col gap-8 w-2/5 shrink-0 justify-center">
                                <div className="">
                                    <h2 className="text-4xl font-bold mb-2">
                                        {active.title}
                                    </h2>
                                    <p className="text-xs">
                                        {active.description}
                                    </p>
                                </div>
                                <div className="text-lg overflow-y-auto flex flex-col gap-5">
                                    {active.content}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={active.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                                    >
                                        <span>View Project</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="17 8 12 13 7 8"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <img
                                src={active.thumbnail}
                                alt={active.title}
                                className="size-full object-cover object-left-top rounded-xl"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <div
                ref={containerRef}
                className="relative w-full overflow-x-clip antialiased [perspective:1000px] [transform-style:preserve-3d]"
            >
                <div className="px-6 sm:px-10 md:px-20 py-10 sm:py-16 md:py-40 text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold dark:text-white mb-4 md:mb-8">
                        Featured Projects <br /> A selection of my work
                    </h1>
                    <p className="max-w-2xl text-base sm:text-lg md:text-xl dark:text-neutral-200">
                        Here are some of the projects I have worked on, showcasing my skills and experience in various areas including web development, TUI tools, algorithm design, and more.
                    </p>
                </div>
                <motion.div
                    style={{
                        rotateX,
                        rotateZ,
                        translateY,
                        opacity,
                    }}
                    className="flex flex-col gap-[4vw]"
                >
                    {Array.from({ length: 3 }).map((_, rowIndex) => (
                        <motion.div
                            key={rowIndex}
                            className={`flex ${rowIndex % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} gap-[4vw]`}
                        >
                            {projects.slice(rowIndex * 4, rowIndex * 4 + 4).map((project) => (
                                <motion.div
                                    whileHover={{ y: -20 }}
                                    style={{ x: rowIndex % 2 === 0 ? translateX : translateXReverse, backgroundImage: `url(${project.thumbnail})` }}
                                    onClick={() => setActive(project)}
                                    className="group/project h-[45vh] w-[70vw] md:w-[40vw] 2xl:w-[35vw] flex-none cursor-pointer rounded-xl bg-cover bg-left-top hover:shadow-2xl"
                                    key={`${project.title}-project`}
                                >
                                    <motion.div
                                        className="size-full"
                                        layoutId={`card-${project.title}-project`}
                                    >
                                        <div className="size-full flex flex-col backdrop-blur-xs bg-black/80 opacity-0 group-hover/project:opacity-100 p-10 gap-3 rounded-xl transition-opacity">
                                            <h2 className="text-3xl font-bold mt-auto">
                                                {project.title}
                                            </h2>
                                            <p className="text-sm">
                                                {project.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

const projects = [
    {
        title: "ArguX",
        description: "A Python script that uses YOLOv4 for detecting objects in public camera streams from Insecam",
        link: "https://github.com/erfangolpour/ArguX",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
        content:
            <div>
                <p>ArguX is a Python script that scans public cameras gathered from Insecam to locate objects of interest via YOLOv4 object detection model. The name is inspired by Greek mythology, where Argus Panoptes (Ἀὁγος Πανόπτης, "All-seeing Argos") is a many-eyed giant capable of seeing everything.</p>

                <h2>Features</h2>
                <ul>
                    <li>Multithreaded for scanning multiple streams simultaneously.</li>
                    <li>Provides the detected camera's IP address, geolocation, and the model's confidence level in identifying the specified object.</li>
                    <li>Filter searches by country.</li>
                    <li>Option to open detected camera streams directly in your web browser.</li>
                </ul>
            </div>

    },
    {
        title: "TaskTree",
        description: "A modern task management app with hierarchical organization, featuring dual List/Graph views. Built with React, TypeScript, and Supabase",
        link: "https://tasktree.vercel.app/",
        thumbnail: TaskTree,
        content:
            <>
                <p>TaskTree is a powerful task management application that helps you organize tasks in hierarchical structures. With its innovative dual-view system and rich feature set, TaskTree provides an intuitive way to manage complex task relationships and workflows.</p>

                <h2>✨ Key Features</h2>
                <h3>📊 Dual View System</h3>
                <ul>
                    <li><b>List View:</b> Traditional, drag-and-drop enabled list interface</li>
                    <li><b>Graph View:</b> Interactive visualization of task relationships</li>
                    <li><b>Real-time Sync:</b> Both views stay synchronized as you make changes</li>
                </ul>

                <h3>📑 Task Organization</h3>
                <ul>
                    <li><b>Hierarchical Structure:</b> Create parent-child relationships between tasks</li>
                    <li><b>Multi-Parent Support:</b> Tasks can have multiple parent tasks</li>
                    <li><b>Drag & Drop:</b> Easily reorganize tasks and their relationships</li>
                    <li><b>Visual Connections:</b> Animated links between related tasks in graph view</li>
                </ul>

                <h3>🎯 Task Management</h3>
                <ul>
                    <li><b>Priority Levels:</b> Color-coded priorities (Low, Medium, High)</li>
                    <li><b>Due Dates:</b> Set and track deadlines for tasks</li>
                    <li><b>Tags:</b> Categorize tasks with custom tags</li>
                    <li><b>Notes:</b> Add detailed descriptions and notes to tasks</li>
                    <li><b>Completion Tracking:</b> Mark tasks as complete and track progress</li>
                </ul>

                <h3>🔍 Advanced Filtering & Search</h3>
                <ul>
                    <li><b>Search:</b> Find tasks by title or description</li>
                    <li><b>Priority Filter:</b> Filter tasks by priority level</li>
                    <li><b>Completion Filter:</b> Show/hide completed tasks</li>
                    <li><b>Smart Sorting:</b> Sort by creation date, priority, due date, or completion status</li>
                </ul>

                <h3>🎨 User Experience</h3>
                <ul>
                    <li><b>Dark/Light Mode:</b> Toggle between themes for comfortable viewing</li>
                    <li><b>Responsive Design:</b> Works seamlessly across different screen sizes</li>
                    <li><b>Real-time Updates:</b> Changes reflect immediately across views</li>
                    <li><b>Intuitive Controls:</b> Easy-to-use interface for managing tasks</li>
                </ul>
            </>
    },

    {
        title: "The Art of Mathematics",
        description: "Influenced by Mr. Evgeny Tuev and developed by Erfan Golpour, this web page aims to demonstrate how mathematical functions naturally occur in art, nature, and industry",
        link: "https://theartofmathematics.github.io/",
        thumbnail: AOM,
        content:
            <>
                <p>The main objective of this project is to demonstrate how mathematical functions naturally appear in art and nature. Before you move on, please take a moment to read the instructions:</p>

                <ul>
                    <li>When you hover the mouse over a function in the preview panel, the corresponding function will be highlighted on the graph to help you easily find a function.</li>
                    <li>Use the white arrows on the main picture to switch between the sets of functions. For now there are 2 sets available.</li>
                    <li>Click on each function to see a more detailed discription about it. You can also gain information about a function by hovering over it.</li>
                    <li>Even though the functions are all precisely calculated, the key points are NOT manually identified. There is a loop which goes through the domain of each function and determines 10 integral points at most (where x and y are both integers). Therefore, it is possible to encounter a function that has no key points.</li>
                </ul>

                <b>Note:</b> Since the website is primirily designed for landscape frames, it is recommended to use a horizontal screen while you are using the website. Otherwise, you might face some disproportions although the contents will remain the same.
            </>
    },
    {
        title: "The Metropolitan Museum of Art",
        description: "A small project to provide a user-friendly interface to interact with The Metroplitan Museum of Art Collection API",
        link: "https://erfangolpour.github.io/The-Metropolitan-Museum-of-Art/",
        thumbnail: MMOA,
        content:
            <>
                <p>The Metropolitan Museum of Art is one of the world's largest and finest art museums. Its collection includes more than two million works of art spanning five thousand years of world culture, from prehistory to the present and from every part of the globe. The Met presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in three iconic sites in New York City—The Met Fifth Avenue, The Met Breuer, and The Met Cloisters. Millions of people also take part in The Met experience online.</p>

                <h2>Features</h2>
                <ul>
                    <li>Search the collection by keyword</li>
                    <li>View detailed information about each artwork</li>
                    <li>Responsive design for mobile and desktop</li>
                </ul>

                Implemented with vanilla JavaScript, HTML, and CSS.
            </>
    },
    {
        title: "GreenSignal",
        description: "A robust and secure chat server with AES and RSA encryption, user authentication, admin controls, and file transfer capabilities",
        link: "https://github.com/erfangolpour/GreenSignal",
        thumbnail: GreenSignal,
        content:
            <>
                <p>GreenSignal is a secure chat server that utilizes AES and RSA encryption protocols to ensure the confidentiality and integrity of communication between clients and the server. The server is designed to be robust, efficient, and user-friendly, providing a seamless experience for users while prioritizing security.</p>

                <h2>Features</h2>
                <ul>
                    <li><b>Secure Communication:</b> GreenSignal employs AES and RSA encryption protocols to encrypt all communication between clients and the server, ensuring that messages are protected from unauthorized access.</li>
                    <li><b>User Authentication:</b> Users are required to authenticate with a valid username before joining the chat server, preventing unauthorized access.</li>
                    <li><b>Admin Controls:</b> The server administrator has control over various functionalities, such as kicking or muting users, broadcasting messages, and closing the server.</li>
                    <li><b>File Transfer:</b> GreenSignal supports secure file transfers between clients, allowing users to share files within the chat environment.</li>
                    <li><b>User Management:</b> The server keeps track of connected users and provides the administrator with the ability to view and manage user connections.</li>
                </ul>
            </>
    },
    {
        title: "KIRAL",
        description: "An efficient tool for aligning reads to 1600+ Killer Immunoglobulin-like Receptor (KIR) allele sequences ",
        link: "https://github.com/erfangolpour/KIRAL",
        thumbnail: KIRAL,
        content:
            <>
                <p>KIRAL is a fast and efficient tool for aligning sequencing reads to a database of over 1600 Killer Immunoglobulin-like Receptor (KIR) allele sequences. Designed for genomic research and immunological studies, KIRAL provides powerful options for aligning reads, selecting alignment methods, and generating detailed reports.</p>

                <h2>Features</h2>
                <ul>
                    <li><b>Multiple Alignment Methods:</b> Choose between naive, regional, and categorical alignment strategies to suit your analysis.</li>
                    <li><b>High Customizability:</b> Adjust parameters such as the number of representative alleles, error tolerance, and paired-read alignment for maximum flexibility.</li>
                    <li><b>Threading Support:</b> Take full advantage of multi-core systems with configurable threading for faster processing.</li>
                    <li><b>Comprehensive Reporting:</b> Generate detailed reports filtered by read, KIR, or allele identifiers.</li>
                </ul>
            </>
    },
    {
        title: "mineTUIper",
        description: "Terminal-based Minesweeper game with keyboard controls, complete with an analyzer for generating and solving Minesweeper boards",
        link: "https://github.com/erfangolpour/mineTUIper",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
        content:
            <>
                <p>mineTUIper is a terminal-based Minesweeper game that can be played using keyboard controls. It also includes an analyzer for solving and analyzing Minesweeper boards. The game is implemented in Python using the rich library for the terminal interface.</p>

                <h2>Features</h2>
                <ul>
                    <li><b>Game:</b> Play Minesweeper in the terminal with keyboard controls.</li>
                    <li><b>Solver:</b> Automatically solve Minesweeper boards using logical deductions.</li>
                    <li><b>Analyzer:</b> Analyze Minesweeper boards to generate deterministic boards.</li>
                </ul>
            </>
    },
    {
        title: "Simple Shell Interpreter (SSI)",
        description: "A simple shell interpreter ",
        link: "https://github.com/erfangolpour/SSI",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
        content:
            <>
                <p>The Simple Shell Interpreter (SSI) is a basic command-line interface that simulates a Unix shell. It provides a prompt, accepts user commands, and executes them. Additionally, it supports background processes, allowing users to run multiple commands concurrently.</p>

                <h2>Features</h2>
                <ul>
                    <li>Interactive command prompt</li>
                    <li>Support for built-in commands:
                        <ul>
                            <li><b>cd:</b> change directory</li>
                            <li><b>exit:</b> exit the shell</li>
                            <li><b>bg:</b> run a command in the background</li>
                            <li><b>bglist:</b> list all background processes</li>
                            <li><b>bgpause:</b> pause a background process by PID</li>
                            <li><b>bgresume:</b> resume a paused background process by PID</li>
                            <li><b>bgkill:</b> kill a background process by PID</li>
                            <li><b>history:</b> display command history</li>
                        </ul>
                    </li>
                    <li>Signal handling for Ctrl+C (SIGINT) and child processes (SIGCHLD)</li>
                    <li>Colored prompt with username, hostname, and current working directory</li>
                    <li>Command history and line editing using the GNU Readline library</li>
                </ul>
            </>
    },
    {
        title: "SmartClient",
        description: "A Python script to analyze web servers by sending HTTP/HTTPS requests and inspecting responses",
        link: "https://github.com/erfangolpour/SmartClient",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
        content:
            <>
                <p>SmartClient is a Python script that retrieves information about a web server given a URL. It can follow redirects, parse cookies, check for HTTP/2 support, and detect if the server is password-protected.</p>

                <h2>Features</h2>
                <ul>
                    <li>Follow redirects with a configurable maximum number of redirects</li>
                    <li>Parse and display cookies from the server's response</li>
                    <li>Check if the server supports HTTP/2 (using ALPN and HTTP/2 upgrade)</li>
                    <li>Detect if the server's response is password-protected</li>
                    <li>Print the final response header and visited URLs</li>
                </ul>
            </>
    },
    {
        title: "Renderwork Studio",
        description: "Renderwork Studio is a tool that helps you create and manage 3D models.",
        link: "https://renderwork.studio",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
        content: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime obcaecati velit animi asperiores repudiandae esse, aperiam laboriosam facilis nemo id voluptatibus, maiores reprehenderit quia quo iusto minus mollitia vel, labore laudantium a dolor quae quibusdam quas. Fugit animi sequi ad minus quod inventore iste voluptates magni soluta ut consectetur, dolores, deserunt aspernatur blanditiis, quasi veritatis. Qui dolor adipisci minima soluta? Exercitationem dolor architecto cumque ipsum, animi accusantium saepe a quas, inventore quis obcaecati facere accusamus labore. Reiciendis, facilis. Voluptatum, error? Eos iure, dolorum atque velit vel tenetur earum! Laudantium doloribus quibusdam animi ad ipsam deleniti, corrupti, quaerat quis facere aspernatur fugiat aliquam suscipit veritatis voluptas! Unde quis eaque rem ad est. Sit placeat quia velit aliquam accusantium. Quo obcaecati excepturi reprehenderit quis adipisci repellat fugiat dolore ullam, odio, illo ipsum quam ipsa placeat accusantium rem quisquam saepe temporibus commodi sed blanditiis eaque! Consequatur distinctio veniam blanditiis pariatur, sunt itaque minima?</p>
    },
    {
        title: "Creme Digital",
        description: "Creme Digital is a tool that helps you create and manage digital content.",
        link: "https://cremedigital.com",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
        content: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime obcaecati velit animi asperiores repudiandae esse, aperiam laboriosam facilis nemo id voluptatibus, maiores reprehenderit quia quo iusto minus mollitia vel, labore laudantium a dolor quae quibusdam quas. Fugit animi sequi ad minus quod inventore iste voluptates magni soluta ut consectetur, dolores, deserunt aspernatur blanditiis, quasi veritatis. Qui dolor adipisci minima soluta? Exercitationem dolor architecto cumque ipsum, animi accusantium saepe a quas, inventore quis obcaecati facere accusamus labore. Reiciendis, facilis. Voluptatum, error? Eos iure, dolorum atque velit vel tenetur earum! Laudantium doloribus quibusdam animi ad ipsam deleniti, corrupti, quaerat quis facere aspernatur fugiat aliquam suscipit veritatis voluptas! Unde quis eaque rem ad est. Sit placeat quia velit aliquam accusantium. Quo obcaecati excepturi reprehenderit quis adipisci repellat fugiat dolore ullam, odio, illo ipsum quam ipsa placeat accusantium rem quisquam saepe temporibus commodi sed blanditiis eaque! Consequatur distinctio veniam blanditiis pariatur, sunt itaque minima?</p>
    },
    {
        title: "frefer Digital",
        description: "Creme Digital is a tool that helps you create and manage digital content.",
        link: "https://cremedigital.com",
        thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
        content: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime obcaecati velit animi asperiores repudiandae esse, aperiam laboriosam facilis nemo id voluptatibus, maiores reprehenderit quia quo iusto minus mollitia vel, labore laudantium a dolor quae quibusdam quas. Fugit animi sequi ad minus quod inventore iste voluptates magni soluta ut consectetur, dolores, deserunt aspernatur blanditiis, quasi veritatis. Qui dolor adipisci minima soluta? Exercitationem dolor architecto cumque ipsum, animi accusantium saepe a quas, inventore quis obcaecati facere accusamus labore. Reiciendis, facilis. Voluptatum, error? Eos iure, dolorum atque velit vel tenetur earum! Laudantium doloribus quibusdam animi ad ipsam deleniti, corrupti, quaerat quis facere aspernatur fugiat aliquam suscipit veritatis voluptas! Unde quis eaque rem ad est. Sit placeat quia velit aliquam accusantium. Quo obcaecati excepturi reprehenderit quis adipisci repellat fugiat dolore ullam, odio, illo ipsum quam ipsa placeat accusantium rem quisquam saepe temporibus commodi sed blanditiis eaque! Consequatur distinctio veniam blanditiis pariatur, sunt itaque minima?</p>
    },
];