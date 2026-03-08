/**
 * Infinite App - Modal Dialogs
 */

const Modals = {
    /**
     * Show create workspace modal
     */
    showCreateWorkspace() {
        const overlay = document.getElementById('modalOverlay');
        const content = document.getElementById('modalContent');
        
        let selectedEmoji = '📄';
        let selectedColor = '#6264A7';

        content.innerHTML = `
        <div class="p-6">
            <h2 class="text-lg font-bold mb-4">Create Workspace</h2>
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <button id="wsEmojiBtn" class="text-3xl rounded-lg p-2 hover:bg-gray-100">${selectedEmoji}</button>
                    <input id="wsNameInput" type="text" placeholder="Workspace name" class="flex-1 bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-lp-purple/30" autofocus>
                </div>
                <div>
                    <label class="text-xs font-semibold text-gray-500 uppercase mb-2 block">Color</label>
                    <div class="flex gap-2 flex-wrap" id="colorPicker"></div>
                </div>
                <button id="createWSSubmit" class="w-full bg-lp-purple hover:bg-indigo-600 text-white rounded-lg py-3 font-medium">Create</button>
            </div>
        </div>`;

        overlay.classList.remove('hidden');
        overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.add('hidden'); };

        const colors = ['#6264A7', '#4F6BED', '#0EA5E9', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];
        document.getElementById('colorPicker').innerHTML = colors.map(c => `
            <button class="workspace-color ${c === selectedColor ? 'selected' : ''}" style="background:${c}" data-color="${c}"></button>
        `).join('');

        document.querySelectorAll('.workspace-color').forEach(btn => {
            btn.onclick = () => {
                selectedColor = btn.dataset.color;
                document.querySelectorAll('.workspace-color').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });

        document.getElementById('createWSSubmit').onclick = () => {
            const name = document.getElementById('wsNameInput').value.trim();
            if (!name) return;
            const ws = {
                id: state.uid(),
                name,
                emoji
The app includes a built-in dark mode toggle.

## 💾 Data Storage

All data is stored in browser localStorage. Use the export feature to backup your data.

## 🔗 Dependencies

- Tailwind CSS (via CDN)
- Font Awesome (via CDN)
- GSAP (via CDN) — for animations
- Sortable.js (via CDN) — for drag & drop

## 📝 License

MIT License - feel free to use and modify!

## 👤 Author

Created by Mirek

---

**Made with ❤️ for collaborative workspace excellence**
