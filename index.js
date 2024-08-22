let circles = document.querySelectorAll(".step_circle");
let plans = document.querySelectorAll(".plan");
let options = document.querySelectorAll(".option");

let activeStep = 1;
let activeCircle = 1;

let planStruct = {
    planName: null,
    duration: null,
    planPrice: null,
    addOns: [],
    addOnPrice: []
};

function nextPage() {
    if(activeStep == 1 && !validate()) {
        return;
    }

    if(activeStep == 2 && !document.querySelector(".selected")) {
        return;
    }

    circles[activeCircle-1].classList.remove("active");
    circles[activeCircle-1].classList.add("inactive");

    document.querySelector(`#step_${activeStep}`).style.display = "none";
    activeStep++;
    activeCircle++;
    document.querySelector(`#step_${activeStep}`).style.display = "flex";

    circles[activeCircle-1].classList.remove("inactive");
    circles[activeCircle-1].classList.add("active");
    
    if(activeStep == 4) {
        sumUp();
    }
}

function prevPage() {
    circles[activeCircle-1].classList.remove("active");
    circles[activeCircle-1].classList.add("inactive");

    document.querySelector(`#step_${activeStep}`).style.display = "none";
    activeStep--;
    activeCircle--;
    document.querySelector(`#step_${activeStep}`).style.display = "flex";

    circles[activeCircle-1].classList.remove("inactive");
    circles[activeCircle-1].classList.add("active");
}

function validate() {
    let inputArray = document.querySelectorAll("#step_1 input");
    let validEmail = new RegExp('[a-z0-9]+@example.com');

    if(inputArray[0].value.length) {
        if(validEmail.test(inputArray[1].value)) {
            if(inputArray[2].value.length == 10) {
                return true;
            }
            else {
                alert("Phone number must consist of 10 digits");
            }
        }
        else {
            alert("Valid email format: [Something]@example.com");
        }
    }

    return false;
}

function sumUp() {
    document.querySelector("#checkout #plan b").innerHTML = `${planStruct.planName} (${planStruct.duration}) <span> ${planStruct.planPrice} </span>`;
    document.querySelector("#checkout #add-ons").innerHTML = "";

    let price = Number(planStruct.planPrice.replace(/\D/g, ''));

    if(document.querySelectorAll(".check").length > 0) {
        document.querySelectorAll(".check").forEach((addOn) => {
            document.querySelector("#checkout #add-ons").innerHTML += `<p> ${addOn.querySelector("label").innerHTML} <span> ${addOn.querySelector("#price").innerHTML} </span> </p>`
            price += Number(addOn.querySelector("#price").innerHTML.replace(/\D/g, ''));
        })
    }
    document.querySelector("#total_price span").innerHTML = `+${price}/mo`;
}

function changeDuration() {
    let duration = document.querySelector(".switch input").checked;
    let monthlyPrice = [9, 12, 15];
    let yearlyPrice = [90, 120, 150];
    let addOnMonthlyPrice = [1, 2, 2];
    let addOnYearlyPrice = [10, 20, 20];
    let price = document.querySelectorAll(".plan .info p");
    let info = document.querySelectorAll(".plan .info");
    let addOnPrices = document.querySelectorAll(".add-on_info #price");

    if(document.querySelector(".selected")) {
        document.querySelector(".selected").classList.remove("selected");
    }

    if(duration) {
        for(i = 0; i < 3; i++) {
            price[i].innerHTML = `$${monthlyPrice[i]}/mo`;
            addOnPrices[i].innerHTML = `$${addOnMonthlyPrice[i]}/mo`;
        }
        planStruct.duration = "Monthly";
    } else {
        for(i = 0; i < 3; i++) {
            price[i].innerHTML = `$${yearlyPrice[i]}/yr`;
            addOnPrices[i].innerHTML = `$${addOnYearlyPrice[i]}/mo`;
        }
        planStruct.duration = "Yearly";
    }
}

plans.forEach((plan) => {
    plan.addEventListener("click", () => {
        if(document.querySelector(".selected")) {
            document.querySelector(".selected").classList.remove("selected");
        }
        plan.classList.add("selected");
        planStruct.planName = plan.querySelector(".plan .info b").innerHTML;
        planStruct.planPrice = plan.querySelector(".plan .info p").innerHTML;
    });
});

options.forEach((option) => {
    option.addEventListener("click", () => {
        if(option.querySelector("input").checked) {
            option.classList.add("check");
        } else {
            option.classList.remove("check");
        }
    })
})

change_plan.addEventListener("click", () => {
    prevPage();
    prevPage();
})