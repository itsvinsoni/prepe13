// Prepe LMS - Main Application JavaScript
// Core functionality for the Learning Management System

class PrepeLMS {
    constructor() {
        this.currentPage = 'home';
        this.navigationHistory = [];
        this.examData = null;
        this.user = null;
        this.searchIndex = {};
        this.init();
    }

    // Initialize the application
    init() {
        this.loadExamData();
        this.setupEventListeners();
        this.setupSecurity();
        this.initializeTheme();
        this.hideLoadingScreen();
        console.log('🎓 Prepe LMS initialized successfully');
    }

    // Load exam data structure
    loadExamData() {
        this.examData = {
            ssc: {
                title: 'Staff Selection Commission',
                description: 'Complete preparation for all SSC exams',
                icon: '🏛️',
                exams: {
                    cgl: { title: 'Combined Graduate Level', description: 'Tier 1, Tier 2 & Interview preparation', icon: '🎯', popular: true },
                    chsl: { title: 'Combined Higher Secondary Level', description: 'DEO, LDC, PA/SA preparation', icon: '📚', popular: true },
                    mts: { title: 'Multi Tasking Staff', description: 'Paper I & Paper II preparation', icon: '⚡', popular: false },
                    gd: { title: 'General Duty', description: 'Constable recruitment preparation', icon: '👮', popular: false },
                    stenographer: { title: 'Stenographer', description: 'Grade C & D preparation', icon: '⌨️', popular: false }
                }
            },
            railway: {
                title: 'Railway Recruitment',
                description: 'Complete preparation for Railway jobs',
                icon: '🚂',
                exams: {
                    ntpc: { title: 'Non-Technical Popular Categories', description: 'Graduate level railway posts', icon: '🎓', popular: true },
                    'group-d': { title: 'Group D', description: 'Level 1 railway posts', icon: '🔧', popular: true },
                    'alp-technician': { title: 'ALP & Technician', description: 'Technical posts preparation', icon: '⚙️', popular: false }
                }
            },
            banking: {
                title: 'Banking & Finance',
                description: 'Complete banking exam preparation',
                icon: '🏦',
                exams: {
                    'ibps-po': { title: 'IBPS PO', description: 'Probationary Officer', icon: '💼', popular: true },
                    'ibps-clerk': { title: 'IBPS Clerk', description: 'Banking Clerk positions', icon: '📊', popular: true },
                    'sbi-po': { title: 'SBI PO', description: 'State Bank PO', icon: '🏛️', popular: true },
                    'sbi-clerk': { title: 'SBI Clerk', description: 'State Bank Clerk', icon: '📝', popular: false },
                    'ibps-rrb': { title: 'IBPS RRB', description: 'Regional Rural Bank', icon: '🌾', popular: false },
                    'lic-aao-ado': { title: 'LIC AAO/ADO', description: 'Life Insurance Corporation', icon: '🛡️', popular: false }
                }
            },
            defence: {
                title: 'Defence Services',
                description: 'Complete defence exam preparation',
                icon: '🛡️',
                exams: {
                    nda: { title: 'National Defence Academy', description: 'Army, Navy, Air Force', icon: '⚔️', popular: true },
                    cds: { title: 'Combined Defence Services', description: 'Officer level posts', icon: '🎖️', popular: false },
                    capf: { title: 'Central Armed Police Forces', description: 'CRPF, BSF, CISF, ITBP, SSB', icon: '👮‍♂️', popular: false }
                }
            },
            medical: {
                title: 'Medical Entrance',
                description: 'Medical college admission preparation',
                icon: '🏥',
                exams: {
                    'neet-ug': { title: 'NEET UG', description: 'Undergraduate medical entrance', icon: '⚕️', popular: true }
                }
            },
            engineering: {
                title: 'Engineering Entrance',
                description: 'Engineering college admission preparation',
                icon: '⚙️',
                exams: {
                    'jee-main': { title: 'JEE Main', description: 'Engineering entrance exam', icon: '🔬', popular: true }
                }
            },
            teaching: {
                title: 'Teaching Jobs',
                description: 'Teaching profession preparation',
                icon: '👨‍🏫',
                exams: {
                    ctet: { title: 'Central Teacher Eligibility Test', description: 'Teaching eligibility exam', icon: '📚', popular: true }
                }
            },
            board: {
                title: 'Board Exams',
                description: 'School board examination preparation',
                icon: '🎒',
                exams: {
                    'cbse-10th': { title: 'CBSE Class 10', description: 'Board exam preparation', icon: '📖', popular: true }
                }
            }
        };

        // Build search index
        this.buildSearchIndex();
        console.log('📊 Exam data loaded successfully');
    }

