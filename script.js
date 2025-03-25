const correctAnswers = ["a) HyperText Markup Language", "b) CSS", "c) JavaScript","a) Document Object Model","d) clicking or typing"];

document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", function () {
        let questionIndex = document.getElementById("quiz").dataset.question;
        let selectedAnswer = button.textContent.trim();
        let storedScore = parseInt(localStorage.getItem("quizScore")) || 0;
        let answered = localStorage.getItem(`question_${questionIndex}`);
        if (!answered && selectedAnswer === correctAnswers[questionIndex]) {
            storedScore++;
            localStorage.setItem("quizScore", storedScore);
        }
        localStorage.setItem(`question_${questionIndex}`, selectedAnswer);
        document.querySelectorAll(".option").forEach(btn => {
            btn.classList.remove("selected");
            if (btn.textContent.trim() === correctAnswers[questionIndex]) {
                btn.style.backgroundColor = "#28a745"; 
            } else if (btn === button && btn.textContent.trim() !== correctAnswers[questionIndex]) {
                btn.style.backgroundColor = "#dc3545"; 
            }
        });
        button.classList.add("selected");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes("index1.html")) {
        localStorage.setItem("quizScore", 0);
        correctAnswers.forEach((_, index) => {
            localStorage.removeItem(`question_${index}`);
        });
    }
    if (document.getElementById("quiz")) {
        let questionIndex = document.getElementById("quiz").dataset.question;
        let previousAnswer = localStorage.getItem(`question_${questionIndex}`);
        if (previousAnswer) {
            document.querySelectorAll(".option").forEach(btn => {
                if (btn.textContent.trim() === previousAnswer) {
                    btn.classList.add("selected");
                }
                if (btn.textContent.trim() === correctAnswers[questionIndex]) {
                    btn.style.backgroundColor = "#28a745";
                } else if (btn.textContent.trim() === previousAnswer && 
                           btn.textContent.trim() !== correctAnswers[questionIndex]) {
                    btn.style.backgroundColor = "#dc3545";
                }
            });
        }
    }
    if (document.getElementById("score")) {
        let finalScore = localStorage.getItem("quizScore") || 0;
        document.getElementById("score").textContent = `You scored ${finalScore} / ${correctAnswers.length}`;
        
        let message = document.querySelector("#result p");
        if (finalScore == correctAnswers.length) {
            message.textContent = "Perfect! You got all answers correct!";
        } else if (finalScore > correctAnswers.length/2) {
            message.textContent = "Good job! You passed the quiz!";
        } else {
            message.textContent = "Keep practicing! You can do better next time.";
        }
    }
    if (document.getElementById("quit")) {
        document.getElementById("quit").addEventListener("click", function() {
            if (confirm("Are you sure you want to quit the quiz?")) {
                window.location.href = "score.html";
            }
        });
    }
});