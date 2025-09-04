export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

export const validationService = {
  // Validate question data
  validateQuestion(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Title validation
    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required')
    } else if (data.title.trim().length < 10) {
      errors.push('Title must be at least 10 characters long')
    } else if (data.title.trim().length > 500) {
      errors.push('Title must be less than 500 characters')
    }

    // Content validation
    if (!data.content || typeof data.content !== 'string') {
      errors.push('Question content is required')
    } else if (data.content.trim().length < 20) {
      errors.push('Question content must be at least 20 characters long')
    } else if (data.content.trim().length > 5000) {
      errors.push('Question content must be less than 5000 characters')
    }

    // Tags validation
    if (!data.tags || !Array.isArray(data.tags)) {
      errors.push('Tags are required')
    } else if (data.tags.length === 0) {
      errors.push('At least one tag is required')
    } else if (data.tags.length > 5) {
      errors.push('Maximum 5 tags allowed')
    } else {
      data.tags.forEach((tag: string, index: number) => {
        if (!tag || typeof tag !== 'string') {
          errors.push(`Tag ${index + 1} is invalid`)
        } else if (tag.trim().length < 2) {
          errors.push(`Tag ${index + 1} must be at least 2 characters`)
        } else if (tag.trim().length > 20) {
          errors.push(`Tag ${index + 1} must be less than 20 characters`)
        } else if (!/^[a-zA-Z0-9-_]+$/.test(tag.trim())) {
          errors.push(`Tag ${index + 1} contains invalid characters`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate question update data
  validateQuestionUpdate(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Only validate fields that are being updated
    if (data.title !== undefined) {
      if (typeof data.title !== 'string') {
        errors.push('Title must be a string')
      } else if (data.title.trim().length < 10) {
        errors.push('Title must be at least 10 characters long')
      } else if (data.title.trim().length > 500) {
        errors.push('Title must be less than 500 characters')
      }
    }

    if (data.content !== undefined) {
      if (typeof data.content !== 'string') {
        errors.push('Content must be a string')
      } else if (data.content.trim().length < 20) {
        errors.push('Content must be at least 20 characters long')
      } else if (data.content.trim().length > 5000) {
        errors.push('Content must be less than 5000 characters')
      }
    }

    if (data.tags !== undefined) {
      if (!Array.isArray(data.tags)) {
        errors.push('Tags must be an array')
      } else if (data.tags.length === 0) {
        errors.push('At least one tag is required')
      } else if (data.tags.length > 5) {
        errors.push('Maximum 5 tags allowed')
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate answer data
  validateAnswer(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Content validation
    if (!data.content || typeof data.content !== 'string') {
      errors.push('Answer content is required')
    } else if (data.content.trim().length < 10) {
      errors.push('Answer content must be at least 10 characters long')
    } else if (data.content.trim().length > 10000) {
      errors.push('Answer content must be less than 10000 characters')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate prototype data
  validatePrototype(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Title validation
    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required')
    } else if (data.title.trim().length < 5) {
      errors.push('Title must be at least 5 characters long')
    } else if (data.title.trim().length > 200) {
      errors.push('Title must be less than 200 characters')
    }

    // Description validation
    if (!data.description || typeof data.description !== 'string') {
      errors.push('Description is required')
    } else if (data.description.trim().length < 20) {
      errors.push('Description must be at least 20 characters long')
    } else if (data.description.trim().length > 2000) {
      errors.push('Description must be less than 2000 characters')
    }

    // GitHub Pages URL validation
    if (!data.githubPagesUrl || typeof data.githubPagesUrl !== 'string') {
      errors.push('GitHub Pages URL is required')
    } else if (!this.isValidUrl(data.githubPagesUrl)) {
      errors.push('GitHub Pages URL must be a valid URL')
    } else if (!data.githubPagesUrl.includes('github.io')) {
      warnings.push('URL should be a GitHub Pages URL (github.io)')
    }

    // GitHub Repo URL validation (optional)
    if (data.githubRepoUrl && typeof data.githubRepoUrl === 'string') {
      if (!this.isValidUrl(data.githubRepoUrl)) {
        errors.push('GitHub Repository URL must be a valid URL')
      } else if (!data.githubRepoUrl.includes('github.com')) {
        warnings.push('Repository URL should be a GitHub URL')
      }
    }

    // Technologies validation
    if (data.technologies && Array.isArray(data.technologies)) {
      if (data.technologies.length > 10) {
        errors.push('Maximum 10 technologies allowed')
      } else {
        data.technologies.forEach((tech: string, index: number) => {
          if (!tech || typeof tech !== 'string') {
            errors.push(`Technology ${index + 1} is invalid`)
          } else if (tech.trim().length < 2) {
            errors.push(`Technology ${index + 1} must be at least 2 characters`)
          } else if (tech.trim().length > 50) {
            errors.push(`Technology ${index + 1} must be less than 50 characters`)
          }
        })
      }
    }

    // Tags validation
    if (data.tags && Array.isArray(data.tags)) {
      if (data.tags.length > 8) {
        errors.push('Maximum 8 tags allowed')
      } else {
        data.tags.forEach((tag: string, index: number) => {
          if (!tag || typeof tag !== 'string') {
            errors.push(`Tag ${index + 1} is invalid`)
          } else if (tag.trim().length < 2) {
            errors.push(`Tag ${index + 1} must be at least 2 characters`)
          } else if (tag.trim().length > 20) {
            errors.push(`Tag ${index + 1} must be less than 20 characters`)
          }
        })
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate prototype update data
  validatePrototypeUpdate(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Only validate fields that are being updated
    if (data.title !== undefined) {
      if (typeof data.title !== 'string') {
        errors.push('Title must be a string')
      } else if (data.title.trim().length < 5) {
        errors.push('Title must be at least 5 characters long')
      } else if (data.title.trim().length > 200) {
        errors.push('Title must be less than 200 characters')
      }
    }

    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        errors.push('Description must be a string')
      } else if (data.description.trim().length < 20) {
        errors.push('Description must be at least 20 characters long')
      } else if (data.description.trim().length > 2000) {
        errors.push('Description must be less than 2000 characters')
      }
    }

    if (data.githubPagesUrl !== undefined) {
      if (typeof data.githubPagesUrl !== 'string') {
        errors.push('GitHub Pages URL must be a string')
      } else if (!this.isValidUrl(data.githubPagesUrl)) {
        errors.push('GitHub Pages URL must be a valid URL')
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate user data
  validateUser(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Name validation
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Name is required')
    } else if (data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    } else if (data.name.trim().length > 100) {
      errors.push('Name must be less than 100 characters')
    }

    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push('Email is required')
    } else if (!this.isValidEmail(data.email)) {
      errors.push('Email must be a valid email address')
    }

    // Avatar validation (optional)
    if (data.avatar && typeof data.avatar !== 'string') {
      errors.push('Avatar must be a string')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate user update data
  validateUserUpdate(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Only validate fields that are being updated
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        errors.push('Name must be a string')
      } else if (data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long')
      } else if (data.name.trim().length > 100) {
        errors.push('Name must be less than 100 characters')
      }
    }

    if (data.email !== undefined) {
      if (typeof data.email !== 'string') {
        errors.push('Email must be a string')
      } else if (!this.isValidEmail(data.email)) {
        errors.push('Email must be a valid email address')
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate report data
  validateReport(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Content type validation
    if (!data.contentType || typeof data.contentType !== 'string') {
      errors.push('Content type is required')
    } else if (!['question', 'answer', 'prototype', 'user'].includes(data.contentType)) {
      errors.push('Content type must be question, answer, prototype, or user')
    }

    // Content ID validation
    if (!data.contentId || typeof data.contentId !== 'string') {
      errors.push('Content ID is required')
    }

    // Reason validation
    if (!data.reason || typeof data.reason !== 'string') {
      errors.push('Reason is required')
    } else if (data.reason.trim().length < 10) {
      errors.push('Reason must be at least 10 characters long')
    } else if (data.reason.trim().length > 500) {
      errors.push('Reason must be less than 500 characters')
    }

    // Description validation (optional)
    if (data.description && typeof data.description !== 'string') {
      errors.push('Description must be a string')
    } else if (data.description && data.description.trim().length > 1000) {
      errors.push('Description must be less than 1000 characters')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate report update data
  validateReportUpdate(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Status validation
    if (data.status !== undefined) {
      if (typeof data.status !== 'string') {
        errors.push('Status must be a string')
      } else if (!['pending', 'resolved', 'dismissed'].includes(data.status)) {
        errors.push('Status must be pending, resolved, or dismissed')
      }
    }

    // Description validation (optional)
    if (data.description && typeof data.description !== 'string') {
      errors.push('Description must be a string')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Validate analytics event data
  validateAnalyticsEvent(data: any): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Event type validation
    if (!data.eventType || typeof data.eventType !== 'string') {
      errors.push('Event type is required')
    } else if (data.eventType.trim().length < 3) {
      errors.push('Event type must be at least 3 characters long')
    } else if (data.eventType.trim().length > 100) {
      errors.push('Event type must be less than 100 characters')
    }

    // Event data validation (optional)
    if (data.eventData && typeof data.eventData !== 'object') {
      errors.push('Event data must be an object')
    }

    // Session ID validation (optional)
    if (data.sessionId && typeof data.sessionId !== 'string') {
      errors.push('Session ID must be a string')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  },

  // Helper methods
  isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
} 