// lib/sessionManager.ts
import { Subject, Subscription } from 'rxjs';
import Redis from 'ioredis';

// Define interface for session invalidation event
interface SessionInvalidationEvent {
  sessionId: string;
  timestamp: number;
}

// Create a more robust SessionManager with persistent storage
class SessionManager {
  private invalidationSubject: Subject<SessionInvalidationEvent>;
  private redis: Redis | null;
  private invalidatedSessions: Set<string>;

  constructor() {
    this.invalidationSubject = new Subject<SessionInvalidationEvent>();
    
    // Use Redis for distributed session storage
    // This ensures persistence across server restarts and multiple instances
    this.redis = process.env.REDIS_URL 
      ? new Redis(process.env.REDIS_URL)
      : null;
      
    // Fallback to in-memory storage if Redis isn't configured
    this.invalidatedSessions = new Set<string>();
  }
  
  // Mark a session as invalid
  async invalidateSession(sessionId: string): Promise<void> {
    if (!sessionId) return;
    
    const timestamp = Date.now();
    
    if (this.redis) {
      // Store in Redis with a TTL (e.g., 30 days to match session lifetime)
      await this.redis.set(`invalidated:${sessionId}`, timestamp.toString(), 'EX', 30 * 24 * 60 * 60);
    } else {
      // Fallback to in-memory storage
      this.invalidatedSessions.add(sessionId);
    }
    
    // Notify subscribers
    this.invalidationSubject.next({ sessionId, timestamp });
  }
  
  // Check if a session is valid
  async isSessionValid(sessionId: string): Promise<boolean> {
    if (!sessionId) return false;
    
    if (this.redis) {
      // Check Redis for the invalidated session
      const result = await this.redis.get(`invalidated:${sessionId}`);
      return result === null; // Session is valid if not found in Redis
    } else {
      // Fallback to in-memory check
      return !this.invalidatedSessions.has(sessionId);
    }
  }
  
  // Subscribe to invalidation events
  onSessionInvalidated(callback: (event: SessionInvalidationEvent) => void): Subscription {
    return this.invalidationSubject.subscribe(callback);
  }
  
  // Force logout a specific user
  async forceLogoutUser(userId: string): Promise<void> {
    if (!userId) return;
    
    if (this.redis) {
      // Store user-level invalidation with a TTL
      await this.redis.set(`user-invalidated:${userId}`, Date.now().toString(), 'EX', 30 * 24 * 60 * 60);
    }
    // Note: For a complete solution, you would need to track which sessions belong to which user
  }
  
  // Check if a user has been force-logged out
  async isUserValid(userId: string): Promise<boolean> {
    if (!userId) return false;
    
    if (this.redis) {
      const result = await this.redis.get(`user-invalidated:${userId}`);
      return result === null;
    }
    return true;
  }
}

// Export the singleton
export const sessionManager = new SessionManager();