    // Build search index for global search
    buildSearchIndex() {
        for (const [categoryId, category] of Object.entries(this.examData)) {
            for (const [examId, exam] of Object.entries(category.exams)) {
                const key = `${categoryId}-${examId}`;
                this.searchIndex[key] = {
                    category: category.title,
                    exam: exam.title,
                    description: exam.description,
                    path: `category/${categoryId}/exam/${examId}`
                };
            }
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('home-btn')?.addEventListener('click', () => this.showPage('home'));
        document.getElementById('back-btn')?.addEventListener('click', () => this.goBack());
        document.getElementById('forward-btn')?.addEventListener('click', () => this.goForward());

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggleTheme());

        // User menu
        document.getElementById('user-menu-btn')?.addEventListener('click', () => this.toggleUserMenu());
        document.getElementById('login-btn')?.addEventListener('click', () => this.showLoginModal());
        document.getElementById('signup-btn')?.addEventListener('click', () => this.showSignupModal());

        // Search
        document.getElementById('global-search')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('search-btn')?.addEventListener('click', () => this.performSearch());

        // Modal controls
        this.setupModalControls();

        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form')?.addEventListener('submit', (e) => this.handleSignup(e));

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        console.log('🎯 Event listeners setup complete');
    }

    // Setup modal controls
    setupModalControls() {
        // Login modal
        document.getElementById('login-close')?.addEventListener('click', () => this.hideModal('login-modal'));
        document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('login-modal');
            this.showSignupModal();
        });

        // Signup modal
        document.getElementById('signup-close')?.addEventListener('click', () => this.hideModal('signup-modal'));
        document.getElementById('switch-to-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('signup-modal');
            this.showLoginModal();
        });

        // Purchase modal
        document.getElementById('purchase-close')?.addEventListener('click', () => this.hideModal('purchase-modal'));
        document.getElementById('proceed-payment')?.addEventListener('click', () => this.processPayment());

        // Close modals when clicking overlay
        document.querySelectorAll('.modal').forEach(modal => {
            modal.querySelector('.modal-overlay')?.addEventListener('click', () => {
                this.hideModal(modal.id);
            });
        });
    }

    // Security setup
    setupSecurity() {
        // Disable right-click
        if (window.appConfig?.get('security.enableRightClickDisable')) {
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showToast('Right-click is disabled for security', 'warning');
            });
        }

        // Disable developer tools
        if (window.appConfig?.get('security.enableDevToolsBlock')) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                    e.preventDefault();
                    this.showToast('Developer tools are disabled', 'warning');
                }
            });
        }

        // Device fingerprinting
        this.generateDeviceFingerprint();

        console.log('🔒 Security measures activated');
    }

    // Generate device fingerprint
    generateDeviceFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Device fingerprint', 2, 2);

        const fingerprint = {
            canvas: canvas.toDataURL(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: Date.now()
        };

        localStorage.setItem('prepe-device-id', btoa(JSON.stringify(fingerprint)));
        console.log('🔐 Device fingerprint generated');
    }

    // Initialize theme
    initializeTheme() {
        const savedTheme = localStorage.getItem('prepe-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    // Toggle theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('prepe-theme', newTheme);
        this.updateThemeIcon(newTheme);
        this.showToast(`Switched to ${newTheme} theme`, 'success');
    }

    // Update theme icon
    updateThemeIcon(theme) {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Hide loading screen
    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loading-screen')?.classList.add('hidden');
        }, 1500);
    }

    // Show page
    showPage(pageId, updateHistory = true) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageId}-page`)?.classList.add('active');

        if (updateHistory && pageId !== this.currentPage) {
            this.navigationHistory.push(this.currentPage);
        }

        this.currentPage = pageId;
        this.updateBreadcrumb();
        this.updateNavButtons();

        // Load page content
        switch (pageId) {
            case 'home':
                this.loadHomePage();
                break;
            case 'category':
                this.loadCategoryPage();
                break;
        }

        console.log(`📄 Navigated to ${pageId} page`);
    }

    // Load home page
    loadHomePage() {
        const categoriesGrid = document.getElementById('categories-grid');
        if (!categoriesGrid) return;

        categoriesGrid.innerHTML = '';

        Object.entries(this.examData).forEach(([categoryId, category]) => {
            const examCount = Object.keys(category.exams).length;
            const popularExams = Object.values(category.exams).filter(exam => exam.popular).length;

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <span class="card-icon">${category.icon}</span>
                <h3 class="card-title">${category.title}</h3>
                <p class="card-description">${category.description}</p>
                <div class="card-footer">
                    <span class="card-price">${examCount} Exams</span>
                    ${popularExams > 0 ? '<span class="card-badge">Popular</span>' : ''}
                </div>
            `;

            card.addEventListener('click', () => this.navigateToCategory(categoryId));
            categoriesGrid.appendChild(card);
        });
    }

    // Navigate to category
    navigateToCategory(categoryId) {
        this.currentCategory = categoryId;
        this.showPage('category');
        this.loadCategoryPage();
    }

    // Load category page
    loadCategoryPage() {
        if (!this.currentCategory) return;

        const category = this.examData[this.currentCategory];
        const titleEl = document.getElementById('category-title');
        const descEl = document.getElementById('category-description');
        const examsGrid = document.getElementById('exams-grid');

        if (titleEl) titleEl.textContent = category.title;
        if (descEl) descEl.textContent = 'Choose your specific exam';

        if (examsGrid) {
            examsGrid.innerHTML = '';

            Object.entries(category.exams).forEach(([examId, exam]) => {
                const pricing = window.coursePricing?.getCoursePrice(`${this.currentCategory}-${examId}`);

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <span class="card-icon">${exam.icon}</span>
                    <h3 class="card-title">${exam.title}</h3>
                    <p class="card-description">${exam.description}</p>
                    <div class="card-footer">
                        <span class="card-price">₹${pricing?.price || 999}</span>
                        ${exam.popular ? '<span class="card-badge">Popular</span>' : ''}
                    </div>
                `;

                card.addEventListener('click', () => this.navigateToExam(examId));
                examsGrid.appendChild(card);
            });
        }
    }

    // Navigate to exam
    navigateToExam(examId) {
        this.currentExam = examId;
        this.showPage('exam');
        this.loadExamPage();
    }

    // Load exam page
    loadExamPage() {
        if (!this.currentExam) return;

        const exam = this.examData[this.currentCategory].exams[this.currentExam];
        const titleEl = document.getElementById('exam-title');
        const descEl = document.getElementById('exam-description');
        const subjectsGrid = document.getElementById('subjects-grid');

        if (titleEl) titleEl.textContent = `${exam.title} - Subjects`;
        if (descEl) descEl.textContent = 'Choose your subject to study';

        // Mock subjects data - in real app, this would come from a database
        const subjects = this.getMockSubjects();

        if (subjectsGrid) {
            subjectsGrid.innerHTML = '';

            subjects.forEach((subject, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <span class="card-icon">${subject.icon}</span>
                    <h3 class="card-title">${subject.title}</h3>
                    <p class="card-description">${subject.description}</p>
                    <div class="card-footer">
                        <span class="card-price">${subject.chapters} Chapters</span>
                    </div>
                `;

                card.addEventListener('click', () => this.navigateToSubject(subject.id));
                subjectsGrid.appendChild(card);
            });
        }
    }

    // Get mock subjects data
    getMockSubjects() {
        return [
            { id: 'quantitative-aptitude', title: 'Quantitative Aptitude', description: 'Mathematics and numerical ability', icon: '🔢', chapters: 15 },
            { id: 'reasoning', title: 'General Intelligence & Reasoning', description: 'Logical and analytical reasoning', icon: '🧠', chapters: 12 },
            { id: 'english', title: 'English Language', description: 'Grammar, vocabulary, and comprehension', icon: '📝', chapters: 10 },
            { id: 'general-knowledge', title: 'General Knowledge', description: 'Current affairs and general awareness', icon: '🌍', chapters: 15 }
        ];
    }

    // Navigate to subject
    navigateToSubject(subjectId) {
        this.currentSubject = subjectId;
        this.showPage('subject');
        this.loadSubjectPage();
    }

    // Load subject page
    loadSubjectPage() {
        if (!this.currentSubject) return;

        const titleEl = document.getElementById('subject-title');
        const descEl = document.getElementById('subject-description');
        const chaptersGrid = document.getElementById('chapters-grid');

        if (titleEl) titleEl.textContent = `${this.currentSubject.replace('-', ' ').toUpperCase()} - Chapters`;
        if (descEl) descEl.textContent = 'Choose your chapter to study';

        // Mock chapters data
        const chapters = this.getMockChapters();

        if (chaptersGrid) {
            chaptersGrid.innerHTML = '';

            chapters.forEach((chapter, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <span class="card-icon">${chapter.icon}</span>
                    <h3 class="card-title">${chapter.title}</h3>
                    <p class="card-description">${chapter.description}</p>
                    <div class="card-footer">
                        <span class="card-price">5 Content Types</span>
                        ${index < 2 ? '<span class="card-badge">Free</span>' : '<span class="card-badge">Premium</span>'}
                    </div>
                `;

                card.addEventListener('click', () => {
                    if (index >= 2 && !this.user) {
                        this.showPurchaseModal();
                    } else {
                        this.navigateToChapter(chapter.id);
                    }
                });
                chaptersGrid.appendChild(card);
            });
        }
    }

    // Get mock chapters data
    getMockChapters() {
        const subjects = {
            'quantitative-aptitude': [
                { id: 'number-system', title: 'Number System', description: 'Basics of numbers, divisibility rules', icon: '🔢' },
                { id: 'percentage', title: 'Percentage', description: 'Percentage calculations and applications', icon: '📊' },
                { id: 'ratio-proportion', title: 'Ratio & Proportion', description: 'Ratios, proportions, and partnerships', icon: '⚖️' },
                { id: 'profit-loss', title: 'Profit & Loss', description: 'Business mathematics and profit calculations', icon: '💰' },
                { id: 'time-work', title: 'Time & Work', description: 'Work efficiency and time calculations', icon: '⏰' }
            ],
            'reasoning': [
                { id: 'verbal-reasoning', title: 'Verbal Reasoning', description: 'Word-based logical problems', icon: '💭' },
                { id: 'non-verbal-reasoning', title: 'Non-Verbal Reasoning', description: 'Image and pattern recognition', icon: '🔍' },
                { id: 'logical-reasoning', title: 'Logical Reasoning', description: 'Logic puzzles and deductions', icon: '🧩' },
                { id: 'analytical-reasoning', title: 'Analytical Reasoning', description: 'Data analysis and interpretation', icon: '📈' },
                { id: 'coding-decoding', title: 'Coding-Decoding', description: 'Pattern recognition in codes', icon: '🔐' }
            ],
            'english': [
                { id: 'grammar', title: 'Grammar', description: 'English grammar rules and usage', icon: '📚' },
                { id: 'vocabulary', title: 'Vocabulary', description: 'Word meanings and usage', icon: '📖' },
                { id: 'comprehension', title: 'Reading Comprehension', description: 'Passage reading and understanding', icon: '👁️' },
                { id: 'synonyms-antonyms', title: 'Synonyms & Antonyms', description: 'Word relationships', icon: '🔄' },
                { id: 'sentence-correction', title: 'Sentence Correction', description: 'Identifying and correcting errors', icon: '✏️' }
            ],
            'general-knowledge': [
                { id: 'indian-history', title: 'Indian History', description: 'Ancient, medieval, and modern history', icon: '🏛️' },
                { id: 'indian-geography', title: 'Indian Geography', description: 'Physical and political geography', icon: '🗺️' },
                { id: 'indian-polity', title: 'Indian Polity', description: 'Constitution and governance', icon: '⚖️' },
                { id: 'current-affairs', title: 'Current Affairs', description: 'Latest news and events', icon: '📰' },
                { id: 'science-technology', title: 'Science & Technology', description: 'Scientific developments', icon: '🔬' }
            ]
        };

        return subjects[this.currentSubject] || [];
    }

    // Navigate to chapter
    navigateToChapter(chapterId) {
        this.currentChapter = chapterId;
        this.showPage('chapter');
        this.loadChapterPage();
    }

    // Load chapter page
    loadChapterPage() {
        if (!this.currentChapter) return;

        const titleEl = document.getElementById('chapter-title');
        const descEl = document.getElementById('chapter-description');
        const contentTypesGrid = document.getElementById('content-types-grid');

        if (titleEl) titleEl.textContent = `${this.currentChapter.replace('-', ' ').toUpperCase()} - Content`;
        if (descEl) descEl.textContent = 'Choose your content type';

        const contentTypes = [
            { id: 'handwritten-notes', title: 'Handwritten Notes', description: 'PDF notes in handwritten format', icon: '✍️', file: 'handwritten-notes.html' },
            { id: 'short-notes', title: 'Short Notes', description: 'Comprehensive study material', icon: '📝', file: 'short-notes.html' },
            { id: 'one-page-notes', title: 'One Page Notes', description: 'Quick revision summary', icon: '📄', file: 'one-page-notes.html' },
            { id: 'mindmaps', title: 'Mind Maps', description: 'Visual learning diagrams', icon: '🧠', file: 'mindmaps.html' },
            { id: 'quiz', title: 'Practice Quiz', description: 'Interactive practice questions', icon: '❓', file: 'quiz.html' }
        ];

        if (contentTypesGrid) {
            contentTypesGrid.innerHTML = '';

            contentTypes.forEach(contentType => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <span class="card-icon">${contentType.icon}</span>
                    <h3 class="card-title">${contentType.title}</h3>
                    <p class="card-description">${contentType.description}</p>
                `;

                card.addEventListener('click', () => this.loadContent(contentType.file));
                contentTypesGrid.appendChild(card);
            });
        }
    }

    // Load content
    loadContent(filename) {
        this.showPage('content');
        const iframe = document.getElementById('content-iframe');
        const placeholder = document.getElementById('content-placeholder');

        // Build content path
        const contentPath = `content/${this.currentCategory}/${this.currentExam}/${this.currentSubject}/${this.currentChapter}/${filename}`;

        if (iframe) {
            iframe.src = contentPath;
            iframe.style.display = 'block';
        }

        if (placeholder) {
            placeholder.style.display = 'none';
        }

        // Handle iframe load error
        if (iframe) {
            iframe.onerror = () => {
                iframe.style.display = 'none';
                if (placeholder) placeholder.style.display = 'flex';
            };
        }

        document.getElementById('content-title').textContent = `${this.currentChapter.replace('-', ' ')} - ${filename.replace('.html', '').replace('-', ' ')}`;
    }

    // Navigation history management
    goBack() {
        if (this.navigationHistory.length > 0) {
            const previousPage = this.navigationHistory.pop();
            this.showPage(previousPage, false);
        }
    }

    goForward() {
        // Implementation for forward navigation
    }

    // Update breadcrumb
    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        const breadcrumbContainer = document.getElementById('breadcrumb-container');

        if (!breadcrumb || !breadcrumbContainer) return;

        const crumbs = [];

        if (this.currentPage === 'home') {
            breadcrumbContainer.style.display = 'none';
            return;
        }

        crumbs.push('<a href="#" onclick="prepeLMS.showPage('home')">🏠 Home</a>');

        if (this.currentCategory) {
            crumbs.push(`<span class="breadcrumb-separator">></span>`);
            crumbs.push(`<a href="#" onclick="prepeLMS.navigateToCategory('${this.currentCategory}')">${this.examData[this.currentCategory]?.title}</a>`);
        }

        if (this.currentExam) {
            crumbs.push(`<span class="breadcrumb-separator">></span>`);
            crumbs.push(`<a href="#" onclick="prepeLMS.navigateToExam('${this.currentExam}')">${this.examData[this.currentCategory]?.exams[this.currentExam]?.title}</a>`);
        }

        if (this.currentSubject) {
            crumbs.push(`<span class="breadcrumb-separator">></span>`);
            crumbs.push(`<a href="#" onclick="prepeLMS.navigateToSubject('${this.currentSubject}')">${this.currentSubject.replace('-', ' ')}</a>`);
        }

        if (this.currentChapter) {
            crumbs.push(`<span class="breadcrumb-separator">></span>`);
            crumbs.push(`<span>${this.currentChapter.replace('-', ' ')}</span>`);
        }

        breadcrumb.innerHTML = crumbs.join(' ');
        breadcrumbContainer.style.display = 'block';
    }

    // Update navigation buttons
    updateNavButtons() {
        const backBtn = document.getElementById('back-btn');
        const forwardBtn = document.getElementById('forward-btn');

        if (backBtn) {
            backBtn.disabled = this.navigationHistory.length === 0;
        }

        if (forwardBtn) {
            forwardBtn.disabled = true; // Simplified for now
        }
    }

    // Handle search
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = this.searchContent(query);
        this.displaySearchResults(results);
    }

    // Search content
    searchContent(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        Object.entries(this.searchIndex).forEach(([key, item]) => {
            if (item.exam.toLowerCase().includes(lowerQuery) || 
                item.category.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)) {
                results.push(item);
            }
        });

        return results.slice(0, 10); // Limit results
    }

    // Display search results
    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        searchResults.innerHTML = '';

        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'search-result';
            div.innerHTML = `
                <strong>${result.exam}</strong>
                <br>
                <small>${result.category} - ${result.description}</small>
            `;
            div.addEventListener('click', () => {
                // Navigate to result
                this.hideSearchResults();
                document.getElementById('global-search').value = '';
            });
            searchResults.appendChild(div);
        });

        searchResults.classList.remove('hidden');
    }

    // Hide search results
    hideSearchResults() {
        document.getElementById('search-results')?.classList.add('hidden');
    }

    // User menu toggle
    toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    // Handle outside clicks
    handleOutsideClick(e) {
        // Close user dropdown
        const userDropdown = document.getElementById('user-dropdown');
        const userMenuBtn = document.getElementById('user-menu-btn');

        if (userDropdown && !userDropdown.contains(e.target) && e.target !== userMenuBtn) {
            userDropdown.classList.add('hidden');
        }

        // Close search results
        const searchResults = document.getElementById('search-results');
        const searchContainer = document.querySelector('.search-container');

        if (searchResults && !searchContainer?.contains(e.target)) {
            this.hideSearchResults();
        }
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl+/ for search focus
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            document.getElementById('global-search')?.focus();
        }

        // Escape to close modals and dropdowns
        if (e.key === 'Escape') {
            this.hideAllModals();
            this.hideSearchResults();
            document.getElementById('user-dropdown')?.classList.add('hidden');
        }
    }

    // Authentication methods
    showLoginModal() {
        this.showModal('login-modal');
    }

    showSignupModal() {
        this.showModal('signup-modal');
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;

        // Mock authentication
        this.showToast('Login functionality will be implemented with Firebase', 'info');
        this.hideModal('login-modal');
    }

    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name')?.value;
        const email = document.getElementById('signup-email')?.value;
        const password = document.getElementById('signup-password')?.value;

        // Mock authentication
        this.showToast('Signup functionality will be implemented with Firebase', 'info');
        this.hideModal('signup-modal');
    }

    // Purchase methods
    showPurchaseModal() {
        this.showModal('purchase-modal');
        this.loadPurchaseDetails();
    }

    loadPurchaseDetails() {
        const courseId = `${this.currentCategory}-${this.currentExam}`;
        const pricing = window.coursePricing?.getCoursePrice(courseId);

        const purchaseDetails = document.getElementById('purchase-details');
        if (purchaseDetails && pricing) {
            purchaseDetails.innerHTML = `
                <h4>Course Details</h4>
                <p><strong>Course:</strong> ${this.examData[this.currentCategory]?.exams[this.currentExam]?.title}</p>
                <p><strong>Price:</strong> <span style="text-decoration: line-through;">₹${pricing.originalPrice}</span> <strong>₹${pricing.price}</strong></p>
                <p><strong>You Save:</strong> ₹${pricing.originalPrice - pricing.price} (${pricing.discount}% off)</p>
                <div style="margin-top: 10px;">
                    <h5>Features Included:</h5>
                    <ul>
                        ${pricing.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }

    processPayment() {
        if (!window.cashfreePayment) {
            this.showToast('Payment system not configured', 'error');
            return;
        }

        const courseId = `${this.currentCategory}-${this.currentExam}`;
        const pricing = window.coursePricing?.getCoursePrice(courseId);

        const paymentData = {
            amount: pricing.price,
            customerName: 'Guest User',
            customerEmail: 'guest@prepe.com'
        };

        window.cashfreePayment.initPayment(paymentData)
            .then(response => {
                if (response.success) {
                    this.showToast('Payment successful! Welcome to Prepe Premium', 'success');
                    this.hideModal('purchase-modal');
                    this.user = { premium: true }; // Mock user state
                } else {
                    this.showToast('Payment failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                this.showToast('Payment error: ' + error.message, 'error');
            });
    }

    // Modal utilities
    showModal(modalId) {
        document.getElementById(modalId)?.classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
    }

    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Toast notifications
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${this.getToastIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }
}

// Initialize the LMS when DOM is loaded
let prepeLMS;

document.addEventListener('DOMContentLoaded', () => {
    prepeLMS = new PrepeLMS();
});

// Make prepeLMS globally available
window.prepeLMS = prepeLMS;

console.log('🚀 Prepe LMS script loaded successfully');