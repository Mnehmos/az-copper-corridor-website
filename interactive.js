document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'directory-controls';
    mainContainer.insertBefore(controlsContainer, mainContainer.firstChild); // Insert controls at the top of main

    // --- Control Elements ---
    controlsContainer.innerHTML = `
        <div class="control-group">
            <label for="searchBox">Search:</label>
            <input type="text" id="searchBox" placeholder="Search listings...">
        </div>
        <div class="control-group">
            <label for="categoryFilter">Filter by Category:</label>
            <select id="categoryFilter">
                <option value="">All Categories</option>
                <!-- Categories will be populated dynamically -->
            </select>
        </div>
        <div class="control-group">
            <label>Sort by:</label>
            <button data-sort="name">Name (A-Z)</button>
            <button data-sort="category">Category (A-Z)</button>
        </div>
        <hr>
    `;

    const searchBox = document.getElementById('searchBox');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortButtons = controlsContainer.querySelectorAll('button[data-sort]');
    const listingsContainer = document.createElement('div'); // Create a dedicated container for listings
    listingsContainer.className = 'listings-container';
    mainContainer.appendChild(listingsContainer);

    let allListingsData = [];
    let originalListingsOrder = []; // To keep track of the original DOM elements

    // --- Ad Insertion Logic (from ads.js) ---
    function insertAds(container) {
        const listings = container.querySelectorAll('.business-listing');
        const adFrequency = 5; // Show an ad after every 5 listings

        // Remove existing dynamic ads before re-inserting
        container.querySelectorAll('.dynamic-ad').forEach(ad => ad.remove());

        listings.forEach((listing, index) => {
            if ((index + 1) % adFrequency === 0 && index < listings.length - 1) {
                const adPlaceholder = document.createElement('div');
                adPlaceholder.className = 'ad-placeholder dynamic-ad';
                adPlaceholder.style.minHeight = '90px';
                adPlaceholder.style.border = '1px dashed #ccc';
                adPlaceholder.style.textAlign = 'center';
                adPlaceholder.style.padding = '10px';
                adPlaceholder.style.margin = '20px 0';
                adPlaceholder.style.backgroundColor = '#fafafa';
                adPlaceholder.style.color = '#999';
                adPlaceholder.textContent = 'Ad Placeholder (Dynamic)';
                listing.parentNode.insertBefore(adPlaceholder, listing.nextSibling);
            }
        });
    }

    // --- Data Parsing ---
    function parseListings() {
        const listingElements = mainContainer.querySelectorAll('.business-listing');
        const categories = new Set();
        allListingsData = []; // Clear previous data
        originalListingsOrder = Array.from(listingElements); // Store original elements

        listingElements.forEach(el => {
            const name = el.querySelector('h3')?.textContent.trim() || '';
            let category = '';
            const categoryP = Array.from(el.querySelectorAll('p > strong')).find(strong => strong.textContent.includes('Category:'));
            if (categoryP) {
                category = categoryP.parentNode.textContent.replace('Category:', '').trim();
                // Handle multiple categories if separated by comma/slash etc.
                category.split(/[,/]/).forEach(cat => {
                    const trimmedCat = cat.trim();
                    if (trimmedCat) categories.add(trimmedCat);
                });
            }

            const data = {
                name: name,
                category: category, // Store full category string for display
                element: el, // Keep reference to the original DOM element
                searchText: el.textContent.toLowerCase() // Text content for searching
            };
            allListingsData.push(data);

            // Move the element to the dedicated container
            listingsContainer.appendChild(el);
        });

        // Populate category filter
        categoryFilter.innerHTML = '<option value="">All Categories</option>'; // Reset
        [...categories].sort().forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    // --- Rendering ---
    function renderListings(listingsToRender) {
        listingsContainer.innerHTML = ''; // Clear current listings
        if (listingsToRender.length === 0) {
            listingsContainer.innerHTML = '<p>No listings match your criteria.</p>';
        } else {
            listingsToRender.forEach(data => {
                listingsContainer.appendChild(data.element); // Append the original DOM element
            });
            insertAds(listingsContainer); // Re-insert ads
        }
    }

    // --- Filtering, Searching, Sorting ---
    function applyFiltersAndSort() {
        const searchTerm = searchBox.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        let currentSort = controlsContainer.querySelector('button.active')?.dataset.sort || 'original'; // Default to original order

        let filteredData = allListingsData.filter(data => {
            const matchesSearch = !searchTerm || data.searchText.includes(searchTerm);
            const matchesCategory = !selectedCategory || data.category.toLowerCase().includes(selectedCategory.toLowerCase());
            return matchesSearch && matchesCategory;
        });

        // Apply sorting
        if (currentSort === 'name') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'category') {
            filteredData.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)); // Sort by category, then name
        } else {
             // Maintain original relative order if no sort or 'original' sort applied
             // This requires comparing against the original full list order
             filteredData.sort((a, b) => originalListingsOrder.indexOf(a.element) - originalListingsOrder.indexOf(b.element));
        }


        renderListings(filteredData);
    }

    // --- Event Listeners ---
    searchBox.addEventListener('input', applyFiltersAndSort);
    categoryFilter.addEventListener('change', applyFiltersAndSort);

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentActive = controlsContainer.querySelector('button.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            button.classList.add('active');
            applyFiltersAndSort();
        });
    });

    // --- Initial Load ---
    parseListings(); // Parse data on load
    // Initial render uses original order implicitly because no sort is active
    // renderListings(allListingsData); // Render initially (already in container)
    insertAds(listingsContainer); // Insert initial ads

});
