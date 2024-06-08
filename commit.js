// Import necessary modules
const moment = require('moment');
const simpleGit = require('simple-git');

// Initialize git
const git = simpleGit();

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Define the commit function
async function makeCommits(startDate, endDate, minCommitsPerDay, maxCommitsPerDay) {
    // Parse start and end dates
    let currentDate = moment(startDate);
    const endMoment = moment(endDate);

    // Loop through each day
    while (currentDate.isBefore(endMoment) || currentDate.isSame(endMoment)) {
        // Generate a random number of commits for the day
        const commitsForTheDay = getRandomInt(minCommitsPerDay, maxCommitsPerDay);

        for (let i = 0; i < commitsForTheDay; i++) {
            // Generate a random commit time for the day
            const commitTime = currentDate.clone().add(getRandomInt(0, 23), 'hours').add(getRandomInt(0, 59), 'minutes');

            // Set GIT_AUTHOR_DATE and GIT_COMMITTER_DATE
            process.env.GIT_AUTHOR_DATE = commitTime.format();
            process.env.GIT_COMMITTER_DATE = commitTime.format();

            // Create an empty commit
            await git.commit(`Commit for ${commitTime.format('YYYY-MM-DD HH:mm:ss')}`, '--allow-empty');
            console.log(`Committed on ${commitTime.format('YYYY-MM-DD HH:mm:ss')}`);
        }

        // Move to the next day
        currentDate.add(1, 'days');
    }
}

// Define start and end dates, and the range for random commits per day
const startDate = '2023-12-06'; // Change to your desired start date
const endDate = '2024-12-15'; // Change to your desired end date
const minCommitsPerDay = 1; // Minimum commits per day
const maxCommitsPerDay = 8; // Maximum commits per day

// Run the commit function
makeCommits(startDate, endDate, minCommitsPerDay, maxCommitsPerDay).then(() => console.log('All commits are done!'));