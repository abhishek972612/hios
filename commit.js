// Import necessary modules
const moment = require('moment');
const simpleGit = require('simple-git');
const randomFloat = Math.random();

// Initialize git
const git = simpleGit();

// Function to generate a random integer between 0 and a given max
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

// Define the commit function
async function makeCommits(startDate, endDate, commitsPerDay = 1) {
    // Parse start and end dates
    let currentDate = moment(startDate);
    const endMoment = moment(endDate);

    // Loop through each day
    while (currentDate.isBefore(endMoment) || currentDate.isSame(endMoment)) {
        for (let i = 0; i < commitsPerDay; i++) {
            // Generate a random commit time for the day
            const commitTime = currentDate.clone().add(getRandomInt(23), 'hours').add(getRandomInt(59), 'minutes');

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

// Define start and end dates and run the commit function
const startDate = '2023-12-06'; // Change this to your desired start date
const endDate = '2023-12-15'; // Change this to your desired end date
const commitsPerDay = randomFloat; // Change this to the number of commits per day

makeCommits(startDate, endDate, commitsPerDay).then(() => console.log('All commits are done!'));