// This event listener waits for the HTML document to be fully loaded before running the script.
document.addEventListener('DOMContentLoaded', () => {
    
    // Find the container element in the HTML where we will insert the job listings.
    const jobListingsContainer = document.getElementById('job-listings');

    // Fetch the job data from our jobs.json file.
    // 'fetch' is a modern JavaScript way to get data from a URL or a local file.
    fetch('jobs.json')
        .then(response => response.json()) // Convert the response from the server into JSON format.
        .then(data => {
            // Now we have the job data. Let's process it.
            const jobs = data.jobs;

            // Loop through each job object in our array of jobs.
            jobs.forEach(job => {
                // For each job, create a new 'div' element for the job card.
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card'); // Add the 'job-card' class for styling.

                // Use template literals (the backticks ``) to create the HTML for the inside of the card.
                // This is much cleaner than creating each element one by one.
                jobCard.innerHTML = `
                    <div class="job-details">
                        <h2>${job.title}</h2>
                        <p><strong>Company:</strong> ${job.company}</p>
                        <p><strong>Location:</strong> ${job.location}</p>
                        <p><strong>Posted:</strong> ${job.postedDate}</p>
                        <div class="job-sponsorship">${job.sponsorship}</div>
                    </div>
                    <a href="${job.applyLink}" target="_blank" class="apply-button">Apply Now</a>
                `;

                // Append the newly created job card to our main container.
                jobListingsContainer.appendChild(jobCard);
            });
        })
        .catch(error => {
            // If there's an error fetching the jobs.json file, log it to the console.
            console.error('Error fetching job data:', error);
            jobListingsContainer.innerHTML = '<p>Sorry, we were unable to load job listings at this time.</p>';
        });
});