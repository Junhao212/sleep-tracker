class SleepTracker {
    constructor() {
 
      this.data = this.loadData();
  

      console.log("SleepTracker gestart!");
  

    }
  

    loadData() {
      return JSON.parse(localStorage.getItem("sleepData")) || {
        nightSleep: "7.5",
        daySleep: "2.5",
        sleepQuality: "😐",
        energyLevel: "😴",
        notes: ""
      };
    }
  }
  
 
  document.addEventListener("DOMContentLoaded", () => new SleepTracker());
  
  