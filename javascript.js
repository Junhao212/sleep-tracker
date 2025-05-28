class SleepTracker {
    constructor() {
        this.data = this.loadData();
        this.initEventListeners();
        this.updateUI();
    }

    loadData() {
        return JSON.parse(localStorage.getItem("sleepData")) || {
            nightSleep: "7.5",
            daySleep: "2.5",
            sleepQuality: "😐",
            energyLevel: "🙂",
            notes: ""
        };
    }

    saveData() {
        localStorage.setItem("sleepData", JSON.stringify(this.data));
    }

    updateUI() {
        document.querySelector(".night-sleep-input").value = this.data.nightSleep;
        document.querySelector(".day-sleep-input").value = this.data.daySleep;
        document.querySelector(".selection:nth-of-type(1) button").textContent = this.data.sleepQuality;
        document.querySelector(".selection:nth-of-type(2) button").textContent = this.data.energyLevel;
        document.querySelector("textarea").value = this.data.notes;
    }

    initEventListeners() {
        // Sleep inputs
        document.querySelector(".night-sleep-input").addEventListener("input", (e) => {
            this.data.nightSleep = e.target.value;
            this.saveData();
        });

        document.querySelector(".day-sleep-input").addEventListener("input", (e) => {
            this.data.daySleep = e.target.value;
            this.saveData();
        });

     
        document.querySelectorAll(".options button").forEach(button => {
            button.addEventListener("click", (event) => {
                const category = event.target.parentElement.previousElementSibling.textContent;
                if (category.includes("Sleep quality")) {
                    this.data.sleepQuality = event.target.textContent;
                } else if (category.includes("Energy levels")) {
                    this.data.energyLevel = event.target.textContent;
                }
                this.saveData();
                this.updateUI();
            });
        });

    
        document.querySelector(".save-btn").addEventListener("click", () => {
            this.data.notes = document.querySelector("textarea").value;
            this.saveData();
            alert("Data saved!");
        });
    }
}

document.addEventListener("DOMContentLoaded", () => new SleepTracker());
