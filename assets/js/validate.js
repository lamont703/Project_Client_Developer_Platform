/* /assets/js/validate.js */

// ===== VALIDATION RULES =====
const ValidationRules = {
    required: {
        validate: (value) => value && value.toString().trim().length > 0,
        message: 'This field is required'
    },
    
    email: {
        validate: (value) => {
            if (!value) return true; // Allow empty unless required
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: 'Please enter a valid email address'
    },
    
    minLength: (length) => ({
        validate: (value) => !value || value.length >= length,
        message: `Must be at least ${length} characters long`
    }),
    
    maxLength: (length) => ({
        validate: (value) => !value || value.length <= length,
        message: `Must be no more than ${length} characters long`
    }),
    
    min: (minValue) => ({
        validate: (value) => !value || parseFloat(value) >= minValue,
        message: `Must be at least ${minValue}`
    }),
    
    max: (maxValue) => ({
        validate: (value) => !value || parseFloat(value) <= maxValue,
        message: `Must be no more than ${maxValue}`
    }),
    
    pattern: (regex, message = 'Invalid format') => ({
        validate: (value) => !value || regex.test(value),
        message
    }),
    
    url: {
        validate: (value) => {
            if (!value) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },
        message: 'Please enter a valid URL'
    },
    
    phone: {
        validate: (value) => {
            if (!value) return true;
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
        },
        message: 'Please enter a valid phone number'
    },
    
    match: (fieldName) => ({
        validate: (value, form) => {
            const matchField = form.querySelector(`[name="${fieldName}"]`);
            return !value || !matchField || value === matchField.value;
        },
        message: `Must match ${fieldName}`
    }),
    
    custom: (validateFn, message) => ({
        validate: validateFn,
        message
    })
};

// ===== FORM VALIDATOR CLASS =====
class FormValidator {
    constructor(form, rules = {}, options = {}) {
        this.form = typeof form === 'string' ? document.querySelector(form) : form;
        this.rules = rules;
        this.options = {
            validateOnBlur: true,
            validateOnInput: false,
            showErrors: true,
            scrollToError: true,
            errorClass: 'error',
            ...options
        };
        
        this.errors = {};
        this.isValid = false;
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.setupAriaAttributes();
    }

    bindEvents() {
        // Validate on form submit
        this.form.addEventListener('submit', (e) => {
            if (!this.validate()) {
                e.preventDefault();
                this.handleValidationError();
            }
        });

        // Validate individual fields
        Object.keys(this.rules).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;

            if (this.options.validateOnBlur) {
                field.addEventListener('blur', () => {
                    this.validateField(fieldName);
                });
            }

            if (this.options.validateOnInput) {
                field.addEventListener('input', debounce(() => {
                    this.validateField(fieldName);
                }, 300));
            }

            // Clear errors on focus
            field.addEventListener('focus', () => {
                this.clearFieldError(fieldName);
            });
        });
    }

    setupAriaAttributes() {
        Object.keys(this.rules).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.setAttribute('aria-describedby', `${fieldName}-error`);
            }
        });
    }

    validate() {
        this.errors = {};
        this.isValid = true;

        Object.keys(this.rules).forEach(fieldName => {
            this.validateField(fieldName, false);
        });

        if (this.options.showErrors) {
            this.displayErrors();
        }

        return this.isValid;
    }

    validateField(fieldName, showError = true) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return true;

        const fieldRules = this.rules[fieldName];
        const value = this.getFieldValue(field);
        
        // Clear previous error
        delete this.errors[fieldName];

        // Validate each rule
        for (const rule of fieldRules) {
            const ruleConfig = typeof rule === 'string' ? ValidationRules[rule] : rule;
            
            if (!ruleConfig) {
                console.warn(`Unknown validation rule: ${rule}`);
                continue;
            }

            const isValid = ruleConfig.validate(value, this.form);
            
            if (!isValid) {
                this.errors[fieldName] = ruleConfig.message;
                this.isValid = false;
                break;
            }
        }

        if (showError && this.options.showErrors) {
            if (this.errors[fieldName]) {
                this.showFieldError(fieldName, this.errors[fieldName]);
            } else {
                this.clearFieldError(fieldName);
            }
        }

        return !this.errors[fieldName];
    }

    getFieldValue(field) {
        if (field.type === 'checkbox') {
            return field.checked;
        } else if (field.type === 'radio') {
            const checkedRadio = this.form.querySelector(`[name="${field.name}"]:checked`);
            return checkedRadio ? checkedRadio.value : '';
        } else if (field.tagName === 'SELECT' && field.multiple) {
            return Array.from(field.selectedOptions).map(option => option.value);
        } else {
            return field.value;
        }
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Add error class to field
        field.classList.add(this.options.errorClass);

        // Create or update error message
        let errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = `${fieldName}-error`;
            errorElement.className = 'form-error';
            errorElement.setAttribute('role', 'alert');
            
            // Insert after field or field wrapper
            const wrapper = field.closest('.form-group') || field.parentNode;
            wrapper.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Remove error class
        field.classList.remove(this.options.errorClass);

        // Hide error message
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    displayErrors() {
        Object.keys(this.errors).forEach(fieldName => {
            this.showFieldError(fieldName, this.errors[fieldName]);
        });
    }

    clearAllErrors() {
        Object.keys(this.rules).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
        this.errors = {};
    }

    handleValidationError() {
        if (this.options.scrollToError) {
            const firstErrorField = this.form.querySelector(`.${this.options.errorClass}`);
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstErrorField.focus();
            }
        }

        // Trigger custom event
        this.form.dispatchEvent(new CustomEvent('validationerror', {
            detail: { errors: this.errors }
        }));
    }

    addRule(fieldName, rule) {
        if (!this.rules[fieldName]) {
            this.rules[fieldName] = [];
        }
        this.rules[fieldName].push(rule);
    }

    removeRule(fieldName, ruleIndex) {
        if (this.rules[fieldName] && this.rules[fieldName][ruleIndex]) {
            this.rules[fieldName].splice(ruleIndex, 1);
        }
    }

    getErrors() {
        return { ...this.errors };
    }

    isFieldValid(fieldName) {
        return !this.errors[fieldName];
    }

    reset() {
        this.clearAllErrors();
        this.form.reset();
        this.errors = {};
        this.isValid = false;
    }
}

