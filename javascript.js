class SlaapTracker {
    constructor() {
        this.gegevens = this.laadGegevens();
        console.log("SlaapTracker gestart", this.gegevens);
    }

    laadGegevens() {
        return JSON.parse(localStorage.getItem("slaapGegevens")) || {
            nachtSlaap: "7.5",
            dagSlaap: "2.5",
            slaapKwaliteit: "😐",
            energieNiveau: "🙂",
            notities: ""
        };
    }

    bewaarGegevens() {
        localStorage.setItem("slaapGegevens", JSON.stringify(this.gegevens));
        console.log("Gegevens opgeslagen", this.gegevens);
    }
}

document.addEventListener("DOMContentLoaded", () => new SlaapTracker());
