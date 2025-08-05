document.addEventListener('DOMContentLoaded', () => {
    
    const jobListingsContainer = document.getElementById('job-listings');
    const searchBar = document.getElementById('search-bar');
    let allJobs = []; // This will store the master list of jobs

    // Function to calculate 'time ago' from a date string
    const timeAgo = (dateString) => {
        const past = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - past) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return "Posted " + Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return "Posted " + Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return "Posted " + Math.floor(interval) + " minutes ago";
        return "Posted just now";
    };

    // ⭐️ NEW: Main function to render jobs to the page
    const renderJobs = (jobsToRender) => {
        jobListingsContainer.innerHTML = ''; // Clear existing listings
        
        if (jobsToRender.length === 0) {
            jobListingsContainer.innerHTML = '<p>No jobs found matching your search.</p>';
            return;
        }

        jobsToRender.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            // ⭐️ UPDATED: Using icons and the timeAgo function
            jobCard.innerHTML = `
                <div class="job-details">
                    <h2>${job.title}</h2>
                    <p><i class="fa-solid fa-building"></i> ${job.company}</p>
                    <p><i class="fa-solid fa-map-marker-alt"></i> ${job.location}</p>
                    <p><i class="fa-solid fa-clock"></i> ${timeAgo(job.postedDate)}</p>
                    <div class="job-sponsorship">${job.sponsorship}</div>
                </div>
                <a href="${job.applyLink}" target="_blank" class="apply-button">Apply Now</a>
            `;
            jobListingsContainer.appendChild(jobCard);
        });
    };

    // Fetch the job data ONCE when the page loads
    fetch('jobs.json')
        .then(response => response.json())
        .then(data => {
            allJobs = data.jobs; // Store the master list
            renderJobs(allJobs); // Initial render of all jobs
        })
        .catch(error => {
            console.error('Error fetching job data:', error);
            jobListingsContainer.innerHTML = '<p>Sorry, we were unable to load job listings.</p>';
        });

    // ⭐️ NEW: Event listener for the search bar
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredJobs = allJobs.filter(job => {
            return (
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.location.toLowerCase().includes(searchTerm)
            );
        });
        
        renderJobs(filteredJobs);
    });
});