// Properties Database State
const properties = [
    {
        id: 'prop_1',
        title: 'The Obsidian Pavilion',
        type: 'mansion',
        price: 5400000,
        location: 'malibu',
        locationLabel: 'Malibu, California',
        beds: 6,
        baths: 7,
        sqft: '8,200 sqft',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        desc: 'Suspended above the Pacific shorelines, this structural marvel utilizes high-impact dark steel trusses and floor-to-ceiling glass panel frameworks. Fully automated home networks integrated with bespoke edge solar layouts.'
    },
    {
        id: 'prop_2',
        title: 'Azure Skyline Penthouse',
        type: 'apartment',
        price: 2850000,
        location: 'miami',
        locationLabel: 'Miami, Florida',
        beds: 3,
        baths: 3.5,
        sqft: '3,450 sqft',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        desc: 'Overlooking Biscayne Bay, this premium triplex layout features wrap-around entertainment terraces, private direct-access elevator entry, calacatta marble workspaces, and custom internal plunge pools.'
    },
    {
        id: 'prop_3',
        title: 'Aerie Timber Ridge Lodge',
        type: 'villa',
        price: 4200000,
        location: 'aspen',
        locationLabel: 'Aspen, Colorado',
        beds: 5,
        baths: 6,
        sqft: '6,100 sqft',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
        desc: 'A ski-in/ski-out architectural masterpiece crafted out of locally-sourced red cedar timbers and raw volcanic granite slabs. Features integrated custom sauna installations and multi-tier climate systems.'
    },
    {
        id: 'prop_4',
        title: 'Coastal Monolith Villa',
        type: 'villa',
        price: 1350000,
        location: 'malibu',
        locationLabel: 'Malibu, California',
        beds: 4,
        baths: 4,
        sqft: '4,200 sqft',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        desc: 'A minimalist approach emphasizing linear geometry along the coastal highway. Includes internal Zen rock courtyard micro-gardens, thermal heating grids, and matching monolithic limestone block masonry.'
    },
    {
        id: 'prop_5',
        title: 'Soleil Marina Duplex',
        type: 'apartment',
        price: 1100000,
        location: 'miami',
        locationLabel: 'Miami, Florida',
        beds: 2,
        baths: 2.5,
        sqft: '2,100 sqft',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        desc: 'A beautifully bright, sun-soaked waterfront duplex situated on the edge of the luxury marina slips. Features high ceilings, modern integrated appliances, and a private vessel mooring point.'
    }
];

// Document Elements Selectors
const grid = document.getElementById('listingsGrid');
const counterLabel = document.getElementById('resultsCount');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const locationFilter = document.getElementById('locationFilter');

// Modal Elements
const modal = document.getElementById('detailsModal');
const closeModalBtn = document.getElementById('closeModalBtn');

document.addEventListener('DOMContentLoaded', () => {
    // Primary display cycle execution
    filterProperties();

    // Attach reactive input event listeners
    typeFilter.addEventListener('change', filterProperties);
    priceFilter.addEventListener('change', filterProperties);
    locationFilter.addEventListener('change', filterProperties);
    
    // Modal structural bindings
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.add('hidden'); });
});

// Structural filtering and layout routing pipeline
function filterProperties() {
    const activeType = typeFilter.value;
    const activePrice = priceFilter.value;
    const activeLoc = locationFilter.value;

    const matched = properties.filter(prop => {
        const typeMatch = (activeType === 'all' || prop.type === activeType);
        const locMatch = (activeLoc === 'all' || prop.location === activeLoc);
        const priceMatch = (activePrice === 'all' || prop.price <= parseInt(activePrice));
        return typeMatch && locMatch && priceMatch;
    });

    renderGrid(matched);
}

// Generate listing templates inside target view bounds
function renderGrid(data) {
    grid.innerHTML = '';
    counterLabel.innerText = `Showing ${data.length} propert${data.length === 1 ? 'y' : 'ies'}`;

    if(data.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
                <p class="text-slate-500 text-sm">No bespoke assets match your filter criteria.</p>
                <button onclick="resetFilters()" class="mt-3 text-xs text-amber-500 underline font-semibold cursor-pointer">Reset Configuration</button>
            </div>
        `;
        return;
    }

    data.forEach(prop => {
        const itemCard = document.createElement('div');
        itemCard.className = 'bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg group hover:border-slate-700 transition flex flex-col justify-between';
        
        itemCard.innerHTML = `
            <div class="relative overflow-hidden aspect-video bg-slate-950">
                <img src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-2 py-1 rounded text-amber-400">
                    ${prop.type}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between gap-4">
                <div class="space-y-1">
                    <div class="flex justify-between items-start gap-2">
                        <h4 class="font-bold text-base text-slate-200 line-clamp-1">${prop.title}</h4>
                    </div>
                    <p class="text-xs text-slate-400 flex items-center gap-1">📍 ${prop.locationLabel}</p>
                </div>
                
                <div class="flex justify-between items-center bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl text-xs font-mono text-slate-400">
                    <span>🛌 ${prop.beds} Bed</span>
                    <span>🛁 ${prop.baths} Bath</span>
                    <span>📐 ${prop.sqft}</span>
                </div>

                <div class="flex justify-between items-center gap-2 pt-1">
                    <span class="text-lg font-black text-slate-100 font-mono">${formatCurrency(prop.price)}</span>
                    <button onclick="viewPropertyDetails('${prop.id}')" class="px-3 py-1.5 bg-slate-800 hover:bg-amber-600 hover:text-slate-950 text-xs font-semibold rounded-lg transition duration-150 cursor-pointer">
                        Inspect
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(itemCard);
    });
}

// Inspect details inside overlay frames
window.viewPropertyDetails = function(id) {
    const item = properties.find(p => p.id === id);
    if(!item) return;

    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalImage').alt = item.title;
    document.getElementById('modalType').innerText = item.type;
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalLocation').innerText = `📍 ${item.locationLabel}`;
    document.getElementById('modalPrice').innerText = formatCurrency(item.price);
    document.getElementById('modalBeds').innerText = item.beds;
    document.getElementById('modalBaths').innerText = item.baths;
    document.getElementById('modalSqft').innerText = item.sqft;
    document.getElementById('modalDesc').innerText = item.desc;

    modal.classList.remove('hidden');
};

// Reset selectors fallback control
window.resetFilters = function() {
    typeFilter.value = 'all';
    priceFilter.value = 'all';
    locationFilter.value = 'all';
    filterProperties();
};

// Currency localization helper
function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}