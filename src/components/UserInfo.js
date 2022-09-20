export default class UserInfo { 
  constructor({ nameSelector, careerSelector }) {
    this._name = document.querySelector(nameSelector); 
    this._career = document.querySelector(careerSelector); 
  } 

  getUserInfo() { 
    return { name: this._name.textContent, occupation: this._career.textContent }; 
  } 

  setUserInfo(data) { 
    this._name.textContent = data.name; 
    this._career.textContent = data.occupation; 
  } 
} 
