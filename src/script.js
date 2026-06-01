// Placeholder for INJECTED_DATA and INJECTED_SCHEDULE
// These will be replaced by the build script
const INJECTED_DATA = [];
const INJECTED_SCHEDULE = [];

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('category-search');
    const categoryFiltersDiv = document.getElementById('category-filters');

    let allTalksData = INJECTED_DATA;
    let fullSchedule = INJECTED_SCHEDULE;
    let activeCategories = new Set();

    function renderSchedule(scheduleToRender) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        scheduleToRender.forEach(item => {
            let entryDiv = document.createElement('div');
            entryDiv.classList.add('schedule-entry');

            if (item.type === 'talk') {
                entryDiv.classList.add('talk-entry');
                entryDiv.innerHTML = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h3>${item.title}</h3>
                    <p class="speakers">Speakers: ${item.speakers.join(', ')}</p>
                    <p class="categories">${item.categories.map(cat => `<span>${cat}</span>`).join('')}</p>
                    <p class="description">${item.description}</p>
                `;
            } else if (item.type === 'break') {
                entryDiv.classList.add('break-entry');
                entryDiv.innerHTML = `
                    <span class="time">${item.startTime} - ${item.endTime}</span>
                    <h3>${item.title}</h3>
                `;
            } else if (item.type === 'transition') {
                entryDiv.classList.add('transition-entry');
                entryDiv.innerHTML = `
                    <p>Transition (${item.duration} min)</p>
                `;
            }
            scheduleContainer.appendChild(entryDiv);
        });
    }

    function populateCategoryFilters() {
        const allCategories = new Set();
        allTalksData.forEach(talk => {
            talk.categories.forEach(cat => allCategories.add(cat));
        });

        categoryFiltersDiv.innerHTML = ''; // Clear previous filters
        allCategories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('category-button');
            button.textContent = category;
            button.dataset.category = category;
            button.addEventListener('click', () => {
                if (activeCategories.has(category)) {
                    activeCategories.delete(category);
                    button.classList.remove('active');
                } else {
                    activeCategories.add(category);
                    button.classList.add('active');
                }
                filterSchedule();
            });
            categoryFiltersDiv.appendChild(button);
        });
    }

    function filterSchedule() {
        const searchTerm = categorySearchInput.value.toLowerCase();
        let filteredSchedule = fullSchedule.filter(item => {
            if (item.type === 'talk') {
                const matchesCategory = activeCategories.size === 0 || item.categories.some(cat => activeCategories.has(cat));
                const matchesSearch = searchTerm === '' ||
                                      item.title.toLowerCase().includes(searchTerm) ||
                                      item.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm)) ||
                                      item.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
                                      item.description.toLowerCase().includes(searchTerm);
                return matchesCategory && matchesSearch;
            }
            // Always show breaks and transitions, regardless of filters
            return true;
        });

        // If no talks match, but there are breaks/transitions, show them
        if (filteredSchedule.length === 0 && fullSchedule.some(item => item.type !== 'talk')) {
            renderSchedule(fullSchedule.filter(item => item.type !== 'talk'));
        } else {
            renderSchedule(filteredSchedule);
        }
    }

    categorySearchInput.addEventListener('input', filterSchedule);

    // Initial render
    populateCategoryFilters();
    renderSchedule(fullSchedule);
});