// ===== FIELD VALIDATORS =====
class FieldValidators {
    static createPasswordValidator(fieldName, options = {}) {
        const config = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: false,
            ...options
        };

        const rules = [
            ValidationRules.required,
            ValidationRules.minLength(config.minLength)
        ];

        if (config.requireUppercase) {
            rules.push(ValidationRules.pattern(
                /[A-Z]/, 
                'Must contain at least one uppercase letter'
            ));
        }

        if (config.requireLowercase) {
            rules.push(ValidationRules.pattern(
                /[a-z]/, 
                'Must contain at least one lowercase letter'
            ));
        }

        if (config.requireNumbers) {
            rules.push(ValidationRules.pattern(
                /\d/, 
                'Must contain at least one number'
            ));
        }

        if (config.requireSpecialChars) {
            rules.push(ValidationRules.pattern(
                /[!@#$%^&*(),.?":{}|<>]/, 
                'Must contain at least one special character'
            ));
        }

        return rules;
    }

    static createCreditCardValidator() {
        return [
            ValidationRules.required,
            ValidationRules.pattern(
                /^[0-9]{13,19}$/,
                'Please enter a valid credit card number'
            ),
            ValidationRules.custom(
                (value) => {
                    // Luhn algorithm for credit card validation
                    if (!value) return false;
                    
                    const digits = value.replace(/\D/g, '');
                    let sum = 0;
                    let isEven = false;
                    
                    for (let i = digits.length - 1; i >= 0; i--) {
                        let digit = parseInt(digits[i]);
                        
                        if (isEven) {
                            digit *= 2;
                            if (digit > 9) {
                                digit -= 9;
                            }
                        }
                        
                        sum += digit;
                        isEven = !isEven;
                    }
                    
                    return sum % 10 === 0;
                },
                'Please enter a valid credit card number'
            )
        ];
    }

