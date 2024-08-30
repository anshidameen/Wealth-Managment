import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoalModel } from '../interface/goal-model';
import { map } from 'rxjs/operators';
import { Fund } from '../interface/fund';


@Injectable({
  providedIn: 'root'
})

export class ApiService implements OnInit {

  private token: string | null;
  private userId: string | null;
  private baseUrl = 'http://localhost:8090';
  private goalId: string | null;

  public url2 = "http://localhost:8090";

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getUserId(): string | null {
    return this.userId
  }


  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  setgoalId(goalId: any) {
    this.goalId = goalId;
    localStorage.setItem('userId2', goalId);
  }
  getgoalId(): string | null {
    return this.goalId;
  }

  getAllUsers(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(`${this.baseUrl}/goals/get`);

  }

  goalDurationS(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(`http://localhost:8090/getGoals/${this.userId}/shortTerm`);
  }
  goalDurationM(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(`http://localhost:8090/getGoals/${this.userId}/midTerm`);
  }
  goalDurationL(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(`http://localhost:8090/getGoals/${this.userId}/longTerm`);
  }
  addGoalsByUser(userAndGoals: any): Observable<any> {
    const url = `${this.baseUrl}/addGoals`;

    return this.http.post(url, userAndGoals);
  }

  generateToken(request: any): Observable<any> {
    return this.http.post('http://localhost:8090/user/signin', request);
  }
  saveGoals(userId: string, selectedGoals: GoalModel[]): Observable<any> {

    return this.http.post<any>('http://localhost:8090/addGoals', { userId, goals: selectedGoals })

  }
  getUsername(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserGoalByUserId/${this.userId}`)
  }

  getFundValue(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${this.baseUrl}/getAllAvailableFunds`);
  }


  getNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications/user/${this.userId}/latest`);
  }

  setToken(token: string): void {

    this.token = token;
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return this.token;
  }
 
  logout(): void {
    this.token = null;
    this.userId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
 
  isLoggedIn(): boolean {
    return !!this.token;
    return !!this.userId;
  }
 

  retrievegoals(userid: any, goalid: any, duration: any, financialGoalValue: any, userAndGoals: any): Observable<any> {
    console.log("service")
    console.log(userid)
    console.log(financialGoalValue)
    console.log(duration)
    return this.http.put(`${this.url2}/updateGoalDetails/${userid}/${goalid}?duration=${duration}&financialGoalValue=${financialGoalValue}`, userAndGoals);

  }

  getGeneratedOTP(email: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/user/api/forget_password/${email}`);
  }

  // Define a method to initiate the forgot password process
  forgotPassword(email: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/user/api/forget_password/${email}`);
  }

  // Define a method to confirm a new password after forget password
  confirmPassword(email: string, code: string, newPassword: string): Observable<any> {
    const request = { email, code, newPassword };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.baseUrl}/user/api/confirm_password`, request, {
      headers,
      responseType: 'text'
    });
  }

  register(username: string, email: string, password: string, userSSN: string): Observable<any> {
    return this.http.post('http://localhost:8090/user/signup', { username, email, password, userSSN });
  }
 

}
