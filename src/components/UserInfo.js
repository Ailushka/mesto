export class UserInfo {
  constructor(nameProfileSelector, jobProfileSelector, userAvatarSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector);
    this._jobProfile = document.querySelector(jobProfileSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  updateAvatar(avatar) {
    this._userAvatar.src = avatar;
    this._userAvatar.alt = 'Аватар пользователя';
  }

  setUserInfo(data) {
    this._id = data._id;
    this._nameProfile.textContent = data.name;
    this._jobProfile.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
