/**
 * Infinite App - State Management
 * Handles all application state and data
 */

class AppState {
    constructor() {
        // View state
        this.currentView = 'home';
        this.currentWorkspace = null;
        this.currentPage = null;
        this.sidebarCollapsed = false;
        this.darkMode = false;

        // Data
        this.workspaces = [];
        this.trash = [];
        this.notifications = [];
        this.activity = [];

        // Profile
        this.profile = {
            name: 'Mirek',
            initials: 'M',
            avatar: ''
        };

        this.load();
    }

    /**
     * Generate unique ID
     */
    uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    }

    /**
     * Save state to localStorage
     */
    save() {
        try {
            const data = {
                workspaces: this.workspaces,
                trash: this.trash,
                notifications: this.notifications,
                activity: this.activity,
                profile: this.profile,
                darkMode: this.darkMode
            };
            localStorage.setItem('infinite_data', JSON.stringify(data));
        } catch (e) {
            console.error('Save error:', e);
        }
    }

    /**
     * Load state from localStorage
     */
    load() {
        try {
            const data = JSON.parse(localStorage.getItem('infinite_data'));
            if (data) {
                this.workspaces = data.workspaces || [];
                this.trash = data.trash || [];
                this.notifications = data.notifications || [];
                this.activity = data.activity || [];
                this.profile = data.profile || this.profile;
                this.darkMode = data.darkMode || false;
            }
        } catch (e) {
            console.error('Load error:', e);
        }
    }

    /**
     * Get workspace by ID
     */
    getWorkspace(id) {
        return this.workspaces.find(w => w.id === id);
    }

    /**
     * Get page by workspace and page ID
     */
    getPage(wsId, pageId) {
        const ws = this.getWorkspace(wsId);
        return ws ? ws.pages.find(p => p.id === pageId) : null;
    }

    /**
     * Get all pages across workspaces
     */
    getAllPages() {
        const pages = [];
        this.workspaces.forEach(ws => {
            ws.pages.forEach(p => {
                pages.push({
                    ...p,
                    workspaceId: ws.id,
                    workspaceName: ws.name,
                    workspaceEmoji: ws.emoji
                });
            });
        });
        return pages;
    }

    /**
     * GetFILE 9: `js/board.js`** (Kanban Board)

```javascript
/**
 * Infinite App - Kanban Board
 */

const Board = {
    /**
     * Initialize sortable board
     */
    initSortable(page) {
        if (!page.board) return;
        document.querySelectorAll('.card-list').forEach(el => {
            new Sortable(el, {
                group: 'cards',
                animation: 200,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                onEnd: (evt) => {
                    const board = page.board;
                    const fromList = board.lists.find(l => l.id === evt.from.dataset.listId);
                    const toList = board.lists.find(l => l.id === evt.to.dataset.listId);
                    if (fromList && toList) {
                        const card = fromList.cards.splice(evt.oldIndex, 1)[0];
                        toList.cards.splice(evt.newIndex, 0, card);
                        page.updatedAt = Date.now();
                        state.save();
                        state.addActivity(`Moved card "${card.title}"`, 'fa-arrows-alt');
                    }
                }
            });
        });
    },

    /**
     * Add list to board
     */
    addList(wsId, pgId) {
        const page = state.getPage(wsId, pgId);
        if (!page || !page.board) return;
        const title = prompt('List name:');
        if (!title) return;
        page.board.lists.push({
            id: state.uid(),
            title,
            cards: [],
            wipLimit: 0
        });
        page.updatedAt = Date.now();
        state.save();
        state.addActivity(`Added list "${title}"`, 'fa-columns');
        window.render && window.render();
    },

    /**
     * Add card to list
     */
    addCard(wsId, pgId, listId) {
        const page = state.getPage(wsId, pgId);
        if (!page || !page.board) return;
        const list = page.board.lists.find(l => l.id === listId);
        if (!list) return;
        const title = prompt('Card title:');
        if (!title) return;
        list.cards.push({
            id: state.uid(),
            title,
            description: '',
            labels: [],
            priority: 'none',
            due: '',
            checklist: [],
            comments: [],
            assignee: '',
            cover: '',
            activity: [{ text: 'Card created', time: Date.now() }]
        });
        page.updatedAt = Date.now();
        state.save();
        state.addActivity(`Added card "${title}"`, 'fa-plus');
        window.render && window.render();
    },

    /**
     * Update card field
     */
    updateCardField(wsId, pgId, listId, cardId, field, value) {
        const page = state.getPage(wsId, pgId);
        const list = page?.board?.lists?.find(l => l.id === listId);
        const card = list?.cards?.find(c => c.id === cardId);
        if (card) {
            card[field] = value;
            if (!card.activity) card.activity = [];
            card.activity.unshift({ text: `Updated ${field}`, time: Date.now() });
            page.updatedAt = Date.now();
            state.save();
        }
    },

    /**
     * Delete card
     */
    deleteCard(wsId, pgId, listId, cardId) {
        const page = state.getPage(wsId, pgId);
        const list = page?.board?.lists?.find(l => l.id === listId);
        if (list) {
            list.cards = list.cards.filter(c => c.id !== cardId);
            state.save();
            window.render && window.render();
        }
    }
};

window.Board = Board;
