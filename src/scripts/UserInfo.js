class UserInfo {
  constructor({ nameSelector, careerSelector }) {
    this._name = document.querySelector(nameSelector);
    this._career = document.querySelector(careerSelector);
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._career.textContent = data.description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._career.textContent,
    };
  }
}

export default UserInfo;
