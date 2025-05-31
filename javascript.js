class SleepTracker {
    constructor() {
      this.data = this.loadData();
      this.initEventListeners();
      this.updateUI();
    }
  
    loadData() {
      return JSON.parse(localStorage.getItem("sleepData")) || {};
    }
  
    saveData() {
      localStorage.setItem("sleepData", JSON.stringify(this.data));
    }
  
    updateUI() {
      const dag = this.data.selectedDay || "1";
      const dagData = this.data[dag] || {
        nightSleep: "7.5",
        daySleep: "2.5",
        sleepQuality: "😐",
        energyLevel: "🙂",
        notes: ""
      };
  
      document.querySelector(".night-sleep-input").value = dagData.nightSleep;
      document.querySelector(".day-sleep-input").value = dagData.daySleep;
      document.querySelector(".selection:nth-of-type(1) button").textContent = dagData.sleepQuality;
      document.querySelector(".selection:nth-of-type(2) button").textContent = dagData.energyLevel;
      document.querySelector("textarea").value = dagData.notes;
      this.updateSelectedDayUI(dag);
      this.updateChart(dagData);
    }
  
    initEventListeners() {
      document.querySelectorAll(".options button").forEach(button => {
        button.addEventListener("click", (event) => {
          const category = event.target.parentElement.previousElementSibling.textContent;
          const dag = this.data.selectedDay || "1";
          if (!this.data[dag]) this.data[dag] = {};
  
          if (category.includes("Sleep quality")) {
            this.data[dag].sleepQuality = event.target.textContent;
          } else if (category.includes("Energy levels")) {
            this.data[dag].energyLevel = event.target.textContent;
          }
          this.saveData();
          this.updateUI();
        });
      });
  
      document.querySelector(".night-sleep-input").addEventListener("input", (e) => {
        const dag = this.data.selectedDay || "1";
        if (!this.data[dag]) this.data[dag] = {};
        this.data[dag].nightSleep = e.target.value;
        this.saveData();
        this.updateChart(this.data[dag]);
      });
  
      document.querySelector(".day-sleep-input").addEventListener("input", (e) => {
        const dag = this.data.selectedDay || "1";
        if (!this.data[dag]) this.data[dag] = {};
        this.data[dag].daySleep = e.target.value;
        this.saveData();
        this.updateChart(this.data[dag]);
      });
  
      document.querySelector(".save-btn").addEventListener("click", () => {
        const dag = this.data.selectedDay || "1";
        if (!this.data[dag]) this.data[dag] = {};
        this.data[dag].notes = document.querySelector("textarea").value;
        this.saveData();
        alert("Data opgeslagen!");
      });
  
      document.querySelectorAll(".date").forEach(date => {
        date.addEventListener("click", (e) => {
          const selectedDay = e.target.dataset.day;
          this.data.selectedDay = selectedDay;
          this.saveData();
          this.updateSelectedDayUI(selectedDay);
          this.updateUI();
        });
      });
    }
  
    updateSelectedDayUI(selectedDay) {
      document.querySelectorAll(".date").forEach(d => {
        d.classList.remove("selected");
      });
      const activeDate = document.querySelector(`.date[data-day='${selectedDay}']`);
      if (activeDate) {
        activeDate.classList.add("selected");
      }
    }
  
    updateChart(dagData) {
      const ctx = document.getElementById("sleepChart").getContext("2d");
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Night Sleep', 'Day Sleep'],
          datasets: [{
            label: 'Hours',
            data: [
              parseFloat(dagData.nightSleep) || 0,
              parseFloat(dagData.daySleep) || 0
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
  
  document.addEventListener("DOMContentLoaded", () => new SleepTracker());
  