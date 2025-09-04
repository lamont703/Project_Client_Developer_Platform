export interface URLValidationResult {
  isValid: boolean
  message: string
  statusCode?: number
  responseTime?: number
}

export const urlValidationService = {
  // Validate GitHub Pages URL
  async validateGitHubPagesUrl(url: string): Promise<URLValidationResult> {
    try {
      // Basic URL validation
      if (!this.isValidUrl(url)) {
        return {
          isValid: false,
          message: 'Invalid URL format'
        }
      }

      // Check if it's a GitHub Pages URL
      if (!url.includes('github.io')) {
        return {
          isValid: false,
          message: 'URL must be a GitHub Pages URL (github.io)'
        }
      }

      // Test if the URL is accessible
      const startTime = Date.now()
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'ProtoHub-Validator/1.0'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })
      const responseTime = Date.now() - startTime

      if (response.ok) {
        return {
          isValid: true,
          message: 'URL is accessible and valid',
          statusCode: response.status,
          responseTime
        }
      } else if (response.status === 404) {
        return {
          isValid: false,
          message: 'GitHub Pages site not found (404)',
          statusCode: response.status,
          responseTime
        }
      } else {
        return {
          isValid: false,
          message: `URL returned status ${response.status}`,
          statusCode: response.status,
          responseTime
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return {
          isValid: false,
          message: 'URL validation timed out'
        }
      }
      
      return {
        isValid: false,
        message: `URL validation failed: ${error.message}`
      }
    }
  },

  // Validate GitHub Repository URL
  async validateGitHubRepoUrl(url: string): Promise<URLValidationResult> {
    try {
      // Basic URL validation
      if (!this.isValidUrl(url)) {
        return {
          isValid: false,
          message: 'Invalid URL format'
        }
      }

      // Check if it's a GitHub URL
      if (!url.includes('github.com')) {
        return {
          isValid: false,
          message: 'URL must be a GitHub repository URL'
        }
      }

      // Test if the repository exists
      const startTime = Date.now()
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'ProtoHub-Validator/1.0'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })
      const responseTime = Date.now() - startTime

      if (response.ok) {
        return {
          isValid: true,
          message: 'Repository URL is valid',
          statusCode: response.status,
          responseTime
        }
      } else if (response.status === 404) {
        return {
          isValid: false,
          message: 'Repository not found (404)',
          statusCode: response.status,
          responseTime
        }
      } else {
        return {
          isValid: false,
          message: `Repository URL returned status ${response.status}`,
          statusCode: response.status,
          responseTime
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return {
          isValid: false,
          message: 'Repository validation timed out'
        }
      }
      
      return {
        isValid: false,
        message: `Repository validation failed: ${error.message}`
      }
    }
  },

  // Extract GitHub username from GitHub Pages URL
  extractGitHubUsername(url: string): string | null {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      
      // Extract username from github.io URL
      // Format: username.github.io
      const parts = hostname.split('.')
      if (parts.length >= 2 && parts[1] === 'github' && parts[2] === 'io') {
        return parts[0]
      }
      
      return null
    } catch {
      return null
    }
  },

  // Extract repository name from GitHub Pages URL
  extractRepositoryName(url: string): string | null {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      
      // Extract repo name from path
      // Format: /repository-name/
      const pathParts = pathname.split('/').filter(part => part.length > 0)
      if (pathParts.length > 0) {
        return pathParts[0]
      }
      
      return null
    } catch {
      return null
    }
  },

  // Generate GitHub Pages URL from username and repository
  generateGitHubPagesUrl(username: string, repository: string): string {
    return `https://${username}.github.io/${repository}/`
  },

  // Check if URL is a valid GitHub Pages URL
  isGitHubPagesUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.includes('github.io')
    } catch {
      return false
    }
  },

  // Check if URL is a valid GitHub repository URL
  isGitHubRepoUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname === 'github.com'
    } catch {
      return false
    }
  },

  // Validate URL format
  isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // Sanitize URL (remove trailing slashes, normalize)
  sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url)
      // Remove trailing slash from pathname
      urlObj.pathname = urlObj.pathname.replace(/\/$/, '')
      return urlObj.toString()
    } catch {
      return url
    }
  },

  // Get URL metadata (title, description, etc.)
  async getUrlMetadata(url: string): Promise<{
    title?: string
    description?: string
    image?: string
    error?: string
  }> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ProtoHub-Validator/1.0'
        },
        signal: AbortSignal.timeout(15000) // 15 second timeout
      })

      if (!response.ok) {
        return { error: `HTTP ${response.status}` }
      }

      const html = await response.text()
      
      // Extract title
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      const title = titleMatch ? titleMatch[1].trim() : undefined
      
      // Extract meta description
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      const description = descMatch ? descMatch[1].trim() : undefined
      
      // Extract og:image
      const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      const image = imageMatch ? imageMatch[1].trim() : undefined

      return {
        title,
        description,
        image
      }
    } catch (error) {
      return { error: error.message }
    }
  }
} 