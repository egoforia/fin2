import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  public client: SupabaseClient;
  private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private router: Router
  ) {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.loadUser();

    this.client.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session.user);
      }
    });
  }

  async loadUser() {
    const user = await this.client.auth.user();
 
    if (user) {
      this._currentUser.next(user);
    }
  }

  get currentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }

  async signUp(credentials: { email, password }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.client.auth.signUp(credentials)
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  signIn(credentials: { email, password }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.client.auth.signIn(credentials)
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }
 
  signOut() {
    this.client.auth.signOut().then(_ => {
      // Clear up and end all active subscriptions!
      this.client.getSubscriptions().map(sub => {
        this.client.removeSubscription(sub);
      });
      
      this.router.navigateByUrl('/');
    });
  }
}
