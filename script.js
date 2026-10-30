function calculatePerformance() {

    // Get input values
    const location = document.getElementById("location").value.trim();
    const capacity = Number(document.getElementById("capacity").value);
    const expected = Number(document.getElementById("expected").value);
    const actual = Number(document.getElementById("actual").value);
    const tariff = Number(document.getElementById("tariff").value);
    const issue = document.getElementById("issue").value;

    // Validate inputs
    if (
        !Number.isFinite(capacity) || capacity <= 0 ||
        !Number.isFinite(expected) || expected <= 0 ||
        !Number.isFinite(actual) || actual < 0 ||
        !Number.isFinite(tariff) || tariff < 0
    ) {
        alert("Please enter valid solar details. Expected generation and capacity must be greater than zero.");
        return;
    }

    if (actual > expected * 2) {
        alert("Please verify your actual generation value. It is unusually high compared with expected generation.");
        return;
    }

    // Calculations
    const gap = Math.max(0, expected - actual);
    const efficiency = (actual / expected) * 100;
    const dailyLoss = gap * tariff;
    const monthlyLoss = dailyLoss * 30;
    const yearlyLoss = dailyLoss * 365;

    const percentage = efficiency.toFixed(1);

    // Update result cards
    document.getElementById("expectedResult").textContent =
        expected.toFixed(1);

    document.getElementById("actualResult").textContent =
        actual.toFixed(1);

    document.getElementById("gapResult").textContent =
        gap.toFixed(1);

    document.getElementById("lossResult").textContent =
        "₹" + dailyLoss.toFixed(2);

    // Update financial report
    document.getElementById("dailyLoss").textContent =
        "₹" + dailyLoss.toFixed(2);

    document.getElementById("monthlyLoss").textContent =
        "₹" + monthlyLoss.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById("yearlyLoss").textContent =
        "₹" + yearlyLoss.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    // Update performance meter
    document.getElementById("percentage").textContent =
        percentage + "%";

    const meterValue = Math.min(100, efficiency);

    document.getElementById("meterCircle").style.background =
        `conic-gradient(#20ad7c 0% ${meterValue}%,
        #e6eee9 ${meterValue}% 100%)`;

    // Performance status
    const status = document.getElementById("performanceStatus");
    const message = document.getElementById("performanceMessage");

    if (efficiency >= 90) {
        status.textContent = "Excellent Performance";
        status.style.color = "#12835f";
        message.textContent =
            "Your solar system is generating close to its expected output.";
    }
    else if (efficiency >= 75) {
        status.textContent = "Moderate Performance";
        status.style.color = "#c47b1d";
        message.textContent =
            "Your solar system has a generation gap. Monitor its performance.";
    }
    else {
        status.textContent = "Performance Needs Attention";
        status.style.color = "#d35454";
        message.textContent =
            "Your solar system is generating significantly below expected output.";
    }

    // Update comparison bars
    document.getElementById("expectedBarLabel").textContent =
        expected.toFixed(1) + " kWh";

    document.getElementById("actualBarLabel").textContent =
        actual.toFixed(1) + " kWh";

    document.getElementById("gapBarLabel").textContent =
        gap.toFixed(1) + " kWh";

    document.getElementById("expectedBar").style.width = "100%";

    document.getElementById("actualBar").style.width =
        Math.min(100, (actual / expected) * 100) + "%";

    document.getElementById("gapBar").style.width =
        (gap / expected) * 100 + "%";

    // Location display in report heading
    const heading = document.querySelector(".section-heading h2");

    heading.textContent = location
        ? "Performance Overview – " + location
        : "Performance Overview";

    // Recommendations based on user selection
    const issueTitle = document.getElementById("issueTitle");
    const issueMessage = document.getElementById("issueMessage");
    const recommendations =
        document.getElementById("recommendations");

    const advice = {
        none: {
            title: "General Performance Inspection",
            message: "The exact cause cannot be determined from generation values alone.",
            actions: [
                "Check the solar inverter for warning indicators.",
                "Inspect the panels for dust or shading.",
                "Compare readings over several days.",
                "Contact a qualified solar technician if the gap continues."
            ]
        },

        dust: {
            title: "Possible Dust Accumulation",
            message: "Dust or dirt may reduce the amount of sunlight reaching the panels.",
            actions: [
                "Inspect the panel surface.",
                "Arrange safe panel cleaning.",
                "Compare generation before and after cleaning."
            ]
        },

        shade: {
            title: "Possible Shading Problem",
            message: "Trees, buildings or other objects may block sunlight.",
            actions: [
                "Inspect the rooftop for shadows.",
                "Check panel placement.",
                "Consult a solar technician about shading."
            ]
        },

        heat: {
            title: "Possible High Temperature Effect",
            message: "High panel temperatures can reduce solar panel efficiency.",
            actions: [
                "Monitor panel temperature if sensors are available.",
                "Check ventilation and installation conditions.",
                "Consult an installer for technical inspection."
            ]
        },

        inverter: {
            title: "Possible Inverter Issue",
            message: "Inverter downtime or faults may interrupt electricity generation.",
            actions: [
                "Check inverter status and error indicators.",
                "Review inverter generation logs.",
                "Contact an authorized service technician."
            ]
        },

        damage: {
            title: "Possible Panel Damage",
            message: "Physical damage may affect solar panel output.",
            actions: [
                "Visually inspect panels from a safe location.",
                "Do not touch damaged electrical equipment.",
                "Arrange professional inspection."
            ]
        }
    };

    const selectedAdvice = advice[issue];

    issueTitle.textContent = selectedAdvice.title;
    issueMessage.textContent = selectedAdvice.message;

    recommendations.innerHTML = "";

    selectedAdvice.actions.forEach(action => {
        const li = document.createElement("li");
        li.textContent = action;
        recommendations.appendChild(li);
    });

    // Show report
    document.getElementById("results").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Automatically calculate using the default demo values
window.addEventListener("DOMContentLoaded", calculatePerformance);