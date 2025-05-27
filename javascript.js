class SleepTracker {
    constructor() {
        this.data = this.loadData();
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
}

document.addEventListener("DOMContentLoaded", () => new SleepTracker());
