function displayQuiz() {
    const questions = [
        {
            question: "You’re just starting on maple and you need to decide on a class to main! Do you...",
            choices: ["pick something that looks cool!", "look at a tier list on youtube"],
            weights: [
                {judgingScore: +3, perceivingScore: 0 }, // Weight for first choice
                {perceivingScore: +1, judgingScore:0 }, // Weight for second choice
            ]
        },
        {
            question: "Your fren wants to bring someone you barely know into your ckalos pt.. What will you say?",
            choices: ["sure new friend!", "hell no my meso/drops"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 }, // Weight for first choice
                {feelingScore: +3, thinkingScore: 0 } // Weight for second choice
            ]
        },
        {
            question: "Its ssf and you hit a 21 eternal in 10b! Do you tap to 22 or focus on your other equips?",
            choices: ["i’m feeling lucky today", "this is a big dmg increase already and i have gains to make elsewhere"],
            weights: [
                {intuitionScore: +3, sensingScore: 0 } , // Weight for first choice
                {sensingScore: +1, intuitionScore: 0 } , // Weight for second choice
            ]
        },
        {
            question: "Someone in your guild’s discord is flexing their gene badge that they just got after several months of running bm. What do you react with?",
            choices: ["“pog”", "“it’s always the same ppl hitting when will it be my turn”"],
            weights: [
                {perceivingScore: +1, judgingScore: 0 } , // Weight for first choice
                {judgingScore: +3, perceivingScore: 0 }, // Weight for second choice
            ]
        },
        {
            question: "You had a busy day today and only have 10 minutes to play before reset. Do you...",
            choices: ["do symbol dailies - slow and steady wins the race", "do daily bosses - maybe something will drop!"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 } , // Weight for first choice
                {intuitionScore: +3, sensingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"While wandering Fruitville, you notice nobody questioning a human among the fruits. Looking down, you see your limbs, but realize fruits also have their own…",
            choices: ["Am I still a human?", "Am I a fruit?"],
            weights: [
                {thinkingScore: +1, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +3, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"An nx item that you’ve had your eye on has been released in ssbs! How many boxes are you gonna buy?",
            choices: ["none; nexon doesn’t deserve my money", "a set or two won’t hurt.. Maybe i’ll get lucky"],
            weights: [
                {sensingScore: +1, intuitionScore: 0 } , // Weight for first choice
                {intuitionScore: +3, sensingScore: 0 } , // Weight for intuition 
            ]
        },
        {
            question:"Maple is under maintenance again. What do you do in the meantime?",
            choices: ["scroll the subreddit", "play other games"],
            weights: [
                {introvertScore: +1, extrovertScore: 0 } , // Weight for first choice
                {extrovertScore: +3, introvertScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"As you prepare to leave Fruitville, the Mayor expresses gratitude for visiting and tells you that your FruitCard will arrive in the mail soon.",
            choices: ["Finally! That was a strange experience", "Was I a fruit the entire time? I feel so confused"],
            weights: [
                {thinkingScore: +3, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +1, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"Which map would you prefer to afk in?",
            choices: ["c1 henesys", "a quiet, scenic hidden map"],
            weights: [
                {thinkingScore: +3, feelingScore: 0 } , // Weight for first choice
                {feelingScore: +1, thinkingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"your class just lost -20% fd in the most recent balance patch.. will you",
            choices: ["switch to a stronger class that just got 30% fd", "stick with your class and pray to chang soup it gets buffed"],
            weights: [
                {extrovertScore: +3, introvertScore: 0 } , // Weight for first choice
                {introvertScore: +1, extrovertScore: 0 } , // Weight for second choice
            ]
        },
        {
            question:"your mule gets a pitch drop. you think..",
            choices: ["yay a pitch", "why couldn’t it be my main"],
            weights: [
                {perceivingScore: +3, judgingScore: 0 } , // Weight for first choice
                {judgingScore: +1, perceivingScore: 0 } , // Weight for second choice
            ]
        },
        {
            question: "Processing your class...",
            choices: ["View my class!"],
            weights: [
                {extrovertScore: 0, introvertScore: 0 }, // laceholder
                {introvertScore: 0, extrovertScore: 0}, //Placeholder
            ]
        },
    ]


    //Variables for scores 
    let currentQuestionIndex = 0;
    let introvertScore = 0;
    let extrovertScore = 0;
    let judgingScore = 0;
    let perceivingScore = 0;
    let sensingScore = 0;
    let intuitionScore = 0;
    let thinkingScore = 0;
    let feelingScore = 0;


    function displayQuestionImage(questionIndex) {
        const imageURLs = [
            "Q1.png",
            "Q2.png",
            "Q3.png",
            "Q4.png",
            "Q5.png",
            "Q6.png",
            "Q7.png",
            "Q8.png",
            "Q9.png",
            "Q10.png",
            "Q11.png",
            "Q12.png",
            "processing.GIF",
        ];
        const questionImageElement = document.getElementById('question-image');
        questionImageElement.src = imageURLs[questionIndex];
    }

    document.getElementById('begin-quiz').addEventListener('click', function() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
    });

    //Function to display the current question and choices
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const progressImageElement = document.getElementById('question-progress-image');
        const choiceContainers = document.getElementById('choices');
        
        choiceContainers.innerHTML = '';
        
        questionElement.textContent = currentQuestion.question;
        progressImageElement.src = getQuestionProgressImage(currentQuestionIndex);
        
        displayQuestionImage(currentQuestionIndex);

        currentQuestion.choices.forEach((choice, index) => {
                //Buttons for choices
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choiceContainers.appendChild(button);
        });
        }

    //Function to get progress bar image URL for the current question 
    function getQuestionProgressImage(questionIndex) {
        const progressImageURLs = [
            "Q1 progress.svg",
            "Q2 progress.svg",
            "Q3 progress.svg",
            "Q4 progress.svg",
            "Q5 progress.svg",
            "Q6 progress.svg",
            "Q7 progress.svg",
            "Q8 progress.svg",
            "Q9 progress.svg",
            "Q10 progress.svg",
            "Q11 progress.svg",
            "Q12 progress.svg",
        ];
        return progressImageURLs[questionIndex] || "";
    }

    //Function to handle choice click
    function handleChoiceClick(choiceIndex) {
        // Update scores based on user response
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];
        console.log("Selected choice weight:", selectedChoiceWeight);

                //Update scores based on weight of selected choice
                if (selectedChoiceWeight.hasOwnProperty('introvertScore')) {
                    introvertScore += selectedChoiceWeight.introvertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('extrovertScore')) {
                    extrovertScore += selectedChoiceWeight.extrovertScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('judgingScore')) {
                    judgingScore += selectedChoiceWeight.judgingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('perceivingScore')) {
                    perceivingScore += selectedChoiceWeight.perceivingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('sensingScore')) {
                    sensingScore += selectedChoiceWeight.sensingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('intuitionScore')) {
                    intuitionScore += selectedChoiceWeight.intuitionScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('thinkingScore')) {
                    thinkingScore += selectedChoiceWeight.thinkingScore;
                }
                if (selectedChoiceWeight.hasOwnProperty('feelingScore')) {
                    feelingScore += selectedChoiceWeight.feelingScore;
                }

            //Move to the next question
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                calculateMBTITypeAndDisplayImage();
            }
        }
        

    //Function to calculate MBTI type based on scores and display image
    function calculateMBTITypeAndDisplayImage() {
        //Calculate introvert/extrovert dimension
        const introextro = introvertScore > extrovertScore ? "I" :"E";
        //Calculate sensing/intuition dimension
        const sensint = sensingScore > intuitionScore ? "S" : "N";
        //Calculate thinking/feeling dimension
        const thinkfeel = thinkingScore > feelingScore ? "T" : "F";
        //Calculate judging/perceiving dimension
        const judgeper = judgingScore > perceivingScore ? "J" : "P";
        //Produce MBTI type string
        const mbtiTypeString = introextro + sensint + thinkfeel + judgeper;

        console.log("MBTI Type:", mbtiTypeString);

        document.getElementById('results').style.display = 'none';
        
        //Remove quiz-related elements from the DOM
        const questionElement = document.getElementById('question');
        const choiceContainers = document.getElementById('choices');
        const quizContainer = document.getElementById('quiz');
        const thumbnailImage = document.querySelector('img[src="Thumbnail.gif"]');
        questionElement.remove();
        choiceContainers.remove();
        quizContainer.remove();
        thumbnailImage.remove();

        displayImage(mbtiTypeString);

        document.getElementById('results').style.display = 'block'
    }
    
    //Function to calculate MBTI type and return image URL 
        function getMBTIImageUrl(mbtiTypeString) {
            const MBTIImageUrls = {
                "ENTJ": "Lemon.png",
                "INTJ": "Pomegranate.png", 
                "ENTP": "Dragon Fruit.png",
                "INTP": "Grape.png",
                "ENFJ": "Peach.png",
                "INFJ": "Fig.png",
                "ENFP": "Watermelon.png",
                "INFP": "Cherry.png",
                "ESFJ": "Orange.png",
                "ISFJ": "Apple.png",
                "ESTJ": "Banana.png",
                "ISTJ": "Pear.png",
                "ESTP": "Pineapple.png",
                "ISTP": "Coconut.png",
                "ESFP": "Mango.png",
                "ISFP": "Strawberry.png",
            };
            return MBTIImageUrls[mbtiTypeString] || ""
        }

        //Display image
        function displayImage(mbtiTypeString) {
            const imageURL = getMBTIImageUrl(mbtiTypeString);
            const mbtiImageContainer = document.getElementById('mbti-image');
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;

            mbtiImageContainer.appendChild(imageElement);
    
    }
        //Display the first question when the quiz starts
        displayCurrentQuestion();
        document.addEventListener('DOMContentLoaded', () => {
        const choiceContainers = document.querySelectorAll('.choice-container');
        choiceContainers.forEach((container) => {
            const choices = container.querySelectorAll('button');
            choices.forEach((choice, choiceIndex) => {
                choice.addEventListener('click', () => {
                    handleChoiceClick(choiceIndex);
                });
            });
        });
    });
}

//Call function to start the quiz
displayQuiz();

// Share quiz button click event handler
document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.share-button');

    shareButton.addEventListener('click', function() {
        const url = window.location.href;

        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Quiz URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy URL: ', err);
            });
    });
});

// Select the button element
const backToHomeButton = document.getElementById('back-to-home');

// Add event listener for the button click
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-to-home');

    backButton.addEventListener('click', function() {
        // Redirect to the home page or perform any other action you want
        window.location.href = 'https://alkaruarts.github.io/FruitCard-Odyssey/'; // Replace 'home.html' with the actual URL of your home page
    });
});

// Function to navigate back to the home page
function navigateToHomePage() {
    // Reset quiz state if needed
    resetQuiz(); // Assuming you have a resetQuiz() function defined

    // Hide quiz page and show the home page
    document.getElementById('home').style.display = 'block';
    document.getElementById('quiz-page').style.display = 'none';
}

