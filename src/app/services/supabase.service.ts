import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private router: Router
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.loadUser();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session.user);
      }
    });
  }

  async loadUser() {
    const user = await this.supabase.auth.user();
 
    if (user) {
      this._currentUser.next(user);
    }
  }

  get currentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }

  async signUp(credentials: { email, password }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials)
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  signIn(credentials: { email, password }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signIn(credentials)
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }
 
  signOut() {
    this.supabase.auth.signOut().then(_ => {
      // Clear up and end all active subscriptions!
      this.supabase.getSubscriptions().map(sub => {
        this.supabase.removeSubscription(sub);
      });
      
      this.router.navigateByUrl('/');
    });
  }
}
