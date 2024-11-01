const hamburger = document.querySelector('[data-menu]');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
});

const form = document.querySelector('.form-container');

const inputs = document.querySelectorAll('[data-validate]'); 

inputs.forEach(input => {
    input.addEventListener('input', () => {
        switch (input.id) {
            case 'firstName':
            case 'lastName':
                validateNameField.call(input);
                break;
            case 'email':
                validateEmail();
                break;
            case 'phoneNumber':
                validatePhone();
                break;
            case 'password':
                validatePassword();
                break;
        }
    });
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isValid = validateForm(); 
    
    if (isValid) {
        const formData = new FormData(form);

        let logOutput = "";

        for (const [name, value] of formData.entries()) {
            logOutput += `${name}: ${value}\n`;
        }

        console.log(logOutput);

        const successMessage = document.getElementById('successMessage'); 
          
        successMessage.classList.add('visible');

        form.reset();

        setTimeout(() => {
            successMessage.style.visibility = 'hidden';
        }, 3000); 
    }
});


// validating each input 

function validateNameField() {
    const nameInput = this; 
    const nameFeedback = document.getElementById(nameInput.id + 'Feedback'); 
        if (!nameInput.value.trim()) {
        nameFeedback.textContent = nameInput.placeholder + ' is required.'; 
        nameInput.classList.add('invalid');
    } else
    {
        nameFeedback.textContent = '';
        nameInput.classList.remove('invalid');
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('emailFeedback');
    if (!emailInput.validity.valid) {
        emailFeedback.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('invalid');
    } else {
        emailFeedback.textContent = '';
        emailInput.classList.remove('invalid');
    }
}

function validatePhone() {
    const phoneInput = document.getElementById('phoneNumber');
    const phoneFeedback = document.getElementById('phoneFeedback');
    const phonePattern = /^[6-9]\d{9}$/; 
    if (!phonePattern.test(phoneInput.value)) {
        phoneFeedback.textContent = 'Please enter a valid Indian phone number';
        phoneInput.classList.add('invalid');
    } else {
        phoneFeedback.textContent = '';
        phoneInput.classList.remove('invalid');
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordFeedback = document.getElementById('passwordFeedback');
    if (passwordInput.value.length < 8) {
        passwordFeedback.textContent = 'Password must be at least 8 characters long.';
        passwordInput.classList.add('invalid');
    } else {
        passwordFeedback.textContent = '';
        passwordInput.classList.remove('invalid');
    }
}

// Final form validation function
function validateForm() {
    validateNameField.call(document.getElementById('firstName')); 
    validateNameField.call(document.getElementById('lastName')); 
    validateEmail();
    validatePhone();
    validatePassword();

    const invalidInputs = document.querySelectorAll('.invalid');
    return invalidInputs.length === 0;
}
