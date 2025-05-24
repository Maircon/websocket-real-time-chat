const users = [
  {
    id: 1,
    avatarUrl:
      "https://img.odcdn.com.br/wp-content/uploads/2024/01/avatar-netlfix.jpg",
    name: "Aang",
    meta: "Mestre do Ar",
    auth: false,
    token: "",
  },
  {
    id: 2,
    avatarUrl:
      "https://i.pinimg.com/564x/77/7a/79/777a7988329ae744d4a848f57d1bfb0b.jpg",
    name: "Lol Player",
    meta: "Gamer",
    auth: false,
    token: "",
  },
  {
    id: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_F8iednF2gipQEy_1q7dUiAGQA5nARfUJZw&s",
    name: "Dota Player",
    meta: "Gamer",
    auth: false,
    token: "",
  },
];

class UserRepository {
  getUsers() {
    return users
  }

  getUser(userId) {
    return users.find(user => user.id === userId)
  }
}

export default new UserRepository()