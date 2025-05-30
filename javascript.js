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
        notes: "",
        selectedDay: "21"
      };
    }
  
    saveData() {
      localStorage.setItem("sleepData", JSON.stringify(this.data));
    }
  
    updateUI() {
      document.querySelector(".night-sleep-input").value = this.data.nightSleep;
      document.querySelector(".day-sleep-input").value = this.data.daySleep;
  
      // Emoji's voor scherm 1
      const sleepQualityBtns = document.querySelectorAll(".selection:nth-of-type(1) button");
      sleepQualityBtns.forEach(btn => btn.textContent = this.data.sleepQuality);
  
      const energyLevelBtns = document.querySelectorAll(".selection:nth-of-type(2) button");
      energyLevelBtns.forEach(btn => btn.textContent = this.data.energyLevel);
  
      // Emoji's voor scherm 2 (display-knoppen)
      document.querySelectorAll(".sleep-quality-display").forEach(btn => {
        btn.textContent = this.data.sleepQuality;
      });
      document.querySelectorAll(".energy-level-display").forEach(btn => {
        btn.textContent = this.data.energyLevel;
      });
  
      document.querySelector("textarea").value = this.data.notes;
      this.updateSelectedDayUI(this.data.selectedDay);
      this.updateChart();
    }
  
    initEventListeners() {
      // Emoji knoppen in scherm 1
      document.querySelectorAll(".options button").forEach(button => {
        button.addEventListener("click", (event) => {
          const category = event.target.parentElement.previousElementSibling.textContent;
          const emoji = event.target.textContent;
  
          if (category.includes("Sleep quality")) {
            this.data.sleepQuality = emoji;
            document.querySelectorAll(".sleep-quality-display").forEach(btn => {
              btn.textContent = emoji;
            });
          } else if (category.includes("Energy levels")) {
            this.data.energyLevel = emoji;
            document.querySelectorAll(".energy-level-display").forEach(btn => {
              btn.textContent = emoji;
            });
          }
  
          this.saveData();
          this.updateChart();
        });
      });
  
      // Slaaptijden aanpassen
      document.querySelector(".night-sleep-input").addEventListener("input", (e) => {
        this.data.nightSleep = e.target.value;
        this.saveData();
        this.updateChart();
      });
  
      document.querySelector(".day-sleep-input").addEventListener("input", (e) => {
        this.data.daySleep = e.target.value;
        this.saveData();
        this.updateChart();
      });
  
      // Save button
      document.querySelector(".save-btn").addEventListener("click", () => {
        this.data.notes = document.querySelector("textarea").value;
        this.saveData();
        alert("Data opgeslagen!");
      });
  
      // Kalender dagen aanklikken
      document.querySelectorAll(".date").forEach(date => {
        date.addEventListener("click", (e) => {
          const selectedDay = e.target.dataset.day;
          this.data.selectedDay = selectedDay;
          this.saveData();
          this.updateSelectedDayUI(selectedDay);
        });
      });
    }
  
    updateSelectedDayUI(selectedDay) {
      document.querySelectorAll(".date").forEach(d => d.classList.remove("selected"));
      const activeDate = document.querySelector(`.date[data-day='${selectedDay}']`);
      if (activeDate) activeDate.classList.add("selected");
    }
  
    updateChart() {
      const ctx = document.getElementById("sleepChart").getContext("2d");
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Night Sleep', 'Day Sleep'],
          datasets: [{
            label: 'Uren',
            data: [
              parseFloat(this.data.nightSleep) || 0,
              parseFloat(this.data.daySleep) || 0
            ],
            backgroundColor: ['#6C63FF', '#FFD166']
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }
  
  // Start SleepTracker
  document.addEventListener("DOMContentLoaded", () => new SleepTracker());
  