    static createFileValidator(options = {}) {
        const config = {
            maxSize: 5 * 1024 * 1024, // 5MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
            ...options
        };

        return [
            ValidationRules.custom(
                (files) => {
                    if (!files || files.length === 0) return true;
                    
                    for (const file of files) {
                        if (file.size > config.maxSize) {
                            return false;
                        }
                    }
                    return true;
                },
                `File size must be less than ${Math.round(config.maxSize / 1024 / 1024)}MB`
            ),
            ValidationRules.custom(
                (files) => {
                    if (!files || files.length === 0) return true;
                    
                    for (const file of files) {
                        if (!config.allowedTypes.includes(file.type)) {
                            return false;
                        }
                    }
                    return true;
                },
                `Only ${config.allowedTypes.join(', ')} files are allowed`
            )
        ];
    }
}

// ===== FORM BUILDER HELPER =====
class FormBuilder {
    static createJobPostForm() {
        return {
            title: [
                ValidationRules.required,
                ValidationRules.minLength(5),
                ValidationRules.maxLength(100)
            ],
            description: [
                ValidationRules.required,
                ValidationRules.minLength(50),
                ValidationRules.maxLength(2000)
            ],
            category: [ValidationRules.required],
            type: [ValidationRules.required],
            budget_min: [
                ValidationRules.required,
                ValidationRules.min(1)
            ],
            budget_max: [
                ValidationRules.required,
                ValidationRules.min(1),
                ValidationRules.custom(
                    (value, form) => {
                        const minBudget = form.querySelector('[name="budget_min"]').value;
                        return !value || !minBudget || parseFloat(value) >= parseFloat(minBudget);
                    },
                    'Maximum budget must be greater than minimum budget'
                )
            ],
            skills: [ValidationRules.required],
            deadline: [
                ValidationRules.required,
                ValidationRules.custom(
                    (value) => {
                        if (!value) return false;
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selectedDate >= today;
                    },
                    'Deadline must be in the future'
                )
            ]
        };
    }

    static createRegistrationForm() {
        return {
            name: [
                ValidationRules.required,
                ValidationRules.minLength(2),
                ValidationRules.maxLength(50)
            ],
            email: [
                ValidationRules.required,
                ValidationRules.email
            ],
            password: FieldValidators.createPasswordValidator('password'),
            confirm_password: [
                ValidationRules.required,
                ValidationRules.match('password')
            ],
            terms: [
                ValidationRules.custom(
                    (value) => value === true,
                    'You must accept the terms and conditions'
                )
            ]
        };
    }

    static createProfileForm() {
        return {
            name: [
                ValidationRules.required,
                ValidationRules.minLength(2),
                ValidationRules.maxLength(50)
            ],
            title: [
                ValidationRules.required,
                ValidationRules.maxLength(100)
            ],
            bio: [
                ValidationRules.required,
                ValidationRules.minLength(50),
                ValidationRules.maxLength(500)
            ],
            hourly_rate: [
                ValidationRules.required,
                ValidationRules.min(1),
                ValidationRules.max(1000)
            ],
            website: [ValidationRules.url],
            github: [ValidationRules.url],
            linkedin: [ValidationRules.url]
        };
    }
}

// ===== REAL-TIME VALIDATION HELPERS =====
class ValidationHelpers {
    static addPasswordStrengthIndicator(passwordField) {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        indicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill"></div>
            </div>
            <div class="strength-text">Password strength: <span class="strength-level">Weak</span></div>
        `;
        
        passwordField.parentNode.appendChild(indicator);
        
        passwordField.addEventListener('input', () => {
            const strength = this.calculatePasswordStrength(passwordField.value);
            this.updateStrengthIndicator(indicator, strength);
        });
    }

    static calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        
        return {
            score,
            level: score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong',
            percentage: (score / 6) * 100
        };
    }

    static updateStrengthIndicator(indicator, strength) {
        const fill = indicator.querySelector('.strength-fill');
        const text = indicator.querySelector('.strength-level');
        
        fill.style.width = `${strength.percentage}%`;
        fill.className = `strength-fill strength-${strength.level}`;
        text.textContent = strength.level.charAt(0).toUpperCase() + strength.level.slice(1);
    }

    static addCharacterCounter(field, maxLength) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        field.parentNode.appendChild(counter);
        
        const updateCounter = () => {
            const remaining = maxLength - field.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.classList.toggle('warning', remaining < 20);
            counter.classList.toggle('error', remaining < 0);
        };
        
        field.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ValidationRules,
        FormValidator,
        FieldValidators,
        FormBuilder,
        ValidationHelpers
    };
} 